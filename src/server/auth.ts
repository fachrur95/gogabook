import { env } from "@/env.mjs";
import type { ISessionData } from "@/types/session";
import type { ITokenData } from "@/types/token";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
  type User,
  type Session,
  type Account,
  type Profile,
} from "next-auth";
import { type AdapterUser } from "next-auth/adapters";
import { type JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
// import DiscordProvider from "next-auth/providers/discord";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User extends DefaultUser {
    // ...other properties
    // role: UserRole;
    accessToken: string;
    refreshToken: string;
  }

}

interface LoginModel {
  username: string;
  password: string;
  platform: string;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      // console.log({ token, session })
      // const dataSession = jwtDecode<ISessionData>(token.accessToken as string);
      return ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          // ...dataSession,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      })
    },
    jwt({ token, user, trigger, session }: { token: JWT, user: User | AdapterUser, trigger?: "signIn" | "signUp" | "update", session?: Session, account: Account | null, profile?: Profile, isNewUser?: boolean }) {
      if (trigger === "update") {
        return { ...token, accessToken: session?.accessToken, refreshToken: session?.refreshToken }
      }
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
  },
  providers: [
    /* DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }), */
    CredentialsProvider({
      id: "next-auth",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await axios.post<ITokenData>(
          `${env.BACKEND_URL}/api/auth/login`,
          {
            username: credentials.email,
            password: credentials.password,
            platform: "WebApp",
          } as LoginModel,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        ).then((response) => {
          return response;
        }).catch((err) => console.log(err));

        if (!user) {
          return null;
        }

        const dataUser = user.data;
        const session = jwtDecode<ISessionData>(dataUser.accessToken);

        return {
          id: session.package,
          email: session.email,
          name: session.fullName,
          image: null,
          accessToken: dataUser.accessToken,
          refreshToken: dataUser.refreshToken,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

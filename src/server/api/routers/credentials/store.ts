import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { z } from "zod";
import { env } from "@/env.mjs";
import type { ITokenData } from "@/types/token";
import type { IUserBusinessDetail } from "@/types/masters/userBusinessDetail";
import type { InfiniteQueryResult } from "@/types/api-response";
// import { getServerSession } from "next-auth";

export const defaultUndefinedResult: InfiniteQueryResult<IUserBusinessDetail> = {
  result: [],
  count: 0,
  countAll: 0,
  currentPage: 0,
  nextPage: false,
  totalPages: 0,
}

export const credentialStoreRouter = createTRPCRouter({
  getAll: protectedProcedure.input(
    z.object({
      limit: z.number(),
      cursor: z.union([z.string(), z.number()]).nullish(),
      q: z.string().nullish(),
      sorting: z.object({
        column: z.string().optional(),
        direction: z.enum(["asc", "desc"]).optional(),
      }).optional(),
      show: z.enum(["all", "active", "inactive"]).default("all"),
    }),
  ).query(async ({ ctx, input }) => {
    const { limit, cursor, q } = input;

    // const session = await getServerSession();
    // console.log({ accessToken: ctx.session.accessToken })
    const result = await axios.get<InfiniteQueryResult<IUserBusinessDetail>>(
      `${env.BACKEND_URL}/api/auth/store?page=${cursor ?? 0}&size=${limit}&q=${q}`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
      return defaultUndefinedResult
    });

    return result;
  }),

  setStore: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await axios.post<ITokenData>(
          `${env.BACKEND_URL}/api/auth/store`,
          {
            warehouseId: input.id,
          },
          {
            headers: {
              Authorization: `Bearer ${ctx.session.accessToken}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        ).then((response) => {
          return response.data;
        }).catch((err) => {
          console.log(err)
          return null
        });
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  /* getUnique: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.business.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        gender: z.enum(["BANIN", "BANAT"]),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.prisma.business.create({
          data: {
            name: input.name,
            gender: input.gender,
            isActive: input.isActive,
            createdBy: ctx.session.user.email as string,
          },
        });
      } catch (error) {
        console.log({ error, msg: "test" })
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        ids: z.union([z.string(), z.string().array()]),
      }),
    )
    .mutation(({ ctx, input }) => {
      try {
        return ctx.prisma.business.deleteMany({
          where: {
            ...(typeof input.ids === "string" ? { id: input.ids } : {
              id: {
                in: input.ids
              }
            }),
          }
        });
      } catch (error) {
        console.log({ error, msg: "test" })
      }
    }), */


});

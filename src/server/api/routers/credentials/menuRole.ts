import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { env } from "@/env.mjs";
import type { IRole } from "@/types/cores/roles";

export const menuRoleRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const result = await axios.get<{ data: IRole[] }>(
      `${env.BACKEND_URL}/api/core/roles/self`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data.data;
    }).catch((err) => {
      console.log(err)
      return null
    });

    return result;
  }),

});

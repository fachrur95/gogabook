import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { env } from "@/env.mjs";
import type { IUserBusiness } from "@/types/masters/userBusiness";
import type { IGeneralSettings } from "@/types/cores/generalSettings";
import type { InfiniteQueryResult } from "@/types/api-response";
// import { getServerSession } from "next-auth";

export const defaultUndefinedResult: InfiniteQueryResult<IUserBusiness> = {
  result: [],
  count: 0,
  countAll: 0,
  currentPage: 0,
  nextPage: false,
  totalPages: 0,
}

export const generalSettingRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const result = await axios.get<IGeneralSettings>(
      `${env.BACKEND_URL}/api/core/generalsettings`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
      return null
    });

    return result;
  }),

});

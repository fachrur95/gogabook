import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { z } from "zod";
import { env } from "@/env.mjs";

export const procedureRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(
      z.object({
        // ids: z.union([z.string(), z.string().array()]),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await axios.delete<{ message: string }>(
          `${env.BACKEND_URL}/api/core/procedure/trans/${input.id}`,
          { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
        ).then((response) => {
          return response.data;
        }).catch((err: { response: { data: { message: string } } }) => {
          // console.log(err)
          return { message: err.response.data.message ?? `Error Delete id=${input.id}` }
        });
        return result;
      } catch (error) {
        console.log({ error, msg: "test" });
        return { message: `Error Delete id=${input.id}` };
      }
    }),


});

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { z } from "zod";
import { env } from "@/env.mjs";
import type { ITransaction } from "@/types/transactions/trans";
import type { InfiniteQueryResult } from "@/types/api-response";
// import { getServerSession } from "next-auth";

export const defaultUndefinedResult: InfiniteQueryResult<ITransaction> = {
  result: [],
  count: 0,
  countAll: 0,
  currentPage: 0,
  nextPage: false,
  totalPages: 0,
}

export const taxInvoiceRouter = createTRPCRouter({
  getAllTrans: protectedProcedure.input(
    z.object({
      type: z.enum(["empty", "uploaded",]),
      limit: z.number(),
      cursor: z.union([z.string(), z.number()]).nullish(),
      q: z.string().nullish(),
      filter: z.string().nullish(),
      sorting: z.object({
        column: z.string().optional(),
        direction: z.enum(["asc", "desc"]).optional(),
      }).optional(),
      show: z.enum(["all", "active", "inactive"]).default("all"),
    }),
  ).query(async ({ ctx, input }) => {
    const { type, limit, cursor, q, filter } = input;

    const result = await axios.get<InfiniteQueryResult<ITransaction>>(
      `${env.BACKEND_URL}/api/core/faktur/${type}?page=${cursor ?? 0}&size=${limit}${q ? `&q=${q}` : ""}${filter ? `&filter=${filter}` : ""}`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
      return defaultUndefinedResult
    });

    return result;
  }),

  getAllFilled: protectedProcedure.input(
    z.object({
      limit: z.number(),
      cursor: z.union([z.string(), z.number()]).nullish(),
      q: z.string().nullish(),
      filter: z.string().nullish(),
      sorting: z.object({
        column: z.string().optional(),
        direction: z.enum(["asc", "desc"]).optional(),
      }).optional(),
      show: z.enum(["all", "active", "inactive"]).default("all"),
    }),
  ).query(async ({ ctx, input }) => {
    const { limit, cursor, q, filter } = input;

    const result = await axios.get<InfiniteQueryResult<ITransaction>>(
      `${env.BACKEND_URL}/api/core/faktur/trans-filled?page=${cursor ?? 0}&size=${limit}${q ? `&q=${q}` : ""}${filter ? `&filter=${filter}` : ""}`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
      return defaultUndefinedResult
    });

    return result;
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
    }), */


});

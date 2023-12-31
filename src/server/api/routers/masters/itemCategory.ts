import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { z } from "zod";
import { env } from "@/env.mjs";
import type { InfiniteQueryResult } from "@/types/api-response";
import type { IMasterItemCategory } from "@/types/masters/masterItem/masterItemCategory";
// import { getServerSession } from "next-auth";

export const defaultUndefinedResult: InfiniteQueryResult<IMasterItemCategory> = {
  result: [],
  count: 0,
  countAll: 0,
  currentPage: 0,
  nextPage: false,
  totalPages: 0,
}

export const masterItemCategoryRouter = createTRPCRouter({
  getAll: protectedProcedure.input(
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

    const result = await axios.get<InfiniteQueryResult<IMasterItemCategory>>(
      `${env.BACKEND_URL}/api/core/itemcategories?page=${cursor ?? 0}&size=${limit}${q ? `&q=${q}` : ""}${filter ? `&filter=${filter}` : ""}`,
      { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
    ).then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
      return defaultUndefinedResult
    });

    return result;
  }),

  getUnique: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input: { id } }) => axios.get<IMasterItemCategory>(
    `${env.BACKEND_URL}/api/core/itemcategories/${id}`,
    { headers: { Authorization: `Bearer ${ctx.session.accessToken}` } }
  ).then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err)
    return undefined;
  })),

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

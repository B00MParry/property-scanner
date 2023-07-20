import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const propertyRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(
      z.object({
        page: z.number(),
        amount: z.number(),
        priceSort: z.union([z.literal("asc"), z.literal("desc")]),
        source: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const params = {
          take: input.amount,
          skip: input.page * input.amount,
          orderBy: {
            price: input.priceSort
          },
          where: {
            source: {
              contains: input.source && input.source !== 'All' ? input.source : ''
            }
          }
        };

        // await ctx.prisma.$transaction([
        //   ctx.prisma.processedProperty.count({
        //     where: {
        //       name: { contains: 'search' },
        //     },
        //   }),
        //   ctx.prisma.processedProperty.findMany({
        //     where: {
        //       name: { contains: 'search' },
        //     },
        //     orderBy: {
        //       name: "asc",
        //     },
        //     take: 200,
        //     skip: 10,
        //   }),
        // ]);

        return await ctx.prisma.processedProperty.findMany(params)
      } catch (error) {
        console.log("error", error);
      }
    }),
  getSources: publicProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.processedProperty.findMany({
          distinct: ['source'],
          select: {
            source: true,
          },
        })
      } catch (error) {
        console.log("error", error);
      }
    })
});
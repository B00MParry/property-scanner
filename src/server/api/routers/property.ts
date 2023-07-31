import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const propertyRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(
      z.object({
        page: z.number(),
        take: z.number(),
        sorting: z.union([z.literal("asc"), z.literal("desc")]),
        source: z.string().optional(),
        priceRange: z.tuple([z.number().nullable(), z.number().nullable()])
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const paginationParams = {
          take: input.take,
          skip: input.page * input.take,
        }
        const filteringParams = {
          ...(input.sorting && {
            orderBy: {
              price: input.sorting
            }
          }),
          where: {
            
            source: {
              contains: input.source && input.source !== 'All' ? input.source : ''
            },
            ...((input.priceRange[0] || input.priceRange[1]) && {
              price: {
                ...(input.priceRange[0] && { gte: input.priceRange[0] }),
                ...(input.priceRange[1] && { lte: input.priceRange[1] }),
              }
            })
          },
        };

        return await ctx.prisma.$transaction([
          ctx.prisma.processedProperty.count(filteringParams),
          ctx.prisma.processedProperty.findMany({ ...paginationParams, ...filteringParams })
        ])
      } catch (error) {
        console.log("error", error);
      }
    }),
  getSources: publicProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.prisma.processedProperty.groupBy({
          by: [
            'source'
          ]
        })
      } catch (error) {
        console.log("error", error);
      }
    })
});
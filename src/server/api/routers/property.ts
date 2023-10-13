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
        maxPrice: z.number().nullable(),
        minPrice: z.number().nullable(),
        bedrooms: z.number().nullable(),
        bathrooms: z.number().nullable(),
        search: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const paginationParams = {
          take: input.take,
          skip: (input.page - 1) * input.take,
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
            ...(input.search && {
              OR: [
                {
                  address: {
                    contains: input.search
                  }
                },
                {
                  name: {
                    contains: input.search
                  }
                }
              ],
            }),
            ...(input.bathrooms && {
              bathrooms: {
                equals: input.bathrooms
              }
            }),
            ...(input.bedrooms && {
              bedroom: {
                equals: input.bedrooms
              }
            }),
            ...((input.minPrice || input.maxPrice) && {
              price: {
                ...(input.minPrice && { gte: input.minPrice }),
                ...(input.maxPrice && { lte: input.maxPrice }),
              }
            })
          },
        };

        return await ctx.prisma.$transaction([
          ctx.prisma.processedProperty.count(filteringParams),
          ctx.prisma.processedProperty.findMany({ ...paginationParams, ...filteringParams }),
          ctx.prisma.processedProperty.groupBy({
            orderBy: {},
            by: [
              'source'
            ]
          })
        ])
      } catch (error) {
        console.log("error", error);
      }
    }),

  test: publicProcedure.query(() => {
    return 'test'
  })
});
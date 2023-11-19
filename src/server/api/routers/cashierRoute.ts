/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
const itemOrderInput = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  quantity: z.number().min(0),
  comment: z.string().optional(),
  sales: z.object({
    connect: z.object({
        sales_Id: z.string().min(1),
    }),
}),
 });
 const sales = z.object({
  sales_Id: z.string().min(1),
  cashier_name: z.string().min(1),
  initial_price: z.number().min(0),
  discount: z.number().min(0),
  final_price: z.number().min(0),
 });
 
export const cashierRouter = createTRPCRouter({

  createItemOrder: publicProcedure
  .input(itemOrderInput)
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));
 
    return ctx.db.itemOrder.create({
      
      data: {
        name: input.name,
        price: input.price,
        quantity: input.quantity,
        comment: input.comment,
        sales: {
          connect: {
              sales_Id: input.sales.connect.sales_Id
          },
      },
      },
    });
  }),

  createSale: publicProcedure
  .input(sales)
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ctx.db.sales.create({
      data: {
        sales_Id:input.sales_Id,
        cashier_name: input.cashier_name,
        initial_price: input.initial_price,
        discount: input.discount,
        final_price: input.final_price,
      },
    });
  }),
 
});

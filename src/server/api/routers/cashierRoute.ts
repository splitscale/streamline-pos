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
  user_id: z.string().min(1),
  customer_name: z.string().min(1),
  cashier_name: z.string().min(1),
  initial_price: z.number().min(0),
  discount: z.number().min(0),
  final_price: z.number().min(0),
  payment: z.number().min(0),
 });
 const saleIsDone = z.object({
  sales_Id: z.string().min(1),
  sales_status: z.boolean()
 });
 const item = z.object({
  user_id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().min(0)
 });

 const user_id = z.object({
  user_id: z.string().min(1),

 });
 
 
export const cashierRouter = createTRPCRouter({

  createItem: publicProcedure
  .input(item)
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 200));
 
    return ctx.db.items.create({
      
      data: {
        user_id:input.user_id,
        name: input.name,
        price: input.price,
        stock:input.stock,
      },
    });
  }),
  getAllItem: publicProcedure
  .input(user_id)
  .query(({ ctx,input }) => {
    return ctx.db.items.findMany({
      where: { user_id: input.user_id },
    });
  }),


  createItemOrder: publicProcedure
  .input(itemOrderInput)
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 200));
 
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
    await new Promise((resolve) => setTimeout(resolve, 200));
    return ctx.db.sales.create({
      data: {
        user_id:input.user_id,
        customer_name:input.customer_name,
        sales_Id:input.sales_Id,
        cashier_name: input.cashier_name,
        initial_price: input.initial_price,
        discount_percentage: input.discount,
        final_price: input.final_price,
        payment:input.payment
      },
    });
  }),
  getAllSales: publicProcedure
  .input(user_id)
  .query(({ ctx,input }) => {
    return ctx.db.sales.findMany({
      where:{
        user_id:input.user_id,
        sales_status: false
      },
      include: {
        itemOrders: true,
      },
    });
  }),
  updateSalesStatus: publicProcedure
 .input(saleIsDone)
 .mutation(async ({ ctx, input }) => {
   // simulate a slow db call
   await new Promise((resolve) => setTimeout(resolve, 200));
   return ctx.db.sales.update({
    where: { sales_Id: input.sales_Id },
     data: {
       sales_status: input.sales_status
     },
   });
 }),


});

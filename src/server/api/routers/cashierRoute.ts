/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { DbItem } from "~/pages/inventory";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CartItemType } from "~/types/global";
import { mapJsonSalesArr } from "~/utils/mapJsonToSalesEntry";
import { parseSales } from "~/utils/parseSales";
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
  customer_name: z.string().optional(),
  cashier_name: z.string().optional(),
  initial_price: z.number().min(0),
  discount: z.number().min(0),
  final_price: z.number().min(0),
  payment: z.number().min(0),
});
const saleIsDone = z.object({
  sales_Id: z.string().min(1),
  sales_status: z.boolean(),
});

const saleStock = z.object({
  item_id: z.string().min(1),
  stock: z.number().min(0),
});

const item = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().min(0),
});

const item_id = z.object({
  item_id: z.string().min(1),
});

const sales_id = z.object({
  sales_id: z.string().min(1),
});

export const cashierRouter = createTRPCRouter({
  createItem: publicProcedure.input(item).mutation(async ({ ctx, input }) => {
    return ctx.db.items.create({
      data: {
        user_id: ctx.user?.id ?? "",
        name: input.name,
        price: input.price,
        stock: input.stock,
      },
    });
  }),
  getAllItem: publicProcedure.query(async ({ ctx }) => {
    const inventoryItems = await ctx.db.items.findMany({
      where: {
        user_id: ctx.user?.id ?? "",
        stock: {
          not: 0,
        },
      },
    });

    const dbItems = inventoryItems as DbItem[];
    return dbItems.length !== 0 ? dbItems : [];
  }),
  getAllInventoryItems: publicProcedure.query(async ({ ctx }) => {
    const inventoryItems = await ctx.db.items.findMany({
      where: {
        user_id: ctx.user?.id ?? "",
      },
    });

    const dbItems = inventoryItems as DbItem[];
    return dbItems.length !== 0 ? dbItems : [];
  }),

  createItemOrder: publicProcedure
    .input(itemOrderInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.itemOrder.create({
        data: {
          name: input.name,
          price: input.price,
          quantity: input.quantity,
          comment: input.comment,
          sales: {
            connect: {
              sales_Id: input.sales.connect.sales_Id,
            },
          },
        },
      });
    }),

  createSale: publicProcedure.input(sales).mutation(async ({ ctx, input }) => {
    return ctx.db.sales.create({
      data: {
        user_id: ctx.user?.id ?? "",
        customer_name: input.customer_name ?? "",
        sales_Id: input.sales_Id,
        cashier_name: input.cashier_name ?? "",
        initial_price: input.initial_price,
        discount_percentage: input.discount,
        final_price: input.final_price,
        payment: input.payment,
      },
    });
  }),
  getAllSales: publicProcedure.query(async ({ ctx }) => {
    const sales = await ctx.db.sales.findMany({
      where: {
        user_id: ctx.user?.id ?? "",
        sales_status: false,
      },
      include: {
        itemOrders: true,
      },
    });

    const res = mapJsonSalesArr(JSON.stringify(sales));
    console.log("[GET ALL SALES RES] ", res);
    return res;
  }),
  getAllTransactions: publicProcedure.query(async ({ ctx }) => {
    const sales = await ctx.db.sales.findMany({
      where: {
        user_id: ctx.user?.id ?? "",
        sales_status: true,
      },
      include: {
        itemOrders: true,
      },
    });

    return parseSales(mapJsonSalesArr(JSON.stringify(sales)));
  }),
  updateSalesStatus: publicProcedure
    .input(saleIsDone)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.sales.update({
        where: { sales_Id: input.sales_Id },
        data: {
          sales_status: input.sales_status,
        },
      });
    }),
  updateSalesStock: publicProcedure
    .input(saleStock)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.items.update({
        where: { items_id: input.item_id },
        data: {
          stock: input.stock,
        },
      });
    }),
  deleteSingleItem: publicProcedure
    .input(item_id)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.items.delete({
        where: {
          items_id: input.item_id,
        },
      });
    }),
  updateItem: publicProcedure
    .input(item)
    .input(item_id)
    .mutation(async ({ ctx, input }) => {
      console.log(
        "[TRPC] ",
        "updating: ",
        ctx.user?.id,
        input.item_id,
        "new data: ",
        input.name,
      );

      return ctx.db.items.update({
        where: {
          user_id: ctx.user?.id ?? "",
          items_id: input.item_id,
        },
        data: {
          price: input.price,
          stock: input.stock,
          name: input.name,
        },
      });
    }),
});

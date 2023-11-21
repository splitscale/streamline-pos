import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";

export interface Item {
  id: string;
  name: string;
  units: number;
  comment?: string;
}
export interface OrderProps {
  id: string;
  name: string;
  orderId: string;
  items: Item[];
  doneCallback?: (v: string) => void;
}

export interface EarningReportProps {
  todaysEarnings?: number;
  totalEarnings?: number;
}

export interface ItemOrder {
  itemOrder_id: string;
  name: string;
  price: number;
  quantity: number;
  comment: string | null;
  sales_Id: string;
}

export interface SalesEntry {
  id: string;
  sales_Id: string;
  user_id: string;
  customer_name: string;
  cashier_name: string;
  initial_price: number;
  discount_percentage: number;
  final_price: number;
  payment: number;
  sales_status: boolean;
  sales_date: string;
  itemOrders: ItemOrder[];
}

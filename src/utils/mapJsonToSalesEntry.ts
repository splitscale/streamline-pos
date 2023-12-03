import { SalesEntry } from "~/types/global";

// Mapper function to convert JSON to SalesEntry object
export function mapJsonToSalesEntry(json: any): SalesEntry {
  console.log("[PARSING] ", json);

  return {
    id: json.id ?? "",
    sales_Id: json.sales_Id ?? "",
    user_id: json.user_id ?? "",
    customer_name: json.customer_name ?? "",
    cashier_name: json.cashier_name ?? "",
    initial_price: json.initial_price ?? 0,
    discount_percentage: json.discount_percentage ?? 0,
    final_price: json.final_price ?? 0,
    payment: json.payment ?? 0,
    sales_status: json.sales_status ?? false,
    sales_date: json.sales_date ?? "",
    itemOrders: (json.itemOrders ?? []).map((itemJson: any) => ({
      itemOrder_id: itemJson.itemOrder_id ?? "",
      name: itemJson.name ?? "",
      price: itemJson.price ?? 0,
      quantity: itemJson.quantity ?? 0,
      comment: itemJson.comment ?? "",
      sales_Id: itemJson.sales_Id ?? "",
    })),
  };
}

export function mapJsonSalesArr(array: any): SalesEntry[] {
  const arr = JSON.parse(array) as any[];

  return arr.map((items) => mapJsonToSalesEntry(items));
}

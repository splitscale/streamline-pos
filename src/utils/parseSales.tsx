import { TransactionHistoryCardProps } from "~/components/dashboard/transaction";
import { SalesEntry } from "~/types/global";

export function parseSales(allSales: SalesEntry[]) {
  const sortedTransactions: TransactionHistoryCardProps[] = [];

  allSales.forEach((sale) => {
    if (!sale.sales_status) return;

    const parsedTransactions: TransactionHistoryCardProps = {
      name: sale.customer_name,
      operation: "add",
      timestamp: sale.sales_date,
      amount: sale.payment,
    };

    sortedTransactions.push(parsedTransactions);
  });

  return sortedTransactions;
}

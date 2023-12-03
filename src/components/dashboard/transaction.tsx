import { cn } from "~/utils/utils";

export interface TransactionHistoryCardProps {
  name: string | "no name";
  operation: "add" | "subtract";
  timestamp: string;
  amount: number;
}

export function TransactionHistoryCard(props: TransactionHistoryCardProps) {
  // Process transactionType
  const transactionSign = props.operation === "add" ? "+" : "-";

  // Format amount with decimals
  const formattedAmount = `P ${props.amount.toFixed(2)}`;

  // Parse timestamp
  const parsedTimestamp = new Date(props.timestamp).toLocaleString();

  const operationColor =
    props.operation === "add" ? "text-[#00B871]" : "text-[#FC7070]";

  return (
    <div className="my-1 flex flex-row place-content-between pr-3">
      <div className="flex flex-col">
        <div className="font-semibold text-primary">{props.name}</div>
        <div className="text-xs text-secondary-foreground">
          {parsedTimestamp}
        </div>
      </div>
      <div className="flex flex-col place-content-center text-end">
        <div className={cn("font-semibold", operationColor)}>
          {`${transactionSign}${formattedAmount}`}
        </div>
      </div>
    </div>
  );
}

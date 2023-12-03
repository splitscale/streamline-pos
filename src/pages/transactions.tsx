import {
  TransactionHistoryCard,
  TransactionHistoryCardProps,
} from "~/components/dashboard/transaction";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";
import { mapJsonSalesArr } from "~/utils/mapJsonToSalesEntry";
import { useUser } from "@clerk/nextjs";

export default function AllTransactionPage() {
  const router = useRouter();

  const { data: sales } = api.cashier.getAllTransactions.useQuery();

  return (
    <div className="h-screen w-screen overflow-hidden bg-primary p-3 pb-32 text-primary-foreground">
      <div className="my-3 flex items-center">
        <div className="text-lg font-bold text-black" onClick={router.back}>
          <ChevronLeft className="text-primary-foreground" />
        </div>
        <h1 className="ml-2 text-2xl font-bold">Transactions</h1>
      </div>

      <div className="mt-3 flex h-[100%] flex-col rounded-md bg-primary-foreground p-3 text-primary">
        <div className="flex flex-row">
          <span>{`${sales ? sales.length : 0} items`}</span>
        </div>

        <Separator className="my-1" />

        <ScrollArea className="whitespace-nowrap rounded-md">
          {sales ? (
            sales.map((transaction, index) => (
              <div key={index}>
                <TransactionHistoryCard {...transaction} />
              </div>
            ))
          ) : (
            <p>No current sales...</p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

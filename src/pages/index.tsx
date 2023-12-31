import Head from "next/head";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Inventory from "./inventory";
import { Header } from "~/components/header";
import CounterPage from "./users/cashier";
import { api } from "~/utils/api";
import DashboardBalance from "~/components/dashboard/balance";
import DashboardMenu from "~/components/dashboard/dashboardMenuButton";
import { Button } from "~/components/ui/button";

import { TransactionHistoryCard } from "~/components/dashboard/transaction";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { useRouter } from "next/navigation";
import { LoadingDialog } from "~/components/loadingDialog";
import { useState } from "react";

export default function POSTabs() {
  const router = useRouter();
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);

  const { data: sales, isFetching } = api.cashier.getAllSales.useQuery();
  const { data: transactions } = api.cashier.getAllTransactions.useQuery();

  const updateStatus = api.cashier.updateSalesStatus.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
      setIsLoading(false);
    },
  });

  const handleClick = (sales_id: string) => {
    setIsLoading(true);
    updateStatus.mutate({
      sales_Id: sales_id,
      sales_status: true,
    });
  };

  return (
    <>
      {isLoading && <LoadingDialog />}
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col bg-white text-primary-foreground ">
        <div className=" flex flex-col gap-2 py-3">
          {/* Header */}
          <Header />

          {/* Body */}
          <div className="container flex flex-col">
            <Tabs defaultValue="pos" className="flex flex-col">
              <TabsList className="flex w-full justify-between self-center px-4">
                <TabsTrigger className="rounded-full " value="pos">
                  POS
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value="dashboard">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value="orders">
                  Orders
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value="inventory">
                  Inventory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pos">
                {/* POS */}
                <CounterPage />
              </TabsContent>

              <TabsContent value="dashboard">
                {/* Balance */}
                <DashboardBalance />

                {/* Grid of buttons */}
                <DashboardMenu />
                {/* Powered by Splitscale */}
                <div className="flex h-14 items-center justify-center overflow-hidden rounded-md bg-[#131313]">
                  <div className="flex-grow px-16">
                    <Image
                      alt="Splitscale systems banner"
                      src={"/splitscale-banner.png"}
                      className="aspect-auto h-full w-full object-cover"
                      layout="responsive"
                      width={300}
                      height={50}
                    />
                  </div>
                </div>

                {/* Invoice */}
                <div className="mt-3 flex flex-col rounded-md bg-secondary p-3 text-primary">
                  {/* Transaction */}
                  <div className="flex-rows flex place-content-between">
                    <div className="text-lg font-semibold">Transactions</div>
                    <Button
                      onClick={() => router.push("/transactions")}
                      variant={"secondary"}
                      className="w-fit"
                    >
                      See all
                    </Button>
                  </div>

                  <Separator className="my-2" />
                  {/* Receive */}
                  <ScrollArea className="h-40 w-full whitespace-nowrap rounded-md">
                    {transactions?.map((transaction, index) => (
                      <div key={index}>
                        <TransactionHistoryCard {...transaction} />
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                {isFetching ? (
                  <p className="text-black">Loading...</p>
                ) : sales ? (
                  sales.length === 0 ? (
                    <p className="text-black">No current sales</p>
                  ) : (
                    sales.map((sale, index) => (
                      <div key={index}>
                        <Card className="mb-3 w-full max-w-screen-sm border border-black">
                          <CardHeader className="grid">
                            <CardTitle>
                              {sale.customer_name.toUpperCase()}
                            </CardTitle>
                            <CardDescription>Items</CardDescription>

                            {sale.itemOrders.map((item) => (
                              <div className="grid grid-cols-1 grid-rows-1 rounded-md bg-gray-200 px-3 py-2">
                                <p className="text-left font-semibold normal-case">{`${item.quantity}x ${item.name}`}</p>
                                <div className="pl-4">
                                  <p className="text-md font-normal normal-case">
                                    {item.comment ?? ""}
                                  </p>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant={"default"}
                              onClick={() => {
                                handleClick(sale.sales_Id);
                              }}
                            >
                              Done
                            </Button>
                          </CardHeader>
                        </Card>
                      </div>
                    ))
                  )
                ) : (
                  <p className="text-black">No current sales</p>
                )}
              </TabsContent>

              <TabsContent value="inventory">
                <Inventory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}

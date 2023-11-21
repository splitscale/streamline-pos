import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Inventory, { DbItem } from "./inventory";
import { Header } from "~/components/header";
import CounterPage from "./users/cashier";
import { api } from "~/utils/api";
import DashboardBalance from "~/components/dashboard/balance";
import DashboardMenu from "~/components/dashboard/dashboardMenuButton";
import ReceiveTransaction from "~/components/dashboard/receive";
import CashOutTransaction from "~/components/dashboard/cashout";
import CashInTransaction from "~/components/dashboard/cashin";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { mapJsonSalesArr } from "~/utils/mapJsonToSalesEntry";

export default function POSTabs() {
  const router = useRouter();
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const res = sessionData as unknown as { id: string };
  const [uid, setUid] = useState<string>("");
  useEffect(() => {
    if (!res) router.push("/");
    if (res) setUid(res.id);
  });

  const { data: items } = api.cashier.getAllItem.useQuery({
    user_id: uid,
  });

  const {
    data: sales,
    isLoading,
    isError,
    isSuccess,
  } = api.cashier.getAllSales.useQuery({ user_id: uid });

  const salesEntry = () =>
    isSuccess ? mapJsonSalesArr(JSON.stringify(sales)) : [];

  const updateStatus = api.cashier.updateSalesStatus.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const handleClick = (sales_id: string) => {
    // Call the mutation function here
    console.log("success");
    updateStatus.mutate({
      sales_Id: sales_id,
      sales_status: true,
    });
  };

  if (!sessionData) return <p>No Session</p>;

  if (sessionData)
    return (
      <>
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
                <TabsList className="flex w-screen justify-between self-center ">
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
                  <CounterPage uid={uid} />
                </TabsContent>

                <TabsContent value="dashboard">
                  {/* Balance */}
                  <DashboardBalance />

                  {/* Grid of buttons */}
                  <DashboardMenu />
                  {/* Powered by Splitscale */}
                  <div className="grid h-14 grid-cols-4 rounded-md bg-black">
                    <div className="col-span-1 ml-2 mt-1 text-xs">
                      Powered by
                    </div>
                    <div className="col-span-3 flex items-center text-lg font-semibold">
                      Splitscale Systems
                    </div>
                  </div>
                  {/* Invoice */}
                  <div className="mt-3 flex flex-col rounded-md bg-[#D9D9D9] p-3 text-black">
                    {/* Transaction */}
                    <div className="grid grid-cols-2">
                      <div className="font-semibold">Transactions</div>
                      <div className="text-end text-xs text-[#FC7070]">
                        See all
                      </div>
                    </div>
                    {/* Receive */}
                    <ReceiveTransaction />
                    {/* Cash out */}
                    <CashOutTransaction />
                    {/* Cash in */}
                    <CashInTransaction />
                  </div>
                </TabsContent>

                <TabsContent value="orders">
                  {salesEntry().length <= 0 ? (
                    <p className="text-black">No current sales</p>
                  ) : (
                    salesEntry().map((sale, index) => (
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
                  )}
                </TabsContent>

                <TabsContent value="inventory">
                  <Inventory card={items as DbItem[]} userId={uid} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </>
    );
}

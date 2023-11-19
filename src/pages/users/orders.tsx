import Head from "next/head";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";

export default function ordersPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col text-primary-foreground">
        <div className="mt-3 ml-1 flex justify-start">
          <Button
            className="text-black font-bold text-2xl"
            variant={"ghost"}
            onClick={() => router.back()}>
              &lt; Orders
          </Button>
        </div>
        <div className="flex flex-col py-3 w-full justify-start items-center">
          <Card className="w-[90%] border border-black mb-3">
            <CardHeader>
              <CardTitle className="text-center -mb-2">ONIICHAN</CardTitle>
              <CardDescription className="text-center">Customer #001</CardDescription>
              <Card className="px-3 py-6 bg-gray-300">
                <div className="grid grid-cols-2 gap-0">
                  <div className="font-bold text-left self-center">
                    3x fried chicken
                  </div>
                  <div className="font-bold text-right self-center">
                    ₱ 280.00
                  </div>
                  <div className="text-left self-center">
                    only thighs
                  </div>
                </div>
              </Card>
              <Card className="px-3 py-6 bg-gray-300">
                <div className="grid grid-cols-2 gap-0">
                  <div className="font-bold text-left self-center">
                    1x hotdog
                  </div>
                  <div className="font-bold text-right self-center">
                    ₱ 250.00
                  </div>
                  <div className="text-left self-center">
                    no bun
                  </div>
                </div>
              </Card>
              <p className="text-xs">
                November 23, 2023 10:23 AM
              </p>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
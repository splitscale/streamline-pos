import { useSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function POSTabs() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) router.push("/");
  });

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col bg-[#121212] text-primary-foreground">
        <div className=" flex flex-col gap-2  py-3">
          <div className="item-center container flex w-full flex-row place-content-between">
            <div>
              <p className="text-lg font-semibold">Streamline POS</p>
              <p className="text-sm font-normal">By Splitscale Systems</p>
            </div>

            <Button
              className="font-semibold"
              variant="ghost"
              onClick={() => void signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </div>
          <div className="container flex flex-col space-y-2">
            <Tabs
              defaultValue="pos"
              className="flex min-h-screen flex-col bg-transparent"
            >
              <TabsList className="bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <TabsTrigger className="rounded-full" value="pos">
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

              <TabsContent value="pos" className="flex justify-center py-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex h-10 w-[90%] rounded-full bg-white px-5 text-sm"
                />
              </TabsContent>

              <TabsContent value="dashboard">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>
                      Change your Dashboard here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="container">
                <Card>
                  <CardHeader>
                    <CardTitle>ONIICHAN</CardTitle>
                    <CardDescription>Customer</CardDescription>
                    <Card className="px-3 py-10"></Card>
                    <Card className="px-3 py-10"></Card>
                    <Button className="rounded-lg bg-pink-500 text-white hover:bg-pink-600">
                      Done
                    </Button>
                  </CardHeader>
                </Card>

                <span className="text-xs text-white">incoming..</span>

                <Card>
                  <CardHeader>
                    <CardTitle>JER</CardTitle>
                    <CardDescription>Customer</CardDescription>
                    <Card className="px-3 py-10"></Card>
                    <Card className="px-3 py-10"></Card>
                    <Button className="rounded-lg bg-pink-500 text-white hover:bg-pink-600">
                      Done
                    </Button>
                  </CardHeader>
                </Card>
              </TabsContent>

              <TabsContent value="inventory">
                <div className="container flex w-full max-w-md flex-col gap-4">
                  <Label
                    htmlFor="file"
                    className="text-lg font-semibold text-white"
                  >
                    Upload an Excel File
                  </Label>
                  <div className="flex w-full flex-col items-stretch gap-2">
                    <div className="w-full">
                      <Input
                        id="file"
                        type="file"
                        className="w-full rounded-lg bg-gray-200 px-4 py-2"
                      />
                      <span className="text-sm text-gray-400">
                        File formats: .xlsx, .xls
                      </span>
                    </div>
                    <Button className="rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                      Submit
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}

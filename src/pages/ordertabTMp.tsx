import { Card, CardHeader } from "@mui/material";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";
import { CardTitle } from "~/components/ui/card";

<TabsContent value="orders" className="grid justify-items-center">
  {sales === undefined ? (
    <p className="text-black">No current sales</p>
  ) : (
    sales?.map(
      (
        sales: {
          customer_name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | PromiseLikeOfReactNode
            | null
            | undefined;
          itemOrders: any[];
          sales_Id: string;
        },
        index: Key | null | undefined,
      ) => (
        <div key={index}>
          <Card className="mb-3 w-64 border border-black">
            <CardHeader className="grid">
              <CardTitle className="mb-2">{sales.customer_name}</CardTitle>

              {sales.itemOrders.map((item) => (
                <div key={index}>
                  <Card className="bg-gray-300 px-3 py-2  ">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="w-full self-center text-left font-bold">
                        {item.quantity}x {item.name}
                      </div>
                      <div className="self-center text-right font-bold"></div>
                      <div className="self-center text-left">
                        {item.comment}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
              <div
                className="rounded-md bg-blue-950 text-center text-white"
                onClick={() => {
                  handleClick(sales.sales_Id);
                  window.location.reload();
                }}
              >
                DONE
              </div>
            </CardHeader>
          </Card>
        </div>
      ),
    )
  )}
</TabsContent>;

let x = [
  {
    id: "clp7y8ut1000ex0e4kgcirph1",
    sales_Id: "d5993059-8ad8-47df-949e-555796305807",
    user_id: "232090d3-3f78-4564-bfdb-34ab2b0cfc59",
    customer_name: "dawdwa",
    cashier_name: "default",
    initial_price: 50,
    discount_percentage: 0,
    final_price: 50,
    payment: 50,
    sales_status: false,
    sales_date: "2023-11-21T06:23:07.766Z",
    itemOrders: [
      {
        itemOrder_id: "clp7y8vkl000fx0e4r974ger6",
        name: "Drinks",
        price: 35,
        quantity: 1,
        comment: null,
        sales_Id: "d5993059-8ad8-47df-949e-555796305807",
      },
      {
        itemOrder_id: "clp7y8vyz000gx0e49gd1eqf5",
        name: "Sweet Tooth",
        price: 15,
        quantity: 1,
        comment: null,
        sales_Id: "d5993059-8ad8-47df-949e-555796305807",
      },
    ],
  },
  {
    id: "clp7y973q000hx0e4az5biedr",
    sales_Id: "6eeaa798-8059-4f01-90d3-a39df2c1015e",
    user_id: "232090d3-3f78-4564-bfdb-34ab2b0cfc59",
    customer_name: "dawd",
    cashier_name: "default",
    initial_price: 129,
    discount_percentage: 0,
    final_price: 129,
    payment: 200,
    sales_status: false,
    sales_date: "2023-11-21T06:23:23.702Z",
    itemOrders: [
      {
        itemOrder_id: "clp7y97ub000ix0e43viwm3j1",
        name: "Drinks",
        price: 35,
        quantity: 1,
        comment: null,
        sales_Id: "6eeaa798-8059-4f01-90d3-a39df2c1015e",
      },
      {
        itemOrder_id: "clp7y988r000jx0e4qksx3k5m",
        name: "Shawarma Sisig",
        price: 79,
        quantity: 1,
        comment: null,
        sales_Id: "6eeaa798-8059-4f01-90d3-a39df2c1015e",
      },
      {
        itemOrder_id: "clp7y98p8000kx0e4drg2larf",
        name: "Sweet Tooth",
        price: 15,
        quantity: 1,
        comment: null,
        sales_Id: "6eeaa798-8059-4f01-90d3-a39df2c1015e",
      },
    ],
  },
  {
    id: "clp7yhume000lx0e496iongr9",
    sales_Id: "54c3548c-f42f-44d4-9fa6-5265b67cd0ce",
    user_id: "232090d3-3f78-4564-bfdb-34ab2b0cfc59",
    customer_name: "bhjikesfa",
    cashier_name: "default",
    initial_price: 114,
    discount_percentage: 0,
    final_price: 114,
    payment: 114,
    sales_status: false,
    sales_date: "2023-11-21T06:30:07.431Z",
    itemOrders: [
      {
        itemOrder_id: "clp7yhv3y000mx0e42o49bdev",
        name: "Drinks",
        price: 35,
        quantity: 1,
        comment: null,
        sales_Id: "54c3548c-f42f-44d4-9fa6-5265b67cd0ce",
      },
      {
        itemOrder_id: "clp7yhvfn000nx0e45o47lxwc",
        name: "Shawarma Sisig",
        price: 79,
        quantity: 1,
        comment: null,
        sales_Id: "54c3548c-f42f-44d4-9fa6-5265b67cd0ce",
      },
    ],
  },
];

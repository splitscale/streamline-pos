/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import router from "next/router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { OrderProps, Item } from "~/types/global";
import { JSX } from "react";

export function OrderCard(props: OrderProps) {
  return (
    <Card className="mb-3 w-full max-w-screen-sm border border-black">
      <CardHeader className="grid">
        <CardTitle>{props.customer_name.toUpperCase()}</CardTitle>
        <CardDescription>{`Order reference: ${props.orderId}`}</CardDescription>

        {props.items.map((ItemProps: JSX.IntrinsicAttributes & Item) => (
          <RenderItem key={ItemProps.id} {...ItemProps} />
        ))}

        <Button
          className="hover:bg-pink-600  w-full rounded-md"
          variant={"default"}
          onClick={() => {
            if (props.doneCallback) props.doneCallback(props.id);
          }}
        >
          Done
        </Button>
      </CardHeader>
    </Card>
  );
}

function RenderItem(props: Item) {
  return (
    <div className="grid grid-cols-1 grid-rows-1 rounded-md bg-gray-200 px-3 py-2">
      <p className="text-left font-semibold normal-case">{`${props.units}x ${props.name}`}</p>
      <div className="pl-4">
        <p className="text-md font-normal normal-case">{props.comment}</p>
      </div>
    </div>
  );
}

let x = [
  {
    id: "clp7w7don0000x0mw3en8ufoi",
    sales_Id: "af7329dc-223f-4dd6-9a43-8804f2172118",
    user_id: "232090d3-3f78-4564-bfdb-34ab2b0cfc59",
    customer_name: "joe joe",
    cashier_name: "default",
    initial_price: 237,
    discount_percentage: 0,
    final_price: 237,
    payment: 237,
    sales_status: false,
    sales_date: "2023-11-21T05:25:59.687Z",
    itemOrders: [
      {
        itemOrder_id: "clp7w7eid0001x0mwueaa7n9j",
        name: "Shawarma Sisig",
        price: 79,
        quantity: 3,
        comment: null,
        sales_Id: "af7329dc-223f-4dd6-9a43-8804f2172118",
      },
    ],
  },
];

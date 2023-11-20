import router from "next/router";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { OrderProps, Item } from "~/types/global";

export function OrderCard(props: OrderProps) {
  return (
    <Card className="mb-3 w-full max-w-screen-sm border border-black">
      <CardHeader className="grid">
        <CardTitle>{props.name.toUpperCase()}</CardTitle>
        <CardDescription>{`Order reference: ${props.orderId}`}</CardDescription>

        {props.items.map((ItemProps) => (
          <RenderItem key={ItemProps.id} {...ItemProps} />
        ))}

        <Button
          className="hover:bg-pink-600  w-full rounded-md"
          variant={"destructive"}
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

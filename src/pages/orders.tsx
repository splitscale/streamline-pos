import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import { OrderCard } from "~/components/OrderCard";
import { OrderProps } from "~/types/global";

const mockItems: Item[] = [
  { id: "1", name: "Item A", units: 2 },
  { id: "2", name: "Item B", units: 1, comment: "Extra cheese, please" },
  { id: "3", name: "Item C", units: 3, comment: "Spicy flavor" },
];

const mockOrder1: OrderProps = {
  id: "someid123",
  name: "jane Doe",
  orderId: "adnj34uyi78",
  items: mockItems,
  doneCallback: console.log,
};

const mockOrder2: OrderProps = {
  id: "someid4142",
  name: "John Doe",
  orderId: "adf89s74gh",
  items: mockItems,
  doneCallback: console.log,
};

const orders: OrderProps[] = [mockOrder1, mockOrder2];

interface DbSales {
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
}

export function Orders(props: { sales: DbSales[] }) {
  return (
    <>
      {orders.length !== 0 ? (
        orders.map((orderProps) => <OrderCard {...orderProps} />)
      ) : (
        <p className="text-black">No current orders</p>
      )}
    </>
  );
}

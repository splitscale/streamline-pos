/* eslint-disable react/jsx-key */
import { randomUUID } from "crypto";
import router from "next/router";
import { OrderCard } from "~/components/OrderCard";
import { Button } from "~/components/ui/button";
import {
  CardTitle,
  CardDescription,
  Card,
  CardHeader,
} from "~/components/ui/card";
import { Item, OrderProps } from "~/types/global";
import { randomOID } from "~/utils/randomOID";

const mockItems: Item[] = [
  { id: "1", name: "Item A", units: 2 },
  { id: "2", name: "Item B", units: 1, comment: "Extra cheese, please" },
  { id: "3", name: "Item C", units: 3, comment: "Spicy flavor" },
];

const mockOrder1: OrderProps = {
  id: "someid123",
  name: "jane Doe",
  orderId: randomOID(),
  items: mockItems,
  doneCallback: console.log,
};

const mockOrder2: OrderProps = {
  id: "someid4142",
  name: "John Doe",
  orderId: randomOID(),
  items: mockItems,
  doneCallback: console.log,
};

const orders: OrderProps[] = [mockOrder1, mockOrder2];

export function Orders() {
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

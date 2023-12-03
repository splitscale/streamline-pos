/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { DbItem } from "~/pages/inventory";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  card:
    | {
        items_id: string;
        user_id: string;
        name: string;
        price: number;
        stock: number;
      }[]
    | undefined;
  addToCart: (item: DbItem) => void;
}

export default function ItemCard({ addToCart, card = [] }: Props) {
  const mappedDivs = card.map((item, index) => (
    <div
      key={index}
      onClick={() => addToCart(item)}
      className="flex aspect-[5/3] flex-col place-content-around rounded-md bg-pink p-2 text-center"
    >
      <div className="font-semibold uppercase text-white">
        <p>{item.name}</p>
      </div>

      <div className="flex flex-row place-content-between text-xs text-primary-foreground">
        <p>{`P ${item.price}`}</p>
        <p>{`Stock: ${item.stock}`}</p>
      </div>
    </div>
  ));

  return (
    <ScrollArea className="my-2 whitespace-nowrap rounded-md">
      <div className="relative z-0 grid auto-cols-auto grid-flow-col grid-rows-4 gap-2">
        {mappedDivs}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

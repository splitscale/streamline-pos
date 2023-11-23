/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

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
  addToCart: (item: { name: string; price: number }) => void;
}

export default function ItemCard({ addToCart, card = [] }: Props) {
  const mappedDivs = card.map((item, index) => (
    <div
      key={index}
      onClick={() => addToCart({ name: item.name, price: Number(item.price) })}
      className=" h-24 rounded-md bg-pink text-center sm:aspect-square sm:h-auto md:h-auto"
    >
      <div className="mt-4 grid grid-rows-2 font-bold text-white md:mt-16 md:text-6xl">
        <div>{item.name}</div>
        <div>{item.price}</div>
      </div>
    </div>
  ));

  return <div className="grid grid-cols-3 gap-2 p-2">{mappedDivs}</div>;
}

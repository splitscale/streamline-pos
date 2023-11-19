/* eslint-disable @next/next/no-img-element */
import { useState } from "react";


interface Props {
  card: {
    name:string,
    price:number
  }[],
  addToCart: (item: { name: string; price: number }) => void;
 }

export default function ItemCard({ addToCart, card}: Props) {
  const mappedDivs = card.map((item, index) => (
    <div key={index}  
    onClick={() => addToCart({ name: item.name, price: Number(item.price) })}
    className=" h-24 rounded-md bg-pink text-center md:h-auto sm:h-auto sm:aspect-square">
      <div className="md:mt-16 md:text-6xl font-bold text-white grid grid-rows-2 mt-4">

      <div>
      {item.name}
      </div>
      <div>

      {item.price}
      </div>
    </div>
      </div>
   ));

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {mappedDivs}

    </div>
  );
}
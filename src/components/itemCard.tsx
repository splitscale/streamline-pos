/* eslint-disable @next/next/no-img-element */

import { DbItem } from "~/pages/inventory";

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
      className="flex h-fit min-h-full w-28 min-w-full flex-col place-content-between rounded-md bg-pink p-2 text-center"
    >
      <div className="font-semibold uppercase text-white ">
        <p className="whitespace-normal break-normal">{item.name}</p>
      </div>

      <div className="flex flex-row place-content-between text-xs text-primary-foreground">
        <p>{`P ${item.price}`}</p>
        <p>{`Stock: ${item.stock}`}</p>
      </div>
    </div>
  ));

  return mappedDivs;
}

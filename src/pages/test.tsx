import { useState } from "react";
import { CashierCard, CashierCardProps } from "~/components/cashierCard";

export default function Test() {
  let arr: CashierCardProps[] = [
    {
      id: "awdger",
      name: "Lorem Ipsum dolor sit amet, consectetur adipiscing elit",
      price: 25,
      quantity: 2,
      comment:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit qui fugiat aliquam quae ea, quidem alias, doloremque dolor odit deserunt commodi. Repellat ducimus eum laudantium asperiores reiciendis quisquam eius facere",
      onTrash: handleDelete,
    },
    {
      name: "Lorem Ipsum dolor sit amet",
      price: 25,
      quantity: 2,
      comment: "",
      id: "dawd23",
      onTrash: handleDelete,
    },
  ];

  const [items, setItems] = useState<CashierCardProps[]>(arr);

  function handleDelete(targetId: string) {
    console.log(targetId);

    const filtered: CashierCardProps[] = [];

    items.forEach((item) => {
      if (item.id !== targetId) filtered.push(item);
    });

    setItems(filtered);
  }

  return (
    <div>{items ? items.map((item) => <CashierCard {...item} />) : null}</div>
  );
}

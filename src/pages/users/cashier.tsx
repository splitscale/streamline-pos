/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

interface Props {
  addToCart: (item: { name: string; price: number }) => void;
}

export default function ItemCard({ addToCart }: Props) {
  const [messages, setMessages] = useState<string[]>([]);

  const handleButtonClick = () => {
    console.log("clicked");
    setMessages([...messages, "Hello"]);
    const item = { name: "SCM1", price: 100 }; // Replace with actual item
    addToCart(item);
  };

  return (

    <><div className="grid  gap-2 grid-cols-3 h-28">
      <div className="bg-orange-700 p-4 rounded-md w-2/3 ">1 </div>
      <div className="bg-blue-700 p-4 rounded-md w-2/3"> 2</div>
      <div className="bg-red-700 p-4 rounded-md w-2/3"> 3</div>

    </div><div className="grid  gap-2 grid-cols-3 h-28">
        <div className="bg-orange-700 p-4 rounded-md w-2/3 ">1 </div>
        <div className="bg-blue-700 p-4 rounded-md w-2/3"> 2</div>
        <div className="bg-red-700 p-4 rounded-md w-2/3"> 3</div>
      </div></>
   
   


  );
}
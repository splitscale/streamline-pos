/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface Props {
    addToCart: (item: { name: string; price: number;}) => void;
}

export default function ItemCard({ addToCart }: Props) {
 const [messages, setMessages] = useState<string[]>([]);

 const handleButtonClick = () => {
     console.log('clicked');
     setMessages([...messages, 'Hello']);
     const item = { name: 'SCM1', price: 100 };  // Replace with actual item
     addToCart(item);
 }
 
 return (
     <div className="mt-12 px-6 py-4 grid grid-cols-3 gap-4 place-content-center ...">
 <div className=" content-center items-center mx-auto bg-red-400 rounded-xl shadow-md overflow-hidden max-w-screen-l">
  <div className="content-center items-center md:flex">
    <div className="p-6 content-center items-center">
      <a onClick={handleButtonClick}className=" text-center content-center block mt-1 text-lg leading-tight  text-white font-bold ">SCM 1</a>
      <p className=" text-center content-center mt-2 text-white font-bold">Ikaw</p>
    </div>
  </div>
</div>




 

     </div>

 )
 }
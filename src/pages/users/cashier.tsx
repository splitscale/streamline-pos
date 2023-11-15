/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useState } from 'react';
import ItemCard from '~/components/itemCard';
import { Navbar } from '~/components/navbar';

import SearchBar from '~/components/searchbar';


export default function CounterPage() {
 const [cartItems, setCartItems] = useState<any[]>([]);
 const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

 // Adds an item to the cart.
 const addToCart = (item: any) => {
   setCartItems((prevItems) => [...prevItems, { item, quantity: 1 }]);
 };

 // Increments the quantity of an item in the cart.
 const incrementQuantity = (item: any) => {
   setCartItems((prevItems) => 
     prevItems.map(cartItem => 
       cartItem.item === item ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
     )
   );
 };

 // Decrements the quantity of an item in the cart.
 const decrementQuantity = (item: any) => {
   setCartItems((prevItems) => 
     prevItems.map(cartItem => 
       cartItem.item === item ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
     )
   );
 };
 
 return (
   <>

   <div className='grid-rows-3'>
   <SearchBar/>
   <ItemCard addToCart={addToCart}/>
   <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
   <div className='mt-10'>
    {cartItems.map((cartItem, index) => (
        
      <div className=' grid grid-cols-3 gap-4 m-10  w-3/4 p-4 pl-10 text-sm 
        text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
     dark:bg-gray-300 dark:placeholder-gray-400 
        dark:text-black font-bold ' key={index}>
            <div>
            {cartItem.item.name}: ${cartItem.item.price}
            </div>
            <div className='text-black font-extrabold'>
              
        <button className='bg-orange-400 px-5'onClick={() => decrementQuantity(cartItem.item)}>-</button>
        <span className='bg-gray-400  px-5'>{cartItem.quantity}</span>
        <button className='bg-orange-400  px-5' onClick={() => incrementQuantity(cartItem.item)}>+</button>
            </div>
        </div>
    ))}
   </div>
   </div>
   </>

 )
 }

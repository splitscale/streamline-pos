interface Item {
    name: string;
    price: string;
   }
   
   interface CartItem {
    item: Item;
    quantity: number;
    comments?: string;
   }
   
   interface PaymentProps {
    cartItems: CartItem[];
   }
   
   export default function Payment ({cartItems}: PaymentProps) {
    console.log('cartItems:', cartItems);
   
    if (cartItems) {
     console.log('cartItems is defined');
     console.log('cartItems is an array:', Array.isArray(cartItems));
     console.log('cartItems length:', cartItems.length);
    } else {
     console.log('cartItems is undefined');
    }
   
    return (
     <div>payment</div>
    )
   }
   
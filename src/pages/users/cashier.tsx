/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { SetStateAction, useState } from "react";
import ItemCard from "~/components/itemCard";
import { Navbar } from "~/components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "~/components/searchbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { api } from "~/utils/api";
import { orderCodeGenerator } from "~/components/randomCodeGen";


export default function CounterPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amountPayable,setAmountPayable] = useState(0)
  const [receiveAmount,setReceiveAmount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const handleCommentOpen = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    setCommentOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Adds an item to the cart.
  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, { item, quantity: 1 }]);
  };
  //Deletes the item from the cart
  const removeFromCart = (itemToRemove: any) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.item !== itemToRemove),
    );
  };
  // Increments the quantity of an item in the cart.
  const incrementQuantity = (item: any) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.item === item
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  // Decrements the quantity of an item in the cart.
  const decrementQuantity = (item: any) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.item === item
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };
  const addComment = (item: any, comment: string) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.item === item ? { ...cartItem, comment: comment } : cartItem,
      ),
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleModal2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };
  const toggleModal3 = () => {
    setIsModalOpen3(!isModalOpen3);
  };
  const toggleDiscount = (discountAmount: number)=>{
    setDiscount(discountAmount)
  }

  const mockData = [
    { name: "Item 1", price: 100 },
    { name: "Item 2", price: 200 },
    { name: "Item 3", price: 300 },
    { name: "Item 1", price: 100 },
    { name: "Item 2", price: 200 },
    { name: "Item 3", price: 300 },
    { name: "Item 1", price: 100 },
    { name: "Item 2", price: 200 },
    { name: "Item 3", price: 300 },

    // More items...
  ];
  const {
    data: item,
    isLoading,
    isError,
  } = api.cashier.getAllItem.useQuery({user_id:"123"});
  const clearCart = () => {
    setCartItems([]);
  };
  // clear amount when done
  const clearAmountPayable = () => {
    setAmountPayable(0)
  }

  // clear discount to 0 when done
  const clearDiscountAmount = () => {
    setDiscount(0)
  }
  const total = cartItems.reduce((total, cartItem) => {
    return total + Number(cartItem.quantity) * Number(cartItem.item.price);
  }, 0);

  const discountRate = discount/100
  const discountAmount = total * discountRate;
  const discountPayable = total - discountAmount;
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setReceiveAmount(value);
 };

 const [showWarning, setShowWarning] = useState(false);
 const checkCartItems = () => {
  if (cartItems.length === 0) {
    console.log("Cart is Empty")
  } else {
    toggleModal()
  }
 };
 const addItemOrder = api.cashier.createItemOrder.useMutation();
 const salesOrder = api.cashier.createSale.useMutation();
 const orderCode = orderCodeGenerator();
 const [customerName,setCustomerName] = useState("");
  return (
    <>
      <div className="m-2 grid-rows-3 items-center text-black ">
        <SearchBar />

        <ItemCard addToCart={addToCart} card={item} />

        <hr className="m-4 h-px bg-gray-200  dark:bg-gray-700"></hr>

        {cartItems.map((cartItem, index) => (
          <div
            className=" text-black grid grid-cols-3 items-center gap-1 rounded-md border-4  border-gray-100 md:text-3xl "
            key={index}
          >
            <div className="grid grid-rows-2  text-center ">
              <div className="font-bold">{cartItem.item.name}</div>
              <div>{cartItem.item.price}</div>
              <div>{cartItem.comment}</div>
            </div>
            <div className=" grid grid-cols-3 rounded-full bg-pink  ">
              <div
                className=" py-2 text-center font-bold"
                onClick={() => decrementQuantity(cartItem.item)}
              >
                <FontAwesomeIcon icon={faMinus} style={{ color: "#ffffff" }} />
              </div>
              <div className=" text-center text-2xl font-bold text-stone-50 md:text-4xl">
                <div>{cartItem.quantity}</div>
              </div>
              <div
                className=" py-2 text-center font-bold"
                onClick={() => incrementQuantity(cartItem.item)}
              >
                <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
              </div>
            </div>
            <div className=" grid grid-cols-2 text-center text-2xl text-red-500 ">
              <div>
                <div>
                  <FontAwesomeIcon
                    icon={faClipboard}
                    onClick={handleCommentOpen}
                  />
                </div>

                <Dialog
                  open={commentOpen}
                  onClose={handleCommentClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Add Comment"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Please enter a comment for this item.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Comment"
                      type="text"
                      fullWidth
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCommentClose}>Cancel</Button>
                    <Button
                      onClick={() => {
                        handleCommentClose();
                        addComment(cartItem.item, comment);
                        console.log(cartItems);
                      }}
                    >
                      Done
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <FontAwesomeIcon icon={faTrash} onClick={handleClickOpen} />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this item?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        removeFromCart(cartItem.item);
                      }}
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
        <div
          className=" flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50 mx-4 mb-4 mt-3"
          onClick={(checkCartItems)}
        >
          Proceed Payment
        </div>

        {isModalOpen && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className=" fixed text-black right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50 overflow-scroll"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal}>
              {"< "}
              Payment{" "}
            </div>
            <div className="text-l rounded m-2 grid w-auto grid-cols-3  gap-2 p-2 text-center font-semibold ">
              <div className="">Item</div>
              <div className="">Quantity</div>
              <div className="">Subtotal</div>   
            </div>

            {cartItems.map((cartItem, index) => (
              <div
                className=" m-2 grid grid-cols-3 items-center gap-1 rounded-lg border-4  border-gray-100
                 bg-gray-300 md:text-3xl "
                key={index}
              >
                <div className=" grid grid-rows-2 p-2 text-center ">
                  <div className="tex-center font-bold">
                    {cartItem.item.name}
                  </div>
                  <div>{cartItem.item.price}</div>
                  <div>{cartItem.comment}</div>
                </div>
                <div className="  text-center font-bold  ">
                  {cartItem.quantity}
                </div>

                <div className=" text-center font-bold ">
                  {Number(cartItem.quantity) * Number(cartItem.item.price)}
                </div>
              </div>
            ))}

            <div className="grid grid-rows-3 p-4">
              <div className="grid grid-cols-2 font-semibold">
                <div>Total</div>
                <div className="text-end">{total}</div>
              </div>
              <div className="grid grid-cols-2 font-semibold text-red-600">
                <div>Discount</div>
                <div className="text-end">-{discountAmount}</div>
              </div>
              <div className="text-l grid grid-cols-2 font-bold">
                <div>Amount Payable</div>
                <div className="text-end">{discountPayable}</div>
              </div>
            </div>
            
            
            <div className="m-2 grid grid-cols-2 rounded-md bg-gray-300 px-2">
              <div className="m-2 ">{discount}</div>
              <div className="  m-2 text-end">%</div>
            </div>
            <div className="m-1 grid grid-cols-5 gap-1 rounded-md px-2 text-center font-semibold text-white">
            <div className="rounded-md bg-pink" onClick={()=>{toggleDiscount(0), setAmountPayable(total - discountAmount)}}>0%</div>
              <div className="rounded-md bg-pink" onClick={()=>{toggleDiscount(25), setAmountPayable(total - discountAmount)}}>25%</div>
              <div className="rounded-md bg-pink" onClick={()=>{toggleDiscount(50), setAmountPayable(total - discountAmount)}}>50%</div>
              <div className="rounded-md bg-pink"onClick={()=>{toggleDiscount(75), setAmountPayable(total - discountAmount)}}>75%</div>
              <div className="rounded-md bg-pink"onClick={()=>{toggleDiscount(100), setAmountPayable(total - discountAmount)}}>100%</div>
            </div>
            <div
              className="ml-1 mr-1 mb-3 mt-3 flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50"
              onClick={()=>{toggleModal2(),setAmountPayable(total - discountAmount)}}
            >
              Receive Payment
            </div>
          </div>
        )}

        {isModalOpen2 && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className=" fixed right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal2}>
              {"< "}
              Receive
            </div>
            <div className="mt-32 items-center text-center text-5xl font-bold">
              ₱ {discountPayable}
            </div>
            <div className="items-center text-center font-semibold text-gray-500">
              Amount Payable
            </div>
            <div className="p-2 gap-5 grid grid-cols-2 mt-16 items-center justify-center">
            <div className="">
            <input className="border-red-100 border-2 w-56" value={receiveAmount} onChange={setValue}></input>

            </div>
            <div className="bg-pink fles text-xl item-center text-center rounded-md h-auto mx-10 text-white  w-3/4"
            onClick={()=>{
              setReceiveAmount(amountPayable)
            }}
            >
              exact
            </div>
            </div>
            <div className="mt-5  ml-2 mr-2 gap-2 grid-row 3 grid text-center font-semibold text-white">
              <div className="gap-1 grid grid-cols-3 h-10">
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(10)}}>10</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(20)}}>20</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(50)}} >50</div>
              </div>
              <div className="gap-1 grid grid-cols-3 h-10">
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(100)}}>100</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(200)}}>200</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(300)}}>300</div>
              </div>
              <div className="gap-1 grid grid-cols-3 h-10 ">
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(400)}}>400</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(500)}}>500</div>
                <div className="bg-pink rounded-md" onClick={()=>{setReceiveAmount(1000)}}>1000</div>
              </div>
            </div>
           
            <div
              className="mt-10 ml-1 mr-1 flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50"
              onClick={toggleModal3}
            >
              Receive Payment
            </div>
          </div>
          
        )}
        {isModalOpen3 && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className=" fixed right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal3}>
              {"< "}
              Done
            </div>
            <div className="mt-56 items-center text-center text-6xl font-bold">
              ₱ {receiveAmount-discountPayable}
            </div>
            <div className="mb-20 items-center text-center text-xl font-semibold text-gray-500">
              Change
            </div>
            <input className=" border-red-100 border-2 w-full" placeholder="Customers Name" value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    ></input>
           
            <div
              className="mt-10 ml-1 mr-1 flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50"
              onClick={(e)=>{ e.preventDefault(); 
                
                salesOrder.mutate({
                  user_id:'123',
                  sales_Id: orderCode,
                  customer_name: customerName,
                  cashier_name: "Ferj2",
                  initial_price: total,
                  discount: discount,
                  final_price: discountPayable,
                  payment:receiveAmount
                });
                setTimeout(() => {
                cartItems.forEach((cartItem, index) => {
                  setTimeout(() => {
                    addItemOrder.mutate({
                      sales: {
                        connect: {
                          sales_Id: orderCode,
                        },
                      },
                      name: cartItem.item.name,
                      price: cartItem.item.price,
                      quantity: cartItem.quantity,
                      comment: cartItem.comment,
                    });
                  }, index * 500);
                 });
                }, 1000);
                
                
                toggleModal3(),toggleModal(),toggleModal2(),clearCart(),clearAmountPayable(),clearDiscountAmount()
              
              }}
            >
              DONE
            </div>
          </div>
          
        )}

      </div>
    </>
  );
}
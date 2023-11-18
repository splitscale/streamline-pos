/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useState } from "react";
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

export default function CounterPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [discount, setDiscount] = useState("");

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const mockData = [
    { name: "Item 1", price: "100" },
    { name: "Item 2", price: "200" },
    { name: "Item 3", price: "300" },
    { name: "Item 1", price: "100" },
    { name: "Item 2", price: "200" },
    { name: "Item 3", price: "300" },
    { name: "Item 1", price: "100" },
    { name: "Item 2", price: "200" },
    { name: "Item 3", price: "300" },

    // More items...
  ];

  const total = cartItems.reduce((total, cartItem) => {
    return total + Number(cartItem.quantity) * Number(cartItem.item.price);
  }, 0);
  return (
    <>
      <div className="grid-rows-3 items-center">
        <SearchBar />

        <ItemCard addToCart={addToCart} card={mockData} />

        <hr className="m-4 h-px bg-gray-200  dark:bg-gray-700"></hr>

        {cartItems.map((cartItem, index) => (
          <div
            className=" grid grid-cols-3 items-center gap-1 rounded-md border-4  border-gray-100 md:text-3xl "
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
          className=" flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50"
          onClick={toggleModal}
        >
          Proceed Payment
        </div>

        {isModalOpen && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className=" fixed right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50"
          >
            <div className="text-2xl font-bold m-2" onClick={toggleModal}> Payment </div>
            <div className="text-l rounded- m-2 grid w-auto grid-cols-3  gap-2 p-2 text-center font-semibold ">
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
                <div className=" grid grid-rows-2 p-2 text-center  ">
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
                <div className="text-end">-{total}</div>
              </div>
              <div className="text-l grid grid-cols-2 font-bold">
                <div>Amount Payable</div>
                <div className="text-end">{total}</div>
              </div>
            </div>
            <div className="m-2 grid grid-cols-2 rounded-md bg-gray-300 px-2">
              <div className="m-2 ">Discount</div>
              <div className="  m-2 text-end">%</div>
            </div>
            <div className="m-1 grid gap-1 grid-cols-4 rounded-md text-center text-white font-semibold px-2">
              <div className="rounded-md bg-pink">25%</div>
              <div className="rounded-md bg-pink">50%</div>
              <div className="rounded-md bg-pink">75%</div>
              <div className="rounded-md bg-pink">100%</div>
            </div>
            <div
          className="ml-1 mr-1 flex h-10 items-center justify-center rounded-md bg-pink text-xl font-bold text-stone-50"
          onClick={toggleModal}
        >
          Receive Payment
        </div>
          </div>
        )}
      </div>
    </>
  );
}

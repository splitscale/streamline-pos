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

export default function CounterPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
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
            </div>
            <div className=" bg-pink grid grid-cols-3 rounded-full  ">
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
                        console.log(cartItems)
                        console.log(cartItem)
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
        <div className=" bg-pink h-10 rounded-md  text-center text-xl font-bold text-stone-50">
          Proceed Payment
        </div>
      </div>
    </>
  );
}

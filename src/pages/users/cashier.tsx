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
import TextField from "@mui/material/TextField";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { orderCodeGenerator } from "~/components/randomCodeGen";
import { Input } from "~/components/ui/input";

export default function CounterPage(props: { uid: string }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [discount, setDiscount] = useState(0);
  const [amountPayable, setAmountPayable] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
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
  const toggleDiscount = (discountAmount: number) => {
    setDiscount(discountAmount);
  };

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
  } = api.cashier.getAllItem.useQuery({ user_id: props.uid });

  const clearCart = () => {
    setCartItems([]);
  };
  // clear amount when done
  const clearAmountPayable = () => {
    setAmountPayable(0);
  };

  // clear discount to 0 when done
  const clearDiscountAmount = () => {
    setDiscount(0);
  };
  const total = cartItems.reduce((total, cartItem) => {
    return total + Number(cartItem.quantity) * Number(cartItem.item.price);
  }, 0);

  const discountRate = discount / 100;
  const discountAmount = total * discountRate;
  const discountPayable = total - discountAmount;
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setReceiveAmount(value);
  };

  const [showWarning, setShowWarning] = useState(false);
  const checkCartItems = () => {
    if (cartItems.length === 0) {
      console.log("Cart is Empty");
    } else {
      toggleModal();
    }
  };
  const addItemOrder = api.cashier.createItemOrder.useMutation();
  const salesOrder = api.cashier.createSale.useMutation();
  const orderCode = orderCodeGenerator();
  const [customerName, setCustomerName] = useState("");
  return (
    <>
      <div className="m-2 grid-rows-3 items-center text-black ">
        <SearchBar />

        <ItemCard addToCart={addToCart} card={item} />

        <hr className="m-4 h-px bg-gray-200  dark:bg-gray-700"></hr>

        <div className="grid grid-cols-1 gap-2">
          {cartItems.map((cartItem, index) => (
            <div
              className=" grid grid-cols-3 items-center gap-2 rounded-md bg-gray-200 text-black"
              key={index}
            >
              <div className="grid grid-rows-2 text-center text-black">
                <div className="text-lg font-semibold normal-case">
                  {cartItem.item.name}
                </div>
                <p>{`P ${cartItem.item.price * cartItem.quantity}`}</p>
                <p>{cartItem.comment}</p>
              </div>
              {/* qty control */}
              <div className="grid grid-cols-3 rounded-full bg-pink">
                <div
                  className="self-center p-3"
                  onClick={() => decrementQuantity(cartItem.item)}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{ color: "#ffffff" }}
                    size="xs"
                  />
                </div>

                <div className="flex content-center justify-center ">
                  <p className="self-center  text-center text-xl font-semibold text-white">
                    {cartItem.quantity}
                  </p>
                </div>

                <div
                  className="self-center p-3"
                  onClick={() => incrementQuantity(cartItem.item)}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
                </div>
              </div>

              {/* comment control */}
              <div className=" grid grid-cols-2 text-center text-2xl text-red-500 ">
                <div>
                  <div className="p-5">
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
                      <Button
                        variant={"secondary"}
                        onClick={handleCommentClose}
                      >
                        Cancel
                      </Button>
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
                  <div className="p-5">
                    <FontAwesomeIcon icon={faTrash} onClick={handleClickOpen} />
                    <div />

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
                        <Button variant={"secondary"} onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant={"destructive"}
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
            </div>
          ))}
        </div>

        <div className="pt-2">
          {cartItems.length !== 0 ? (
            <Button
              className="hover:bg-pink-600  w-full rounded-md"
              variant="default"
              onClick={checkCartItems}
            >
              Proceed to payment
            </Button>
          ) : null}
        </div>

        {isModalOpen && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="container fixed right-0 top-0 z-50  h-screen  w-screen justify-center overflow-scroll bg-slate-50 text-black"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal}>
              {"< "}
              Payment{" "}
            </div>
            <div className="text-l m-2 grid w-auto grid-cols-3 gap-2  rounded p-2 text-center font-semibold ">
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
            <div className="grid-col-1 grid gap-2">
              <div className="grid grid-cols-5 gap-1 rounded-md px-2 text-center font-semibold text-white">
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(0), setAmountPayable(total - discountAmount);
                  }}
                >
                  0%
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(25),
                      setAmountPayable(total - discountAmount);
                  }}
                >
                  25%
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(50),
                      setAmountPayable(total - discountAmount);
                  }}
                >
                  50%
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(75),
                      setAmountPayable(total - discountAmount);
                  }}
                >
                  75%
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(100),
                      setAmountPayable(total - discountAmount);
                  }}
                >
                  100%
                </Button>
              </div>

              <div>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    toggleModal2(), setAmountPayable(total - discountAmount);
                  }}
                >
                  Receive Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen2 && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="container fixed right-0 top-0 z-50  h-screen  w-screen  overflow-scroll bg-slate-50"
          >
            <div className=" m-2 text-2xl font-bold" onClick={toggleModal2}>
              {"< "}
              Receive
            </div>

            <div className="grid grid-rows-2">
              <div className="self-center ">
                <div className="items-center text-center text-5xl font-bold">
                  ₱ {discountPayable}
                </div>
                <div className="items-center text-center font-semibold text-gray-500">
                  Amount Payable
                </div>
              </div>

              <div className="grid grid-rows-2 gap-5">
                <div>
                  {/* input control */}
                  <div className="grid grid-cols-2 gap-2 py-5">
                    <Input
                      value={receiveAmount}
                      type="number"
                      onChange={setValue}
                    />

                    <Button
                      variant={"default"}
                      onClick={() => {
                        setReceiveAmount(amountPayable);
                      }}
                    >
                      Exact
                    </Button>
                  </div>

                  {/* keypad */}
                  <div className="grid-row-3 grid gap-2">
                    {/* row 1 */}
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(10);
                        }}
                      >
                        10
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(20);
                        }}
                      >
                        20
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(50);
                        }}
                      >
                        50
                      </Button>
                    </div>

                    {/* row 2 */}
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(100);
                        }}
                      >
                        100
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(200);
                        }}
                      >
                        200
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(300);
                        }}
                      >
                        300
                      </Button>
                    </div>

                    {/* row 3 */}
                    <div className="grid grid-cols-3 gap-1 ">
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(400);
                        }}
                      >
                        400
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(500);
                        }}
                      >
                        500
                      </Button>
                      <Button
                        variant={"default"}
                        onClick={() => {
                          setReceiveAmount(1000);
                        }}
                      >
                        1000
                      </Button>
                    </div>
                  </div>
                </div>

                {/* submit control */}
                <div>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={toggleModal3}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpen3 && (
          <div
            id="staticModal"
            data-modal-backdrop="static"
            aria-hidden="true"
            className="container fixed right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal3}>
              {"< "}
              Change
            </div>

            <div className="grid grid-rows-3">
              {/* data view */}
              <div>
                <div className="mt-56 items-center text-center text-6xl font-bold">
                  ₱ {receiveAmount - discountPayable}
                </div>
                <div className="mb-20 items-center text-center text-xl font-semibold text-gray-500">
                  Change
                </div>
              </div>

              {/* input control */}
              <div>
                <Input
                  placeholder="Customer Name"
                  value={customerName}
                  type="text"
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              {/* submit control */}
              <div>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();

                    salesOrder.mutate({
                      user_id: "123",
                      sales_Id: orderCode,
                      customer_name: customerName,
                      cashier_name: "Ferj2",
                      initial_price: total,
                      discount: discount,
                      final_price: discountPayable,
                      payment: receiveAmount,
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

                    toggleModal3(),
                      toggleModal(),
                      toggleModal2(),
                      clearCart(),
                      clearAmountPayable(),
                      clearDiscountAmount();
                  }}
                >
                  Nice
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

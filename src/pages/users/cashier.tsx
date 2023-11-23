/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useState } from "react";
import ItemCard from "~/components/itemCard";
import SearchBar from "~/components/searchbar";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { orderCodeGenerator } from "~/components/randomCodeGen";
import { Input } from "~/components/ui/input";
import { CashierCard } from "~/components/cashierCard";

export default function CounterPage(props: { uid: string }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);
  const [amountPayable, setAmountPayable] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  // Adds an item to the cart.
  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, { item, quantity: 1 }]);
  };

  const incrementQuantity = (quantity: number, name: string) => {
    const mapped = cartItems.map((cartItem) =>
      cartItem.item.name === name
        ? { ...cartItem, quantity: quantity }
        : cartItem,
    );

    setCartItems(mapped);

    console.log(`[QUANTITY SET] Item: ${name}, New Quantity: ${quantity}`);
  };

  //Deletes the item from the cart
  const removeFromCart = (name: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.item.name !== name),
    );
  };

  const addComment = (comment: string, name: string) => {
    const mapped = cartItems.map((cartItem) =>
      cartItem.item.name === name
        ? { ...cartItem, comment: comment }
        : cartItem,
    );

    setCartItems(mapped);

    console.log("[COMMENT ADDED] ", cartItems);
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

  const checkCartItems = () => {
    console.log("[CART ITEMS] ", cartItems);

    if (cartItems.length === 0) {
      console.log("Cart is Empty");
    } else {
      toggleModal();
    }
  };

  const utils = api.useUtils();

  const addItemOrder = api.cashier.createItemOrder.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const salesOrder = api.cashier.createSale.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const orderCode = orderCodeGenerator();
  const [customerName, setCustomerName] = useState("");
  return (
    <>
      <div className="m-2 grid-rows-3 items-center text-black ">
        <SearchBar />

        <ItemCard addToCart={addToCart} card={item} />

        <hr className="m-4 h-px bg-gray-200  dark:bg-gray-700"></hr>

        <div className="grid grid-cols-1 gap-2">
          {/* 
          items_id: string;
        user_id: string;
        name: string;
        price: number;
        stock: number;
          */}
          {cartItems.map((cartItem, index) => (
            <CashierCard
              key={index}
              id={cartItem.id}
              name={cartItem.item.name}
              price={cartItem.item.price}
              quantity={cartItem.quantity}
              comment={cartItem.comment}
              onTrash={removeFromCart}
              onComment={addComment}
              onQuantitySet={incrementQuantity}
            />
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
            className="container fixed right-0 top-0 z-50  h-screen  w-screen justify-center overflow-scroll bg-slate-50 text-black "
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal}>
              {"< "}
              Payment
            </div>

            <div className="grid grid-cols-1 gap-2">
              {cartItems.map((cartItem, index) => (
                <div
                  className="flex flex-col gap-2 divide-y-2 divide-dashed divide-slate-500 rounded-md bg-gray-300 p-2"
                  key={index}
                >
                  <div className="flex flex-col px-2">
                    <div className="flex flex-row place-content-between   text-start">
                      <p className="truncate font-semibold">{`${cartItem.quantity}x ${cartItem.item.name}`}</p>

                      <p className=" font-bold">
                        {`P ${
                          Number(cartItem.quantity) *
                          Number(cartItem.item.price)
                        }`}
                      </p>
                    </div>

                    <p>{`P ${cartItem.item.price}`}</p>
                  </div>

                  {cartItem.comment ? (
                    <div className="flex grow flex-col">
                      <p className="whitespace-pre-wrap break-words text-sm normal-case">
                        {cartItem.comment}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

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

            <div className="my-2 flex grow flex-row gap-2">
              <div className="flex grow flex-row  rounded-md bg-gray-300 px-2">
                <Input
                  className="border-transparent bg-transparent"
                  value={discount === 0 ? undefined : discount}
                  type="number"
                  onChange={(e) => toggleDiscount(Number(e.target.value))}
                />
                <div className="m-2 text-end">%</div>
              </div>
              <Button
                className="w-16"
                variant={"destructive"}
                onClick={() => toggleDiscount(0)}
              >
                Clear
              </Button>
            </div>

            <div className="grid-col-1 grid gap-2">
              <div className="grid grid-cols-5 gap-2 rounded-md">
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    toggleDiscount(10),
                      setAmountPayable(total - discountAmount);
                  }}
                >
                  10%
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
            className=" fixed right-0 top-0 z-50  h-screen  w-screen  overflow-hidden bg-slate-50"
          >
            <div className=" m-2 text-2xl font-bold" onClick={toggleModal2}>
              {"< "}
              Receive
            </div>

            <div className="container flex h-screen flex-col place-content-evenly">
              <div>
                <div className="items-center text-center text-5xl font-bold">
                  ₱ {discountPayable}
                </div>
                <div className="items-center text-center font-semibold text-gray-500">
                  Amount Payable
                </div>
              </div>

              <div className="flex flex-col justify-center  gap-5 ">
                <div>
                  {/* input control */}
                  <div className="grid grid-cols-2 gap-2 py-5">
                    <Input
                      value={receiveAmount === 0 ? undefined : receiveAmount}
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
            className=" fixed right-0 top-0  z-50  h-screen w-screen justify-center bg-slate-50"
          >
            <div className="m-2 text-2xl font-bold" onClick={toggleModal3}>
              {"< "}
              Change
            </div>

            <div className="container flex h-screen  flex-col  place-content-evenly">
              {/* data view */}
              <div className="justify-center">
                <div className="items-center text-center text-6xl font-bold">
                  ₱ {receiveAmount - discountPayable}
                </div>
                <div className="items-center text-center text-xl font-semibold ">
                  Change
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2">
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
                        user_id: props.uid,
                        sales_Id: orderCode,
                        customer_name: customerName,
                        cashier_name: "default",
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
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { unknown } from "zod";
import { orderCodeGenerator } from "~/components/randomCodeGen";
import { api } from "~/utils/api";

export default function mockpage() {
  const orderCode = orderCodeGenerator();
  const [name, setName] = useState("asd");
  const [price, setPrice] = useState(10);
  const [quantity, setquantity] = useState(1);
  const [comment, setcomment] = useState("commet");

  const itemOrderInput = {
    name: "asd",
    price: 10,
    quantity: 10,
    comment: "asd",
    salesId: 10,
  };

  const addItemOrder = api.cashier.createItemOrder.useMutation();
  const salesOrder = api.cashier.createSale.useMutation();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        salesOrder.mutate({
          sales_Id: orderCode,
          cashier_name: "12axdc",
          initial_price: 10,
          discount: 0,
          final_price: 10,
          sales_date: "asd",
        });


      }}
    >
      mockpage
    </div>
  );
}

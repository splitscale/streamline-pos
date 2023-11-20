/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { unknown } from "zod";

import { api } from "~/utils/api";

export default function mockpage() {
  const [name, setName] = useState("asd");
  const [price, setPrice] = useState(10);
  const [quantity, setquantity] = useState(1);
  const [comment, setcomment] = useState("commet");

  const itemsalesInput = {
    name: "asd",
    price: 10,
    quantity: 10,
    comment: "asd",
    salesId: 10,
  };

  const item = api.cashier.createItem.useMutation();

  const {
    data: sales,
    isLoading,
    isError,
  } = api.cashier.getAllSales.useQuery({user_id:'123'});


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading saless.</div>;
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          item.mutate({
              name: "Item 3",
              user_id: "123",
              price: 300,
              stock: 10,
          })

          console.log(sales);
        }}
      >
        mockpage
      </div>
      <div>
      {sales.map((sales, index) => (
            <div key={sales.id} className="sha mb-4 bsales p-4">
              <h2 className="mb-2 text-2xl font-bold">sales {index + 1}</h2>
              <div>
                <span className="ml-4 mr-6 text-lg">customer_name:</span> {sales.customer_name}
              </div>
              <div>
                <span className="ml-4 mr-2 text-lg">cashier_name:</span>{" "}
                {sales.cashier_name}
              </div>
              <div>
                <span className="ml-4 mr-2 text-lg">initial_price:</span>{" "}
                {sales.initial_price}
              </div>
              <div>
                <span className="ml-4 mr-8 text-lg">discount_percentage:</span> {sales.discount_percentage}
              </div>
              <div className="ml-4 mt-4">
                <span className="text-lg font-medium"> Items: </span>
                <table>
                  <thead className="bg-yellow-800">
                    <tr>
                      <th
                        scope="col"
                        className="bsales bsales-gray-800 px-6 py-3 text-center"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="bsales bsales-gray-800 px-6 py-3 text-center"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="bsales bsales-gray-800 px-6 py-3 text-center"
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.itemOrders.map((item) => (
                      <tr key={item.itemOrder_id}>
                        <td className="bsales bsales-gray-800 py-2 text-center">
                          {item.name}
                        </td>
                        <td className="bsales bsales-gray-800 py-2 text-center">
                          {" "}
                          {item.quantity}
                        </td>
                        <td className="bsales bsales-gray-800 py-2 text-center">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

export default function EditItem() {
  const router = useRouter();
  const utils = api.useUtils();

  const { id, name, availableUnits, unitPrice } = useParams() || {
    id: "",
    name: "",
    availableUnits: "",
    unitPrice: "",
  };

  const dbItem = api.cashier.updateItem.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
    onError() {
      alert("Failed to update item: ");
    },
  });

  const [itemName, setItemName] = useState<string>(name as string);
  const [itemPrice, setItemPrice] = useState<number>(
    parseInt(unitPrice as string),
  );
  const [itemStock, setItemStock] = useState<number>(
    parseInt(availableUnits as string),
  );

  const handleSubmit = () => {
    // Validate input values (add more validation if needed)
    if (!itemName || !itemPrice || !itemStock) {
      alert("Please fill in all fields");
      return;
    }

    console.log("[SAVING EDITED ITEM] ", id, itemName);

    dbItem.mutate({
      item_id: id as string,
      name: itemName,
      price: itemPrice,
      stock: itemStock,
    });

    router.back();
  };

  return (
    <div className="container flex h-screen touch-none  flex-col overflow-hidden bg-white">
      <div className="my-3 flex items-center">
        <div className="text-lg text-black" onClick={router.back}>
          <ChevronLeft />
        </div>
        <p className="ml-2 text-2xl font-semibold">Add Item</p>
      </div>

      <div className="flex flex-col place-content-start gap-5">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-lg font-bold">Information</p>
          </div>

          <div className="form-wrapper">
            <form className="space-y-2">
              <div className="relative mb-2">
                <input
                  type="text"
                  id="name"
                  className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                  placeholder="Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="number"
                  id="price"
                  className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                  placeholder="Price"
                  value={itemPrice === 0 ? "" : itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="number"
                  id="quantity"
                  className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                  placeholder="Stock Quantity"
                  value={itemStock === 0 ? "" : itemStock}
                  onChange={(e) => setItemStock(Number(e.target.value))}
                />
              </div>
            </form>
          </div>
        </div>
        <Button variant={"default"} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}

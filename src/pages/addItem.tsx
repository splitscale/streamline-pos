import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import router from "next/router";

export default function AddItem() {
  const utils = api.useUtils();
  const { data: sessionData } = useSession();
  const res = sessionData as unknown as { id: string };
  const [uid, setUid] = useState<string>("");
  useEffect(() => {
    if (!res) router.push("/");
    if (res) setUid(res.id);
  });

  const dbItem = api.cashier.createItem.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemStock, setItemStock] = useState("");

  const handleSubmit = () => {
    if (!uid || uid.trim() === "") {
      alert("Please Login");
      return;
    }

    // Validate input values (add more validation if needed)
    if (!itemName || !itemPrice || !itemStock) {
      alert("Please fill in all fields");
      return;
    }

    dbItem.mutate({
      user_id: uid,
      name: itemName,
      price: parseFloat(itemPrice),
      stock: parseInt(itemStock, 10),
    });

    router.back();
  };

  return (
    <div className="container flex h-screen touch-none  flex-col overflow-hidden bg-white">
      <div className="my-3 flex items-center">
        <div className="text-lg font-bold text-black" onClick={router.back}>
          {"<"}
        </div>
        <h1 className="ml-2 text-2xl font-extrabold">Add Item</h1>
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
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </div>

              <div className="relative mb-2">
                <input
                  type="number"
                  id="quantity"
                  className="input-field mx-auto w-full rounded bg-gray-300 p-2"
                  placeholder="Stock Quantity"
                  value={itemStock}
                  onChange={(e) => setItemStock(e.target.value)}
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

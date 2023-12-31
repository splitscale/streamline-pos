/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { BoxCard } from "~/components/BoxCard";
import {
  CallbackValue,
  FileUploadInput,
} from "~/components/form/FIleUploadInput";
import { Button } from "~/components/ui/button";
import { useForceUpdate } from "~/components/useForceUpdate";
import { api } from "~/utils/api";

export interface DbItem {
  items_id: string;
  user_id: string;
  name: string;
  price: number;
  stock: number;
}

export default function Inventory() {
  const router = useRouter();

  const { data: inventoryItems, isFetching } =
    api.cashier.getAllInventoryItems.useQuery();

  const totalStock = inventoryItems?.reduce(
    (total, item) => total + item.stock,
    0,
  );
  const numberOfItems = inventoryItems?.length;

  const utils = api.useUtils();

  const dbItem = api.cashier.createItem.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const handleSubmit = (values: CallbackValue[]) => {
    values.forEach((item) => {
      dbItem.mutate({
        name: item.name,
        price: item.price,
        stock: item.stock,
      });
    });
  };

  return (
    <>
      {/* File input */}
      <FileUploadInput submitCallback={handleSubmit} />
      <div className="gap-5">
        <div className="text-black">
          {/* Metrics */}
          <div className="my-5 grid grid-cols-2 gap-2">
            <div className="rounded-md bg-[#D9D9D9] px-5 py-2 text-black">
              <div className="text-xl font-bold">{numberOfItems}</div>
              <div className="font-semibold">Items</div>
            </div>
            <div className="rounded-md bg-[#D9D9D9] px-5 py-2 text-black">
              <div className="text-xl font-bold">{totalStock}</div>
              <div className="text-sm font-semibold">Stocks remaining</div>
            </div>
          </div>
          {/* current items */}
          <div className="flex-col">
            <div className="mb-2 grid grid-cols-2">
              <div className="text-md self-end font-semibold">Items</div>
              <Button
                variant={"default"}
                onClick={() => router.push("/addItem")}
              >
                Add item
              </Button>
            </div>
            {/* Item list */}
            {isFetching ? (
              <p>Loading...</p>
            ) : (
              inventoryItems?.map((item, index) => (
                <div className="p-2">
                  <BoxCard
                    key={index}
                    id={item.items_id}
                    name={item.name}
                    availableUnits={item.stock}
                    unitPrice={item.price}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { BoxCard } from "~/components/BoxCard";
import { FileUploadInput } from "~/components/form/FIleUploadInput";
import { Button } from "~/components/ui/button";

export function Inventory() {
  return (
    <>
      {/* File input */}
      <FileUploadInput />
      <div className="gap-5">
        <div className="text-black">
          {/* Metrics */}
          <div className="my-5 grid grid-cols-2 gap-2">
            <div className="rounded-md bg-[#D9D9D9] px-5 py-2 text-black">
              <div className="text-xl font-bold">2</div>
              <div className="font-semibold">Items</div>
            </div>
            <div className="rounded-md bg-[#D9D9D9] px-5 py-2 text-black">
              <div className="text-xl font-bold">115</div>
              <div className="text-sm font-semibold">Stocks remaining</div>
            </div>
          </div>
          {/* current items */}
          <div className="flex-col">
            <div className="mb-2 grid grid-cols-2">
              <div className="text-md self-end font-semibold">Items</div>
              <Button variant={"default"}>Add item</Button>
            </div>
            {/* Item list */}
            <div className="my-2 grid grid-cols-1 gap-2 ">
              <BoxCard
                key={1}
                id={"rand1"}
                name="Chimken"
                availableUnits={200}
                unitPrice={50}
              />
              <BoxCard
                key={2}
                id={"rand2"}
                name="Shawarma ni badong"
                availableUnits={35500}
                unitPrice={234}
              />
              <BoxCard
                key={3}
                id={"rand3"}
                name="sigsig eyy nigga"
                availableUnits={2345}
                unitPrice={232}
              />
              <BoxCard
                key={4}
                id={"rand4"}
                name="Shawtyy na magandaaa at di na totoyo"
                availableUnits={1}
                unitPrice={9999999999999}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

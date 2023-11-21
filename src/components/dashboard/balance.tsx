import { Button } from "../ui/button";

export default function DashboardBalance() {
  return (
    <>
      <div className="grid grid-rows-2 rounded-md bg-[#D9D9D9] text-black">
        <div className="mx-4 grid grid-rows-2">
          <div className="text-xl font-bold">P25, 000.00</div>
          <div className="text-xs font-bold">Cashbox Balance</div>
        </div>
        <div className="mx-4 grid grid-cols-2 gap-2">
          <Button className="bg-[#FC7070] bg-opacity-30 font-semibold text-[#FC7070]">
            Cash in
          </Button>
          <Button className="bg-[#FC7070] bg-opacity-30 font-semibold text-[#FC7070]">
            Cash out
          </Button>
        </div>
      </div>
      ;
    </>
  );
}

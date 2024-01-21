import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { LineChart } from "lucide-react";

export default function DashboardMenu() {
  const router = useRouter();

  return (
    <>
      <div className="mb-5 mt-3 grid auto-cols-fr grid-cols-4 gap-5">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#D9D9D9] text-sm text-black">
            soon
          </div>
          <div className="mt-1 text-center text-xs text-[#979797]">Cashier</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#D9D9D9] text-sm text-black">
            <Button
              className="bg-transparent hover:bg-transparent border-none"
              variant="outline"
              size="icon"
              onClick={async () => {
                await router.push("/reports")
              }}
            >
              <LineChart className="h-8 w-8" />
            </Button>
          </div>
          <div className="mt-1 text-center text-xs text-[#979797]">Reports</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#D9D9D9] text-sm text-black">
            soon
          </div>
          <div className="mt-1 text-center text-xs text-[#979797]">Orders</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#D9D9D9] text-sm text-black">
            soon
          </div>
          <div className="mt-1 text-center text-xs text-[#979797]">
            Inventory
          </div>
        </div>
        <div className="flex flex-col items-center rounded-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#D9D9D9] text-black">
            <span className="">...</span>
          </div>
          <div className="mt-1 text-center text-xs text-[#979797]">More</div>
        </div>
      </div>
    </>
  );
}

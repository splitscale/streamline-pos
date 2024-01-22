import EarningsReport from "./dashboard/earningsReports";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Reports() {
  const router = useRouter();
  const { data: totalEarnings } = api.cashier.getTotalEarnings.useQuery();
  const { data: todaysEarnings } = api.cashier.getEarningsToday.useQuery();
  const { data: totalItems } = api.cashier.getTotalItems.useQuery();
  const { data: itemsToday } = api.cashier.getItemsToday.useQuery();

  return (
    <div className="text-center text-3xl font-semibold">
      <div className="my-3 flex items-center">
        <div className="text-lg font-bold text-black" onClick={() => router.back()}>
          <ChevronLeft className="h-8 w-8" />
        </div>
        <h1 className="ml-2 text-2xl font-bold">Reports</h1>
      </div>

      <div className="w-[80%] m-auto mt-6">
        <EarningsReport
          itemsToday={itemsToday}
          totalItems={totalItems}
          todaysEarnings={todaysEarnings}
          totalEarnings={totalEarnings} />
      </div>
    </div>
  );
}

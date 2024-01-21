import { EarningReportProps } from "~/types/global";

export default function EarningsReport(props: EarningReportProps) {
  return (
    <>
      <div className="grid grid-rows-2 gap-2">
        <div className=" grid grid-rows-2 justify-center rounded-md bg-[#FC7070] py-2">
          <div className="text-center text-3xl font-semibold text-[#FFFFFF]">
            {`P ${(props.todaysEarnings ?? 0)
              .toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </div>
          <div className="self-center text-center text-sm text-[#FFFFFF] ">
            Todays Earnings
          </div>
        </div>
        <div className=" grid grid-rows-2 justify-center rounded-md bg-[#FC7070] py-2">
          <div className=" text-center text-3xl font-semibold text-[#FFFFFF]">
            {`P ${(props.totalEarnings ?? 0)
              .toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </div>
          <div className="justify self-center text-center text-sm text-[#FFFFFF] ">
            Total Earnings
          </div>
        </div>
        <div className=" grid grid-rows-2 justify-center rounded-md bg-[#FC7070] py-2">
          <div className="text-center text-3xl font-semibold text-[#FFFFFF]">
            {`${(props.itemsToday ?? 0)
              .toLocaleString('en-US')} items`}
          </div>
          <div className="self-center text-center text-sm text-[#FFFFFF] ">
            Items Sold Today
          </div>
        </div>
        <div className=" grid grid-rows-2 justify-center rounded-md bg-[#FC7070] py-2">
          <div className="text-center text-3xl font-semibold text-[#FFFFFF]">
            {`${(props.totalItems ?? 0)
              .toLocaleString('en-US')} items`}
          </div>
          <div className="self-center text-center text-sm text-[#FFFFFF] ">
            Overall Items Sold
          </div>
        </div>
      </div>
    </>
  );
}

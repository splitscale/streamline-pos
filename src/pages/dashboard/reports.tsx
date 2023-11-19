export default function ReportPage() {

  return (
    <>
      <div className="m-2 text-2xl font-bold" >
        {"< "}
        Reports{" "}
      </div>
      <div className="grid grid-rows-2 m-5 gap-3  ">
        <div className=" grid grid-rows-2 bg-[#FC7070]    justify-center rounded-md py-3">
          <div className="text-3xl text-[#FFFFFF] font-semibold">P 2, 107.00</div>
          <div className="text-sm text-center self-center text-[#FFFFFF] ">Todays Earnings</div>
        </div>
        <div className=" grid grid-rows-2 bg-[#FC7070] justify-center rounded-md py-3">
          <div className="text-3xl text-[#FFFFFF] font-semibold">P 34, 830.00</div>
          <div className="text-sm text-center justify self-center text-[#FFFFFF] ">Total Earnings</div>
        </div>


      </div>
    </>
  )
}
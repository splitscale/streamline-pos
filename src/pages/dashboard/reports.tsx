export default function reportPage() {

  return (
    <>
      <div className="m-2 text-2xl font-bold" >
        {"< "}
        Reports{" "}
      </div>
      <div className="grid grid-rows-2 h-52 m-5 gap-3 ">
        <div className=" flex flex-col bg-[#FC7070] items-center justify-center rounded-md">
          <div className="text-3xl text-[#FFFFFF] font-semibold">P 2, 107.00</div>
          <div className="text-sm text-[#FFFFFF] ">Todays Earnings</div>
        </div>
        <div className=" flex flex-col bg-[#FC7070] items-center justify-center rounded-md">
          <div className="text-3xl text-[#FFFFFF] font-semibold">P 34, 830.00</div>
          <div className="text-sm text-[#FFFFFF] ">Total Earnings</div>
        </div>
      </div>
    </>
  )
}
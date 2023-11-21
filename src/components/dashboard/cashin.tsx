export default function CashInTransaction() {
  return (
    <>
      <div className="my-1 grid grid-cols-2">
        <div className="flex flex-col">
          <div className="text-xs text-[#979797]">Cash in</div>
          <div className="font-semibold">Sarah</div>
        </div>
        <div className="flex flex-col text-end">
          <div className="text-xs text-[#979797]">07 Nov 2023</div>
          <div className="font-semibold text-[#FC7070]">P 1,000.00</div>
        </div>
      </div>
    </>
  );
}

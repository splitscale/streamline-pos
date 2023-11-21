export default function CashOutTransaction() {
  return (
    <div className="my-1 grid grid-cols-2">
      <div className="flex flex-col">
        <div className="text-xs text-[#979797]">Cash out</div>
        <div className="font-semibold">Patrick</div>
      </div>
      <div className="flex flex-col text-end">
        <div className="text-xs text-[#979797]">13 hours ago</div>
        <div className="font-semibold">- P30.00</div>
      </div>
    </div>
  );
}

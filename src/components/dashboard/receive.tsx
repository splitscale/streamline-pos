export default function ReceiveTransaction() {
  return (
    <>
      <div className="my-1 grid grid-cols-2">
        <div className="flex flex-col">
          <div className="text-xs text-[#979797]">Received Payment</div>
          <div className="font-semibold">Bjorn</div>
        </div>
        <div className="flex flex-col text-end">
          <div className="text-xs text-[#979797]">3 minutes ago</div>
          <div className="font-semibold text-[#FC7070]">P250.00</div>
        </div>
      </div>
    </>
  );
}

import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="item-center container flex w-full flex-row place-content-between">
      <div>
        <p className="text-xl font-bold text-black">Streamline POS</p>
        <p className="text-xs text-black">By Splitscale Systems</p>
      </div>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

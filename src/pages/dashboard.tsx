import EarningsReport from "./dashboard/reports";

export default function Dashboard() {
  return (
    <div>
      <EarningsReport todaysEarnings={2500} totalEarnings={35000} />
    </div>
  );
}

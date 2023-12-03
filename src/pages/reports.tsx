import EarningsReport from "./dashboard/earningsReports";

export default function Reports() {
  return (
    <div>
      <EarningsReport todaysEarnings={2500} totalEarnings={35000} />
    </div>
  );
}

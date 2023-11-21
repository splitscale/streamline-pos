export interface Item {
  id: string;
  name: string;
  units: number;
  comment?: string;
}
export interface OrderProps {
  id: string;
  name: string;
  orderId: string;
  items: Item[];
  doneCallback?: (v: string) => void;
}

export interface EarningReportProps {
  todaysEarnings?: number;
  totalEarnings?: number;
}

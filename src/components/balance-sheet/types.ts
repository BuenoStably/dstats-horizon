export interface BalanceSheetEntry {
  id: string;
  address: string;
  asset: string;
  network: string;
  quantity: number;
  exchangeRate: number;
  value: number;
}
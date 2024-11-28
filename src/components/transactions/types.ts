export interface TransactionEntry {
  id: string;
  transaction: string;
  date: string;
  asset: string;
  network: string;
  type: string;
  quantity: number;
}

export interface TransactionHeaderProps {
  formattedDate: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface TransactionRowProps {
  entry: TransactionEntry;
  formatValue: (value: number) => string;
}
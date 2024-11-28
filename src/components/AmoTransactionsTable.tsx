import { useState } from "react";
import BaseDataTable from "./shared/BaseDataTable";
import { TransactionRow } from "./transactions/TransactionRow";
import { TransactionEntry } from "./transactions/types";

interface AmoTransaction {
  id: string;
  transaction: string;
  date: string;
  asset: string;
  network: string;
  type: string;
  quantity: number;
}

const mockData: AmoTransaction[] = [
  {
    id: "1",
    transaction: "0x1234567890abcdef1234567890abcdef12345678",
    date: "Nov 1, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Burn",
    quantity: 50821.50
  },
  {
    id: "2",
    transaction: "0x2345678901abcdef2345678901abcdef23456789",
    date: "Nov 5, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Unallocate",
    quantity: 69420.00
  },
  {
    id: "3",
    transaction: "0x3456789012abcdef3456789012abcdef34567890",
    date: "Nov 8, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Remove Liquidity (Curve dUSD/FRAX LP)",
    quantity: 100000.00
  },
  {
    id: "4",
    transaction: "0x4567890123abcdef4567890123abcdef45678901",
    date: "Nov 10, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Transfer to Reserve",
    quantity: 75250.00
  },
  {
    id: "5",
    transaction: "0x5678901234abcdef5678901234abcdef56789012",
    date: "Nov 12, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Allocate",
    quantity: 425000.00
  },
  {
    id: "6",
    transaction: "0x6789012345abcdef6789012345abcdef67890123",
    date: "Nov 13, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Burn",
    quantity: 250000.00
  },
  {
    id: "7",
    transaction: "0x7890123456abcdef7890123456abcdef78901234",
    date: "Nov 14, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Allocate",
    quantity: 180000.00
  }
];

const AmoTransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: value >= 1000000 ? 'compact' : 'standard'
    }).format(value);
  };

  const formatDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <BaseDataTable
      data={mockData}
      columns={["transaction", "date", "asset", "network", "type", "quantity"]}
      renderRow={(entry) => (
        <TransactionRow
          key={entry.id}
          entry={entry}
          formatValue={formatValue}
        />
      )}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      title="AMO Transactions"
      formatDate={formatDate}
    />
  );
};

export default AmoTransactionsTable;

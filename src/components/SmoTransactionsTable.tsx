import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { ArrowUpDown } from "lucide-react";
import { TransactionHeader } from "./transactions/TransactionHeader";
import { TransactionRow } from "./transactions/TransactionRow";
import { TransactionEntry } from "./transactions/types";

interface SmoTransaction {
  id: string;
  transaction: string;
  date: string;
  asset: string;
  network: string;
  type: string;
  quantity: number;
}

const mockData: SmoTransaction[] = [
  {
    id: "1",
    transaction: "0x1234...5678",
    date: "Nov 1, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Transfer profit to reserve",
    quantity: 50821.50
  },
  {
    id: "2",
    transaction: "0x2345...6789",
    date: "Nov 5, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Flash Redeem",
    quantity: 69420.00
  },
  {
    id: "3",
    transaction: "0x3456...7890",
    date: "Nov 8, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Transfer profit to reserve",
    quantity: 100000.00
  },
  {
    id: "4",
    transaction: "0x4567...8901",
    date: "Nov 10, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Redeem",
    quantity: 75250.00
  },
  {
    id: "5",
    transaction: "0x5678...9012",
    date: "Nov 12, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Transfer profit to reserve",
    quantity: 425000.00
  },
  {
    id: "6",
    transaction: "0x6789...0123",
    date: "Nov 13, 2024",
    asset: "FRAX",
    network: "Fraxtal",
    type: "Flash Redeem",
    quantity: 250000.00
  },
  {
    id: "7",
    transaction: "0x7890...1234",
    date: "Nov 14, 2024",
    asset: "dUSD",
    network: "Fraxtal",
    type: "Redeem",
    quantity: 180000.00
  }
];

const SmoTransactionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof TransactionEntry | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState(false);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSort = (column: keyof TransactionEntry) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: value >= 1000000 ? 'compact' : 'standard'
    }).format(value);
  };

  const sortedAndFilteredData = [...mockData]
    .filter(entry => 
      Object.values(entry).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return sortDirection === "asc" 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const displayedData = expanded 
    ? sortedAndFilteredData 
    : sortedAndFilteredData.slice(0, 5);

  return (
    <Box>
      <TransactionHeader
        formattedDate={formattedDate}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["transaction", "date", "asset", "network", "type", "quantity"].map((column) => (
                <TableCell
                  key={column}
                  onClick={() => handleSort(column as keyof TransactionEntry)}
                  sx={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-start'
                  }}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <ArrowUpDown className="h-4 w-4" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((entry) => (
              <TransactionRow
                key={entry.id}
                entry={entry}
                formatValue={formatValue}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </Box>
    </Box>
  );
};

export default SmoTransactionsTable;
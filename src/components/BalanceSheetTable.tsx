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
import { BalanceSheetHeader } from "./balance-sheet/BalanceSheetHeader";
import { BalanceSheetRow } from "./balance-sheet/BalanceSheetRow";
import { BalanceSheetEntry } from "./balance-sheet/types";
import { SortableTableHeader } from "./shared/SortableTableHeader";

const mockData: BalanceSheetEntry[] = [
  {
    id: "1",
    address: "0x1234...5678",
    asset: "FRAX",
    network: "Fraxtal",
    quantity: 51000.00,
    exchangeRate: 0.9965,
    value: 50821.50
  },
  {
    id: "2",
    address: "0x2345...6789",
    asset: "sFRAX",
    network: "Fraxtal",
    quantity: 920000.00,
    exchangeRate: 1.0875,
    value: 1000000.00
  },
  {
    id: "3",
    address: "0x3456...7890",
    asset: "USDC",
    network: "Fraxtal",
    quantity: 48828.00,
    exchangeRate: 1.0000,
    value: 48828.00
  },
  {
    id: "4",
    address: "0x4567...8901",
    asset: "dUSD/FRAX Curve LP",
    network: "Fraxtal",
    quantity: 500000.00,
    exchangeRate: 1.0000,
    value: 500000.00
  },
  {
    id: "5",
    address: "0x5678...9012",
    asset: "dUSD (unallocated)",
    network: "Ethereum",
    quantity: 400000.00,
    exchangeRate: 1.0000,
    value: 400000.00
  },
  {
    id: "6",
    address: "0x6789...0123",
    asset: "FRAX",
    network: "Fraxtal",
    quantity: 75000.00,
    exchangeRate: 0.9965,
    value: 74737.50
  },
  {
    id: "7",
    address: "0x7890...1234",
    asset: "sFRAX",
    network: "Fraxtal",
    quantity: 150000.00,
    exchangeRate: 1.0875,
    value: 163125.00
  }
];

const BalanceSheetTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof BalanceSheetEntry | null>(null);
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

  const handleSort = (column: keyof BalanceSheetEntry) => {
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

  const formatQuantity = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatExchangeRate = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
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
      <BalanceSheetHeader
        formattedDate={formattedDate}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["address", "asset", "network", "quantity", "exchangeRate", "value"].map((column) => (
                <SortableTableHeader
                  key={column}
                  column={column}
                  onSort={() => handleSort(column as keyof BalanceSheetEntry)}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((entry) => (
              <BalanceSheetRow
                key={entry.id}
                entry={entry}
                formatQuantity={formatQuantity}
                formatExchangeRate={formatExchangeRate}
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

export default BalanceSheetTable;

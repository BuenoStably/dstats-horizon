import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
  const [sortColumn, setSortColumn] = useState<keyof SmoTransaction | null>(null);
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

  const handleSort = (column: keyof SmoTransaction) => {
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
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold leading-none">SMO Transactions</h2>
          <p className="text-sm text-gray-500">
            (Last updated: {formattedDate})
          </p>
        </div>
        <Input
          placeholder="Search Table"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("transaction")}>
              Transaction <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("date")}>
              Date <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("asset")}>
              Asset <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("network")}>
              Network <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("type")}>
              Type <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
            <TableHead className="cursor-pointer text-left" onClick={() => handleSort("quantity")}>
              Quantity <ArrowUpDown className="inline h-4 w-4 ml-1" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-left">
                <a 
                  href={`https://explorer.fraxtal.io/tx/${entry.transaction}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {entry.transaction}
                </a>
              </TableCell>
              <TableCell className="text-left">{entry.date}</TableCell>
              <TableCell className="text-left">{entry.asset}</TableCell>
              <TableCell className="text-left">{entry.network}</TableCell>
              <TableCell className="text-left">{entry.type}</TableCell>
              <TableCell className="text-left">{formatValue(entry.quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default SmoTransactionsTable;
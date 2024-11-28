import { TableRow, TableCell, Link } from "@mui/material";
import { BalanceSheetEntry } from "./types";

interface BalanceSheetRowProps {
  entry: BalanceSheetEntry;
  formatQuantity: (value: number) => string;
  formatExchangeRate: (value: number) => string;
  formatValue: (value: number) => string;
}

export const BalanceSheetRow = ({ 
  entry, 
  formatQuantity, 
  formatExchangeRate, 
  formatValue 
}: BalanceSheetRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Link
          href={`https://explorer.fraxtal.io/address/${entry.address}`}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {entry.address}
        </Link>
      </TableCell>
      <TableCell>{entry.asset}</TableCell>
      <TableCell>{entry.network}</TableCell>
      <TableCell>{formatQuantity(entry.quantity)}</TableCell>
      <TableCell>{formatExchangeRate(entry.exchangeRate)}</TableCell>
      <TableCell>{formatValue(entry.value)}</TableCell>
    </TableRow>
  );
};
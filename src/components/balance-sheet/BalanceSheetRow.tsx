import { TableRow, TableCell, Link, Tooltip } from "@mui/material";
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
        <Tooltip title={entry.address} arrow placement="top">
          <Link
            href={`https://explorer.fraxtal.io/address/${entry.address}`}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {entry.address}
          </Link>
        </Tooltip>
      </TableCell>
      <TableCell>{entry.asset}</TableCell>
      <TableCell>{entry.network}</TableCell>
      <TableCell>{formatQuantity(entry.quantity)}</TableCell>
      <TableCell>
        <Tooltip title={entry.exchangeRate.toFixed(4)} arrow placement="top">
          <span>{formatExchangeRate(entry.exchangeRate)}</span>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title={entry.value.toLocaleString()} arrow placement="top">
          <span>{formatValue(entry.value)}</span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
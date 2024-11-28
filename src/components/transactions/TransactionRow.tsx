import { TableCell, TableRow } from "@mui/material";
import { TransactionRowProps } from "./types";

export const TransactionRow = ({ entry, formatValue }: TransactionRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <a 
          href={`https://explorer.fraxtal.io/tx/${entry.transaction}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#2196f3', textDecoration: 'none' }}
        >
          {entry.transaction}
        </a>
      </TableCell>
      <TableCell>{entry.date}</TableCell>
      <TableCell>{entry.asset}</TableCell>
      <TableCell>{entry.network}</TableCell>
      <TableCell>{entry.type}</TableCell>
      <TableCell>{formatValue(entry.quantity)}</TableCell>
    </TableRow>
  );
};
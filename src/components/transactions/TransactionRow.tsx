import { TableCell, TableRow, Tooltip } from "@mui/material";
import { TransactionRowProps } from "./types";

export const TransactionRow = ({ entry, formatValue }: TransactionRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Tooltip title={entry.transaction} arrow placement="top">
          <a 
            href={`https://explorer.fraxtal.io/tx/${entry.transaction}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2196f3', textDecoration: 'none' }}
          >
            {entry.transaction}
          </a>
        </Tooltip>
      </TableCell>
      <TableCell>{entry.date}</TableCell>
      <TableCell>{entry.asset}</TableCell>
      <TableCell>{entry.network}</TableCell>
      <TableCell>{entry.type}</TableCell>
      <TableCell>
        <Tooltip title={formatValue(entry.quantity)} arrow placement="top">
          <span>{formatValue(entry.quantity)}</span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
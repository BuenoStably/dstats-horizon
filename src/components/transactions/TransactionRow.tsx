import { TableCell, TableRow, Tooltip } from "@mui/material";
import { TransactionRowProps } from "./types";
import { formatAddress } from "@/utils/addressUtils";

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
            {formatAddress(entry.transaction)}
          </a>
        </Tooltip>
      </TableCell>
      <TableCell>{entry.date}</TableCell>
      <TableCell>{entry.asset}</TableCell>
      <TableCell>{entry.network}</TableCell>
      <TableCell>{entry.type}</TableCell>
      <TableCell>{formatValue(entry.quantity)}</TableCell>
    </TableRow>
  );
};
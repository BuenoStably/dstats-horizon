import { TableCell } from "@mui/material";
import { ArrowUpDown } from "lucide-react";

interface SortableTableHeaderProps {
  column: string;
  onSort: (column: any) => void;
}

export const SortableTableHeader = ({ column, onSort }: SortableTableHeaderProps) => {
  return (
    <TableCell
      key={column}
      onClick={() => onSort(column)}
      sx={{ 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: 'center',
        minWidth: '150px',
        padding: '16px'
      }}
    >
      {column.charAt(0).toUpperCase() + column.slice(1)}
      <ArrowUpDown className="h-4 w-4" />
    </TableCell>
  );
};
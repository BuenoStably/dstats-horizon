import { TableCell } from "@mui/material";
import { ArrowUpDown } from "lucide-react";

interface SortableTableHeaderProps {
  column: string;
  onSort: (column: any) => void;
}

export const SortableTableHeader = ({ column, onSort }: SortableTableHeaderProps) => {
  return (
    <TableCell
      onClick={() => onSort(column)}
      sx={{ 
        cursor: 'pointer',
        textAlign: 'center',
        '& > div': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
        },
        minWidth: '150px',
        padding: '16px'
      }}
    >
      <div>
        {column.charAt(0).toUpperCase() + column.slice(1)}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableCell>
  );
};
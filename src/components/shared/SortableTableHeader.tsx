import { TableCell } from "@mui/material";
import { ArrowUpDown } from "lucide-react";

interface SortableTableHeaderProps {
  column: string;
  onSort: (column: any) => void;
}

export const SortableTableHeader = ({ column, onSort }: SortableTableHeaderProps) => {
  // Define specific widths for different column types
  const getColumnWidth = (columnName: string) => {
    switch (columnName.toLowerCase()) {
      case 'transaction':
      case 'address':
        return '140px';  // For hash addresses
      case 'date':
        return '120px';
      case 'asset':
      case 'network':
      case 'type':
        return '100px';
      case 'quantity':
      case 'value':
      case 'exchangerate':
        return '90px';
      default:
        return '100px';
    }
  };

  return (
    <TableCell
      onClick={() => onSort(column)}
      sx={{ 
        cursor: 'pointer',
        textAlign: 'left',
        '& > div': {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
        },
        width: getColumnWidth(column),
        minWidth: getColumnWidth(column),
        padding: '12px'
      }}
    >
      <div>
        {column.charAt(0).toUpperCase() + column.slice(1)}
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableCell>
  );
};
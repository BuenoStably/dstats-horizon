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
        return '120px';  // Reduced from 140px for hash addresses
      case 'date':
        return '140px';  // Increased from 120px
      case 'asset':
      case 'network':
      case 'type':
        return '120px';  // Increased from 100px
      case 'quantity':
      case 'value':
      case 'exchangerate':
        return '110px';  // Increased from 90px
      default:
        return '120px';
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
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import { SortableTableHeader } from "./SortableTableHeader";
import ShowMoreButton from "./ShowMoreButton";

interface BaseDataTableProps<T> {
  data: T[];
  columns: string[];
  renderRow: (entry: T) => React.ReactNode;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  title: string;
  formatDate?: () => string;
}

const BaseDataTable = <T extends { id: string }>({
  data,
  columns,
  renderRow,
  searchTerm,
  onSearchChange,
  title,
  formatDate
}: BaseDataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expanded, setExpanded] = useState(false);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredData = [...data]
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
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <h2>{title}</h2>
            {formatDate && <p>{formatDate()}</p>}
          </Box>
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <SortableTableHeader
                  key={column}
                  column={column}
                  onSort={() => handleSort(column as keyof T)}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((entry) => renderRow(entry))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ShowMoreButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
      </Box>
    </Box>
  );
};

export default BaseDataTable;
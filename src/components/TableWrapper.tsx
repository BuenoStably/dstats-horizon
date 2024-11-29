import { Box } from "@mui/material";
import { ReactNode } from "react";

interface TableWrapperProps {
  children: ReactNode;
}

const TableWrapper = ({ children }: TableWrapperProps) => {
  return (
    <Box 
      sx={{ 
        bgcolor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 2, 
        p: 3, 
        mb: 4 
      }}
    >
      {children}
    </Box>
  );
};

export default TableWrapper;
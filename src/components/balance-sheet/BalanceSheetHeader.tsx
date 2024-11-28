import { Box, Typography, TextField } from "@mui/material";

interface BalanceSheetHeaderProps {
  formattedDate: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const BalanceSheetHeader = ({ 
  formattedDate, 
  searchTerm, 
  onSearchChange 
}: BalanceSheetHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Balance Sheet Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (Last updated: {formattedDate})
        </Typography>
      </Box>
      <TextField
        placeholder="Search Table"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ maxWidth: 300 }}
      />
    </Box>
  );
};
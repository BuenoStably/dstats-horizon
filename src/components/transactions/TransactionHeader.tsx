import {
  Box,
  Typography,
  TextField,
} from "@mui/material";

import { TransactionHeaderProps } from "./types";

export const TransactionHeader = ({
  formattedDate,
  searchTerm,
  onSearchChange,
}: TransactionHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="h5" component="h2">
          Transactions
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
        sx={{ maxWidth: '300px' }}
      />
    </Box>
  );
};
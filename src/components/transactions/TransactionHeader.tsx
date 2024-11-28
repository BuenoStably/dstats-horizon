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
  title,
}: TransactionHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, textAlign: 'left' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'left' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
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
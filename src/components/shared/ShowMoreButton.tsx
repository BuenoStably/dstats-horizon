import { Button } from "@mui/material";

interface ShowMoreButtonProps {
  expanded: boolean;
  onClick: () => void;
}

const ShowMoreButton = ({ expanded, onClick }: ShowMoreButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor: '#8702ff',
        color: 'white',
        '&:hover': {
          bgcolor: '#7002d6'
        },
        fontWeight: 500,
        px: 4,
        py: 1,
      }}
    >
      {expanded ? "Show Less" : "Show More"}
    </Button>
  );
};

export default ShowMoreButton;
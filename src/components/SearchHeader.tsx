import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function Search() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <OutlinedInput
        id="input-with-icon-adornment"
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          width: "auto",
          m: 2,
          ".MuiOutlinedInput-input": {
            padding: "4px 14px",
          },
        }}
      />
      <IconButton aria-label="add" sx={{ mr: 2 }}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}

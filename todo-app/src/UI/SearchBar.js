import React from 'react';
import TextField from '@mui/material/TextField';

function SearchBar({ onSearch }) {
  return (
    <TextField
      fullWidth
      label="Search tasks"
      variant="outlined"
      onChange={(e) => onSearch(e.target.value)}
      margin="normal"
    />
  );
}

export default SearchBar;
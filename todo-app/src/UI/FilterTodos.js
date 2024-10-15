import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

function FilterTodos({ setFilter }) {
  return (
    <ButtonGroup fullWidth variant="contained" sx={{ mb: 2 }}>
      <Button onClick={() => setFilter('all')}>All</Button>
      <Button onClick={() => setFilter('active')}>Active</Button>
      <Button onClick={() => setFilter('completed')}>Completed</Button>
      <Button onClick={() => setFilter('archived')}>Archived</Button>
      <Button onClick={() => setFilter('overdue')}>Overdue</Button>
    </ButtonGroup>
  );
}

export default FilterTodos;
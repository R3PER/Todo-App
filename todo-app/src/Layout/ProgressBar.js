import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function ProgressBar({ todos }) {
  const completedTodos = todos.filter(todo => todo.status === 'completed').length;
  const pausedTodos = todos.filter(todo => todo.status === 'later').length;
  const totalTodos = todos.length;

  const completedProgress = (completedTodos / totalTodos) * 100 || 0;
  const pausedProgress = (pausedTodos / totalTodos) * 100 || 0;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <LinearProgress
        variant="determinate"
        value={completedProgress + pausedProgress}
        sx={{
          height: 10,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#4caf50',  // Zielony dla ukończonych
          },
        }}
      />
      <LinearProgress
        variant="determinate"
        value={pausedProgress}
        sx={{
          height: 10,
          backgroundColor: 'transparent',
          position: 'relative',
          top: -10,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#ff9800',  // Pomarańczowy dla wstrzymanych
          },
        }}
      />
    </Box>
  );
}

export default ProgressBar;
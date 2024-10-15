import React from 'react';
import Button from '@mui/material/Button';

function ResetButton({ onReset }) {
  return (
    <Button variant="outlined" onClick={onReset} fullWidth>
      Reset Progress
    </Button>
  );
}

export default ResetButton;
import React from 'react';
import Typography from '@mui/material/Typography';

function Header() {
  const date = new Date();
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });

  return (
    <header>
      <Typography variant="h3" component="h1">{formattedDate}</Typography>
      <Typography variant="h5">{dayOfWeek}</Typography>
    </header>
  );
}

export default Header;
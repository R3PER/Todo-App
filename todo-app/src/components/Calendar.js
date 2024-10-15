import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { Grid, Typography, IconButton, Paper, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Calendar({ todos }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const theme = useTheme();

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const renderHeader = () => {
    return (
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <IconButton onClick={prevMonth}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h5">
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={nextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEEE';
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item key={i} xs>
          <Typography align="center" sx={{ fontWeight: 'bold' }}>
            {format(addDays(startDate, i), dateFormat)}
          </Typography>
        </Grid>
      );
    }

    return <Grid container>{days}</Grid>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const todayTodos = todos.filter(todo => isSameDay(new Date(todo.deadline), cloneDay));
        days.push(
          <Grid item key={day} xs>
            <Paper
              elevation={isSameDay(day, new Date()) ? 3 : 1}
              sx={{
                height: 100,
                backgroundColor: !isSameMonth(day, monthStart)
                  ? theme.palette.action.disabledBackground
                  : isSameDay(day, new Date())
                  ? theme.palette.primary.light
                  : theme.palette.background.paper,
                color: theme.palette.text.primary,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                overflow: 'hidden',
              }}
            >
              <Typography>{formattedDate}</Typography>
              {todayTodos.map(todo => (
                <Typography key={todo.id} variant="caption" noWrap sx={{ width: '100%', textAlign: 'center' }}>
                  {todo.text}
                </Typography>
              ))}
            </Paper>
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid container key={day} spacing={1} sx={{ mb: 1 }}>
          {days}
        </Grid>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Paper>
  );
}

export default Calendar;
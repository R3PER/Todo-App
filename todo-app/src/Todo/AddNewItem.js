import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid } from '@mui/material';

function AddNewItem({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('default');
  const [deadline, setDeadline] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState('daily');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const fullDeadline = deadline && deadlineTime ? `${deadline}T${deadlineTime}` : null;
      onAdd(text, priority, category, fullDeadline, isRecurring, recurrencePattern);
      setText('');
      setPriority('medium');
      setCategory('default');
      setDeadline('');
      setDeadlineTime('');
      setIsRecurring(false);
      setRecurrencePattern('daily');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Deadline Date"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Deadline Time"
            type="time"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            }
            label="Recurring Task"
          />
        </Grid>
        {isRecurring && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Recurrence Pattern</InputLabel>
              <Select value={recurrencePattern} onChange={(e) => setRecurrencePattern(e.target.value)}>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddNewItem;
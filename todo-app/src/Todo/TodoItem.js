import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Button, Chip, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const statusColors = {
  active: '#4caf50',
  completed: '#ff9800',
  archived: '#9e9e9e',
  overdue: '#f44336',
};

function TodoItem({ todo, onUpdate, onDelete, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTodo({ ...todo });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({ ...editedTodo, [name]: value });
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...(editedTodo.subtasks || [])];
    newSubtasks[index] = value;
    setEditedTodo({ ...editedTodo, subtasks: newSubtasks });
  };

  const addSubtask = () => {
    setEditedTodo({ ...editedTodo, subtasks: [...(editedTodo.subtasks || []), ''] });
  };

  const removeSubtask = (index) => {
    const newSubtasks = (editedTodo.subtasks || []).filter((_, i) => i !== index);
    setEditedTodo({ ...editedTodo, subtasks: newSubtasks });
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', backgroundColor: '#424242', position: 'relative' }}>
      <Grid container>
        <Grid item xs={7} sx={{ p: 1 }}>
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>{todo.text}</Typography>
          <Typography variant="caption" sx={{ color: 'gray' }}>
            Priority: {todo.priority}, Category: {todo.category}, Deadline: {todo.deadline || 'Not set'}
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ backgroundColor: '#555555', p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip
            label={todo.status.toUpperCase()}
            sx={{
              backgroundColor: statusColors[todo.status],
              color: 'white',
              mb: 1,
              width: 'auto',
              height: 'auto',
              padding: '8px 0',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                lineHeight: 1.2,
              }
            }}
          />
          <IconButton size="small" onClick={() => onDelete(todo.id)}>
            <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
          </IconButton>
          <IconButton size="small" onClick={() => onArchive(todo.id)}>
            {todo.status === 'archived' ? <UnarchiveIcon fontSize="small" sx={{ color: 'white' }} /> : <ArchiveIcon fontSize="small" sx={{ color: 'white' }} />}
          </IconButton>
          <IconButton size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ color: 'white' }} />
          </IconButton>
          <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />}
          </IconButton>
        </Grid>
      </Grid>
      
      {isEditing && (
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="text"
              label="Task"
              value={editedTodo.text}
              onChange={handleChange}
              sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="priority"
              label="Priority"
              value={editedTodo.priority}
              onChange={handleChange}
              sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="category"
              label="Category"
              value={editedTodo.category}
              onChange={handleChange}
              sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            />
          </Grid>
          <Grid item xs={14}>
            <TextField
              fullWidth
              name="deadline"
              label="Deadline"
              type="datetime-local"
              value={editedTodo.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ color: 'white' }}>Subtasks:</Typography>
            {(editedTodo.subtasks || []).map((subtask, index) => (
              <Grid container spacing={1} key={index} sx={{ mb: 1 }}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    sx={{ input: { color: 'white' } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => removeSubtask(index)} variant="outlined" color="error">
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button onClick={addSubtask} variant="outlined" color="primary" sx={{ mt: 1 }}>
              ADD SUBTASK
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
              SAVE
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleCancel} variant="contained" color="secondary" fullWidth>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      )}
      
      {isExpanded && !isEditing && (
        <List sx={{ p: 2, color: 'white' }}>
          <Typography variant="subtitle1" sx={{ color: 'white' }}>Subtasks:</Typography>
          {(todo.subtasks && todo.subtasks.length > 0) ? (
            todo.subtasks.map((subtask, index) => (
              <ListItem key={index} dense>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small" sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={subtask} sx={{ color: 'white' }} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ color: 'gray' }}>No subtasks</Typography>
          )}
        </List>
      )}
    </Paper>
  );
}

export default TodoItem;
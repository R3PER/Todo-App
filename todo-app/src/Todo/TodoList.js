import React from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList({ todos, onUpdate, onDelete, onArchive, onReorder, onChangeCategory }) {
  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, category) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedTodo = todos.find(todo => todo.id.toString() === id);
    
    if (draggedTodo.status !== category) {
      onChangeCategory(id, category);
    } else {
      const dropIndex = todos.filter(todo => todo.status === category).findIndex(todo => todo.id.toString() === e.target.id);
      onReorder(draggedTodo, dropIndex, category);
    }
  };

  const categories = ['active', 'completed', 'archived', 'overdue'];

  return (
    <Grid container spacing={2}>
      {categories.map(category => (
        <Grid item xs={12} key={category}>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'uppercase' }}>
            {category}
          </Typography>
          <Paper
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, category)}
            elevation={3}
            sx={{
              minHeight: 100,
              p: 2,
              backgroundColor: 'background.paper',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3
            }}
          >
            {todos
              .filter(todo => todo.status === category)
              .map((todo) => (
                <Box
                  key={todo.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, todo.id.toString())}
                  id={todo.id.toString()}
                  sx={{ width: 250 }}
                >
                  <TodoItem
                    todo={todo}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onArchive={onArchive}
                  />
                </Box>
              ))}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;
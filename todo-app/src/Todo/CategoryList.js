import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import TodoItem from './TodoItem';

function CategoryList({ todos, onUpdate }) {
  const laterTodos = todos.filter(todo => todo.status === 'later');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <>
      <List subheader={<ListSubheader>Do Later</ListSubheader>}>
        {laterTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
        ))}
      </List>
      <List subheader={<ListSubheader>Completed</ListSubheader>}>
        {completedTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
        ))}
      </List>
    </>
  );
}

export default CategoryList;
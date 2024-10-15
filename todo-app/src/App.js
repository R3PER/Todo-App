import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from './components/Calendar';
import Header from './Layout/Header';
import ProgressBar from './Layout/ProgressBar';
import PushNotifications from './Notifications/PushNotifications';
import ResetButton from './Notifications/ResetButton';
import Statistics from './Statistics/Statistics';
import AddNewItem from './Todo/AddNewItem';
import TodoList from './Todo/TodoList';
import FilterTodos from './UI/FilterTodos';
import SearchBar from './UI/SearchBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos(prevTodos => prevTodos.map(todo => {
        if (todo.deadline && new Date(todo.deadline) < new Date() && todo.status === 'active') {
          return { ...todo, status: 'overdue' };
        }
        return todo;
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addTodo = useCallback((text, priority = 'medium', category = 'default', deadline = null, isRecurring = false, recurrencePattern = null) => {
    const newTodo = { 
      id: Date.now(), 
      text, 
      status: 'active', 
      createdAt: new Date().toISOString(),
      priority,
      category,
      subtasks: [],
      notes: '',
      deadline,
      isRecurring,
      recurrencePattern
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setSnackbar({ open: true, message: 'Task added successfully', severity: 'success' });
  }, []);

  const updateTodo = useCallback((id, updates) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
    setSnackbar({ open: true, message: 'Task updated', severity: 'info' });
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    setSnackbar({ open: true, message: 'Task deleted', severity: 'warning' });
  }, []);

  const archiveTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        const newStatus = todo.status === 'archived' ? 'active' : 'archived';
        setSnackbar({ 
          open: true, 
          message: newStatus === 'archived' ? 'Task archived' : 'Task unarchived', 
          severity: 'info' 
        });
        return { ...todo, status: newStatus };
      }
      return todo;
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, status: 'active' })));
    setSnackbar({ open: true, message: 'All tasks reset to active', severity: 'info' });
  }, []);

  const sortTodos = useCallback(() => {
    setTodos(prevTodos => [...prevTodos].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    }));
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  }, [sortOrder]);

  const onReorder = (draggedTodo, dropIndex, category) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.filter(todo => todo.id !== draggedTodo.id);
      const categoryTodos = newTodos.filter(todo => todo.status === category);
      categoryTodos.splice(dropIndex, 0, draggedTodo);
      return [...newTodos.filter(todo => todo.status !== category), ...categoryTodos];
    });
  };

  const onChangeCategory = (todoId, newCategory) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id.toString() === todoId ? { ...todo, status: newCategory } : todo
      )
    );
  };

  const filteredAndSearchedTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filter === 'all') return true;
        return todo.status === filter;
      })
      .filter(todo => 
        todo.text.toLowerCase().includes(search.toLowerCase()) ||
        (todo.category && todo.category.toLowerCase().includes(search.toLowerCase()))
      );
  }, [todos, filter, search]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const getTodosStats = useMemo(() => {
    const total = todos.length;
    const active = todos.filter(todo => todo.status === 'active').length;
    const completed = todos.filter(todo => todo.status === 'completed').length;
    const archived = todos.filter(todo => todo.status === 'archived').length;
    const overdue = todos.filter(todo => todo.status === 'overdue').length;
    return { total, active, completed, archived, overdue };
  }, [todos]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md" className="app">
        <Header />
        <ProgressBar todos={todos} />
        <AddNewItem onAdd={addTodo} />
        <SearchBar onSearch={setSearch} />
        <Button 
          onClick={sortTodos} 
          variant="outlined" 
          fullWidth 
          sx={{ mb: 2 }}
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </Button>
        <FilterTodos setFilter={setFilter} />
        <TodoList
          todos={filteredAndSearchedTodos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onArchive={archiveTodo}
          onReorder={onReorder}
          onChangeCategory={onChangeCategory}
        />
        <ResetButton onReset={resetProgress} />
        <Statistics todos={todos} />
        <Calendar todos={todos} />
        <PushNotifications />
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';

function Statistics({ todos }) {
  const data = [
    { name: 'Active', value: todos.filter(todo => todo.status === 'active').length },
    { name: 'Completed', value: todos.filter(todo => todo.status === 'completed').length },
    { name: 'Archived', value: todos.filter(todo => todo.status === 'archived').length },
    { name: 'Overdue', value: todos.filter(todo => todo.status === 'overdue').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Task Statistics
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {data.map((entry, index) => (
        <Typography key={entry.name} style={{ color: COLORS[index] }}>
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </div>
  );
}

export default Statistics;
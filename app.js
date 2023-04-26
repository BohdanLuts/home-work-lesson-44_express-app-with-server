const express = require('express');
const { tasksController } = require('./controllers');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!!!');
});

app.get('/tasks/', tasksController.getTasks);

app.post('/tasks', tasksController.createTask);

// 1. Реалізувати запит на перегляд однієї таски:
app.get('/tasks/:id', tasksController.getTaskById);

// 2. Реалізувати запит на оновлення однієї таски:
app.patch('/tasks/:id', tasksController.updateTaskById);

// 3. Реалізувати запит на видалення однієї таски:
app.delete('/tasks/:id', tasksController.deleteTaskById);

module.exports = app;

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const tasksDB = [
  {
    id: 0,
    task: 'Buy milk',
    createdAt: format(new Date(), "'Created at 'Y.MM.dd eeee,' at 'HH:mm"),
    isDone: false,
  },
  {
    id: 1,
    task: 'Cleaning in flat',
    createdAt: format(new Date(), "'Created at 'Y.MM.dd eeee,' at 'HH:mm"),
    isDone: true,
  },
  {
    id: 3,
    task: 'Wash the dishes',
    createdAt: format(new Date(), "'Created at 'Y.MM.dd eeee,' at 'HH:mm"),
    isDone: true,
  },
  {
    id: 4,
    task: 'Walking with dog',
    createdAt: format(new Date(), "'Created at 'Y.MM.dd eeee,' at 'HH:mm"),
    isDone: true,
  },
];
class TasksDB {
  constructor (arr) {
    this.tasks = [...arr];
  }
  createTask (newTask) {
    this.tasks.push({ ...newTask, id: uuidv4(), isDone: false });
    return this.tasks[this.tasks.length - 1];
  }
  getTasks () {
    return [...this.tasks];
  }
}

const tasksDbInstance = new TasksDB(tasksDB);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome!!!');
});

app.get('/tasks', (req, res) => {
  const tasks = tasksDbInstance.getTasks();
  res.status(200).send(tasks);
});

app.post('/tasks', (req, res) => {
  const createdTask = tasksDbInstance.createTask(req.body);
  res.status(201).send(createdTask);
});

// 1. Реалізувати запит на перегляд однієї таски:
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasksDbInstance.getTasks().find(t => t.id === taskId);
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.status(200).send(task);
  }
});

// 2. Реалізувати запит на оновлення однієї таски:
app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const taskIndex = tasksDbInstance.tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).send('Task not found');
    return;
  }

  tasksDbInstance.tasks[taskIndex] = {
    ...tasksDbInstance.tasks[taskIndex],
    ...updatedTask,
    id: taskId,
  };

  res.status(200).send(tasksDbInstance.tasks[taskIndex]);
});

// 3. Реалізувати запит на видалення однієї таски:
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasksDbInstance.tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).send('Task not found');
    return;
  }
  tasksDbInstance.tasks.splice(taskIndex, 1);
  res.status(200).send('Task deleted');
});

module.exports = app;

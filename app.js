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
];
class TasksDB {
  constructor (arr) {
    this.tasks = [...arr];
    1;
  }
  createTask (newContact) {
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

module.exports = app;

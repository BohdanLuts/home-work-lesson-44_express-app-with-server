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

  getTasks (page, results) {
    return [...this.tasks.slice((page - 1) * results, page * results)];
  }

  getTaskById (id) {
    const foundIndex = this.tasks.findIndex(t => t.id == id);
    return foundIndex === -1 ? null : this.tasks[foundIndex];
  }

  updateTask (id, values) {
    const foundTaskIndex = this.tasks.findIndex(t => t.id == id);

    if (foundTaskIndex !== -1) {
      this.tasks[foundTaskIndex] = {
        ...this.tasks[foundTaskIndex],
        ...values,
      };
    }

    return foundTaskIndex === -1 ? null : this.tasks[foundTaskIndex];
  }

  deleteTask (id) {
    const foundTaskIndex = this.tasks.findIndex(t => t.id == id);

    return foundTaskIndex === -1 ? null : this.tasks.splice(foundTaskIndex, 1);
  }
}

const tasksDbInstance = new TasksDB(tasksDB);
module.exports = tasksDbInstance;

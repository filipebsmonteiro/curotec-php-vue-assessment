import { defineStore } from 'pinia';
import TasksRepository from '../repositories/TasksRepository';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),

  actions: {
    async fetchTasks(params = {}) {
      this.isLoading = true;
      try {
        const response = await TasksRepository.fetchAll();
        this.tasks = response.data.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async addTask(task) {
      try {
        const response = await TasksRepository.create(task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },

    async updateTask(task) {
      try {
        const response = await TasksRepository.update(task.id, task);
        console.log('response :>> ', response);
        this.tasks = this.tasks.map((t) => (t.id === task.id ? response.data : t));
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },

    async deleteTask(id) {
      try {
        await TasksRepository.delete(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
});

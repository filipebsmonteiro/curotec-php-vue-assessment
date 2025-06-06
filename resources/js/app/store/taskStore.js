import { defineStore } from 'pinia';
import TasksRepository from '../repositories/TasksRepository';
import { useCategoryStore } from './categoryStore';



export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),

  actions: {
    async fetchTasks(sortBy = undefined) {
      const categoryStore = useCategoryStore();
      this.isLoading = true;
      const categories = categoryStore.selected?.length
        ? categoryStore.selected.map((category) => category.id)
        : undefined;
      try {
        const response = await TasksRepository.fetchAll({
            category_id: categories,
            sort_by: sortBy,
        });
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

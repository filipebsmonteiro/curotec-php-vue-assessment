import { defineStore } from 'pinia';
import CategoryRepository from '../repositories/CategoryRepository';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    isLoading: false,
  }),

  actions: {
    async fetchCategories(term = undefined) {
      this.isLoading = true;
      try {
        const response = await CategoryRepository.fetchAll({ name: term });

        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async addCategory(category) {
      try {
        const response = await CategoryRepository.create(category);
        this.categories.push(response.data);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },

    async updateCategory(category) {
      try {
        const response = await CategoryRepository.update(category.id, category);
        this.categories = this.categories.map((c) => (c.id === category.id ? response.data : t));
      } catch (error) {
        console.error('Error adding category:', error);
      }
    },

    async deleteCategory(id) {
      try {
        await CategoryRepository.delete(id);
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    },
  },
});

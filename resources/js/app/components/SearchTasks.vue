<template>
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center relative">
        <div class="relative">
            <button class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2">
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" fill=""></path>
                </svg>
            </button>
            <input
                v-model="searchTerm"
                placeholder="Search..."
                class="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-3.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 "
                type="search"
                @keydown.esc="suggestions = []"
            >
        </div>

        <ul
            v-if="suggestions.length > 0"
            class="absolute z-10 mt-15 w-full rounded-lg border bg-white shadow"
            >
            <li
                v-for="category in suggestions"
                :key="category.id"
                @click="selectCategory(category)"
                class="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
                {{ category.name }}
            </li>
        </ul>

        <div class="mt-2 flex flex-wrap gap-2">
            <span
                v-for="category in selectedCategories"
                :key="category.id"
                class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 "
            >
                {{ category.name }}
                <button
                @click="removeCategory(category.id)"
                class="ml-2 text-xs hover:text-red-500"
                >
                ✕
                </button>
            </span>
            </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()
const taskStore = useTaskStore();

const searchTerm = ref('');
const { categories: suggestions, selected: selectedCategories } = storeToRefs(categoryStore);
let debounceTimeout = null;

watch(searchTerm, (newTerm) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(async () => {
    if (!newTerm) {
      suggestions.value = [];
      return;
    }

    categoryStore.fetchCategories(newTerm);
  }, 1000);
});

const selectCategory = (category) => {
  selectedCategories.value = [...selectedCategories.value, category];
  searchTerm.value = '';
  suggestions.value = [];
};

const removeCategory = (id) => {
  selectedCategories.value = selectedCategories.value.filter(c => c.id !== id);
};

watch(selectedCategories, () => taskStore.fetchTasks());

onMounted(() => {
    suggestions.value = [];
});
</script>

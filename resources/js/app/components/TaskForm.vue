<template>
  <BaseModal>
   <template #header>
      <h2 class="text-xl font-semibold text-gray-800">
        {{ isEdit ? 'Edit' : 'Create' }} Task
      </h2>
    </template>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          v-model="title"
          placeholder="Enter task title"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          v-model="description"
          placeholder="Enter task description"
          rows="4"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select
            v-model="categoryId"
            class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            multiple
        >
            <option disabled value="">Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
            </option>
        </select>
        </div>
    </div>

    <template #footer>
      <div class="flex justify-end mt-6 space-x-2">
        <button
          @click="onClose"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { storeToRefs } from 'pinia';

const title = ref('');
const description = ref('');
const categoryId = ref('');

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const taskId = computed(() => route.params.id);

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const onClose = () => {
  router.back();
};

const fetchTask = async () => {
    const task = tasks.value.find((t) => t.id === parseInt(taskId.value));
    if (task) {
        title.value = task.title;
        description.value = task.description;
        categoryId.value = task.category_id ?? '';
    }
};

const submitForm = async () => {
  try {
    const payload = {
      title: title.value,
      description: description.value,
      category_id: categoryId.value || null,
    };

    if (isEdit.value) {
      await taskStore.updateTask({ ...payload, id: parseInt(taskId.value) });
    } else {
      await taskStore.addTask(payload);
    }

    router.push('/');
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

onMounted(async () => {
  await categoryStore.fetchCategories();
  if (isEdit.value) fetchTask();
});
</script>

<template>
  <BaseModal>
   <template #header>
      <h2 class="text-xl font-semibold text-gray-800">
        {{ isEdit ? 'Edit' : 'Create' }} Category
      </h2>
    </template>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter Category name"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
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
import { useCategoryStore } from '../store/categoryStore';
import { storeToRefs } from 'pinia';

const name = ref('');
const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();

const isEdit = computed(() => !!route.params.id);
const categoryId = computed(() => route.params.id);
const { categories } = storeToRefs(categoryStore);

const onClose = () => {
  router.back();
};

const fetchTask = async () => {
    const category = tasks.value.find((c) => c.id === parseInt(categoryId.value));
    name.value = category.name;
};

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await categoryStore.updateCategory({ id: parseInt( categoryId.value ), name: name.value });
    } else {
      await categoryStore.addCategory({ name: name.value });
    }
    router.push('/');
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

onMounted(() => {
  if (isEdit.value) {
    fetchTask();
  }
});
</script>

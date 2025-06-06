<template>
  <BaseModal @close="onClose">
    <template #header>Register User</template>
    <div class="flex flex-col gap-3">
      <label>Name:</label>
        <input
          type="name"
          v-model="name"
          placeholder="Enter your name"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

      <label>Email:</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

        <label>Password:</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          class="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>
    <template #footer>
      <button @click="submitForm">Register</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';
import AuthRepository from '../repositories/AuthRepository';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const emit = defineEmits(['submit']);
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const submitForm = () => {
    AuthRepository.register({ name: name.value, email: email.value, password: password.value })
    .then(response => {
        if (response.status === 201) {
            localStorage.setItem('token', response.data.access_token);
            router.push('/');
        }
    });
};

onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push('/');
    }
});
</script>

<template>
  <BaseModal @close="onClose">
    <template #header>Register User</template>
    <div>
      <label>Name:</label>
        <input
          type="name"
          v-model="name"
          placeholder="Enter your name"
        />

      <label>Email:</label>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
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

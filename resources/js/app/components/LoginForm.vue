<template>
  <BaseModal>
    <template #header>Login</template>
    <div>
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
      <button @click="submitForm">Login</button>
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

const email = ref('');
const password = ref('');

const submitForm = () => {
    AuthRepository.login(email.value, password.value)
    .then(response => {
        if (response.status === 200) {
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

<style scoped>
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
}
button {
  padding: 6px 12px;
  cursor: pointer;
}
</style>

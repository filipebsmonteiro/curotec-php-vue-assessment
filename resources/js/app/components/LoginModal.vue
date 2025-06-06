<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">Login</div>
      <div class="modal-body">
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
      <div class="modal-footer">
        <!-- <button @click="$emit('close')">Cancel</button> -->
        <button @click="submitForm">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthRepository from '../repositories/AuthRepository';

const emit = defineEmits(['submit']);

const email = ref('');
const password = ref('');

const submitForm = () => {
    AuthRepository.login(email.value, password.value)
    .then(response => {
        console.log('Response:', response);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  width: 400px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-header {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.modal-body {
  margin-bottom: 20px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
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

<template>
  <div class="modal-mask" @click.self="close">
    <div class="modal-container">
      <header class="modal-header">
        <slot name="header" />
      </header>
      <section class="modal-body">
        <slot />
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 400px;
}
.modal-header {
  font-weight: bold;
  margin-bottom: 1rem;
}
.modal-footer {
  margin-top: 1rem;
  text-align: right;
}
</style>

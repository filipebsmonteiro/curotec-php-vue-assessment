<template>
    <div class="flex justify-around p-5 bg-gray-100 min-h-screen">
        <KanbanColumn
            v-for="status in columnStatuses"
            :key="status.key"
            :status="status"
            :cards="tasks.filter(task => task.status === status.key)"
            @moveCard="moveCard"
        />
    </div>

    <LoginModal v-if="showModal" />
</template>

<script setup>
import { computed, watch } from 'vue';
import KanbanColumn from '../components/KanbanColumn.vue';
import { useTaskStore } from '../store/taskStore';
import LoginModal from '../components/LoginModal.vue';
import { storeToRefs } from 'pinia';


const taskStore = useTaskStore();

const showModal = computed(() => localStorage.getItem('token') === null);
watch(showModal, (value) => {
    if (!value) {
        taskStore.fetchTasks();
    }
}, { immediate: true });

const columnStatuses = [
    { key: 'pending', label: 'Pending' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' }
];
const { tasks } = storeToRefs(taskStore)
const moveCard = async (taskId, newStatus) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
        await taskStore.updateTask({ id: taskId, status: newStatus })
        .then(() => {
            task.status = newStatus;
        });
    }
};
</script>

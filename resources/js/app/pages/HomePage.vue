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

    <RouterView />
</template>

<script setup>
import { computed, watch } from 'vue';
import KanbanColumn from '../components/KanbanColumn.vue';
import { useTaskStore } from '../store/taskStore';
import { storeToRefs } from 'pinia';
import { routerKey, useRouter } from 'vue-router';


const taskStore = useTaskStore();
const router = useRouter();

const isLoggedIn = computed(() => localStorage.getItem('token') !== null);
watch(isLoggedIn, (value) => {
    if (!value) {
        router.push('/login');
        return;
    }
    taskStore.fetchTasks();
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
        // TODO: Update only if the status has changed
        await taskStore.updateTask({ id: taskId, status: newStatus })
        .then(() => {
            task.status = newStatus;
        });
    }
};
</script>

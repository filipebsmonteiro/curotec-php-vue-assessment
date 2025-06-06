<template>

    <div class=" p-5 bg-gray-100 min-h-screen">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <SearchTasks v-if="route.name == `home`" />
            </div>
            <RouterLink
                to="/category-create"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >Create Category</RouterLink>
        </div>
        <div class="flex gap-2 items-center my-2">
            <button
                type="button"
                class="px-2 py-1 bg-indigo-500 text-xs text-white rounded-md hover:bg-indigo-700"
                @click="taskStore.fetchTasks(`status`)"
            >Order by Status</button>
            <button
                type="button"
                class="px-2 py-1 bg-indigo-500 text-xs text-white rounded-md hover:bg-indigo-700"
                @click="taskStore.fetchTasks(`date`)"
            >Order by Date</button>
            <button
                type="button"
                class="px-2 py-1 bg-indigo-500 text-xs text-white rounded-md hover:bg-indigo-700"
                @click="taskStore.fetchTasks(`priority`)"
            >Order by Priority</button>
        </div>

        <div class="flex justify-around gap-2">
            <KanbanColumn v-for="status in columnStatuses" :key="status.key" :status="status"
                :cards="tasks.filter(task => task.status === status.key)" @moveCard="moveCard" />
        </div>
    </div>

    <RouterView />
</template>

<script setup>
import { computed, watch } from 'vue';
import KanbanColumn from '../components/KanbanColumn.vue';
import { useTaskStore } from '../store/taskStore';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import SearchTasks from '../components/SearchTasks.vue';


const taskStore = useTaskStore();
const router = useRouter();
const route = useRoute();

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

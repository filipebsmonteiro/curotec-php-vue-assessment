<template>
    <div class="flex justify-around p-5 bg-gray-100 min-h-screen">
        <KanbanColumn
            v-for="status in columnStatuses"
            :key="status.key"
            :status="status"
            :cards="cards.filter(card => card.status === status.key)"
            @moveCard="moveCard"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import KanbanColumn from '../components/KanbanColumn.vue';
const cards = ref([
    { id: 1, title: 'Task 1', created_at: "2025-06-05T23:48:31.000000Z", status: 'pending' },

]);
const columnStatuses = [
    { key: 'pending', label: 'Pending' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' }
];
const moveCard = (cardId, newStatus) => {
    const card = cards.value.find(card => card.id === cardId);
    if (card) {
        card.status = newStatus;
    }
};
</script>

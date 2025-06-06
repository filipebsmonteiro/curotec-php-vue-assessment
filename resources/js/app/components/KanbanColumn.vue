<template>
    <div class="bg-white shadow rounded p-4 flex-1 mx-2 flex flex-col gap-2" @dragover.prevent @drop="drop($event)">
        <h2 class="font-bold mb-2">{{ status.label }}</h2>
        <KanbanCard v-for="card in cards" :key="card.id" :card="card"></KanbanCard>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import KanbanCard from './KanbanCard.vue';
const props = defineProps({
    status: Object,
    cards: Array,
});
const emit = defineEmits(['moveCard']);
const drop = event => {
    const cardId = event.dataTransfer.getData('text/plain');
    emit('moveCard', parseInt(cardId, 10), props.status.key);
};
</script>

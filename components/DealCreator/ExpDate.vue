<template>
  <div>
    <label for="date">Angebot läuft ab am:</label>
    <input type="date" id="date" v-model="selectedDate" :min="startDate" :max="endDate" @input="emitDateSelected" required/>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
});

const selectedDate = ref('');

watch(selectedDate, (newDate) => {
  console.log('Selected Date:', newDate);
});

const emit = defineEmits(['date-selected']);

const emitDateSelected = () => {
  if (selectedDate.value) {
    const formattedDate = new Date(selectedDate.value).toISOString();
    emit('date-selected', formattedDate);
  }
};
</script>

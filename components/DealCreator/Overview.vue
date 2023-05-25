<template>
  <div>
    <input type="text" :value="data?.title" :disabled="!!data" />
    <input type="text" :value="data?.price" :disabled="!!data" />
    <input type="text" :value="data?.basisPrice" :disabled="!!data" />
    <p>{{ data?.url }}</p>

    <button @click="save">Save</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['save'])

const save = () => {
  emit('save', props.data);
  // Perform save operation or emit an event with the updated data
};
</script>

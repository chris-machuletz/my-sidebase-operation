<template>
    <form>
      <input
        type="text"
        name="dealUrl"
        id="dealUrl"
        v-model="url"
        placeholder="Enter deal URL..."
      />
      <button @click.prevent="validateUrl">Next</button>
    </form>
  </template>

  <script setup>
  import { ref, defineEmits } from 'vue';

  const url = ref('');

  const emit = defineEmits(['next']);

  const validateUrl = () => {
    emit('next', url.value);
  };
  </script>

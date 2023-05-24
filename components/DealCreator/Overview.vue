<template>
    <div>
      <div v-if="data">
        Data:<br />
        <label>
          Title:
          <input type="text" :value="data.title" disabled />
        </label>
        <label>
          Angebotspreis:
          <input type="text" :value="data.price" disabled />
        </label>
        <label>
          UVP:
          <input type="text" :value="data.basisPrice" disabled />
        </label>
      </div>
      <div v-else>
        <label>
          Title:
          <input type="text" v-model="formData.title" />
        </label>
        <label>
          Angebotspreis:
          <input type="text" v-model="formData.price" />
        </label>
        <label>
          UVP:
          <input type="text" v-model="formData.basisPrice" />
        </label>
        <button @click.prevent="saveData">Save</button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed, watch } from 'vue';

  const formData = ref({
    title: '',
    price: '',
    basisPrice: '',
  });

  const data = ref(null);

  const saveData = () => {
    emit('save', formData.value);
  };

  watch(
    () => formData.value,
    () => {
      data.value = null; // Reset data when user input changes
    }
  );

  const isDataFetched = computed(() => data.value !== null);
  </script>

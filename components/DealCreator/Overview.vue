<template>
  <div>
    <input type="text" v-model="formData.title" @change="onInputChange($event)" data-id="title" :disabled="isDataAvailable" />
    <input type="text" v-model="formData.price" @change="onInputChange($event)" data-id="price" :disabled="isDataAvailable" />
    <input type="text" v-model="formData.basisPrice" @change="onInputChange($event)" data-id="basisPrice" :disabled="isDataAvailable" />
    <p>{{ formData.url }}</p>
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

const formData = ref(props.data);

console.log('FORM DATA', formData);

const isDataAvailable = !!props.data;

watch(() => props.data, (newData) => {
  if (newData) {
    formData.value = { ...newData };
  }
});

const onInputChange = (event) => {
  const field = event.target.getAttribute('data-id');
  const value = event.target.value;
  formData.value[field] = value;
  console.log(field, value, formData.value)
  emit('save', formData.value);
};
</script>

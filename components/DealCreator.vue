<template>
    <div>
      <DealCreatorUrlForm @next="fetchData" />
        Loading: {{ loading }}<br><br>
        <DealCreatorOverview v-if="data" :data="data" @save="saveData"></DealCreatorOverview>
        Step: {{ step }}
    </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' });

// const url = ref('');
const step = ref(1);
const { data, loading, fetchData } = useCrawler();

const saveData = (formData: any) => {
  data.value = formData;
  step.value = 1; // Move back to the first step
};

</script>

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

const saveData = async (formData: any) => {
  data.value = formData;
  console.log(data.value);
  step.value = 1; // Move back to the first step

  const { title, url, price, basisPrice } = formData;

  console.log(formData.url);

  try {
    const response = await useFetch('/api/deals', {
      method: 'POST',
      body: {
        title,
        url,
        basisPrice,
        price
      },
    });

    console.log(response);

    if (response.data.value?.statusCode === 201) {
      console.log('Deal saved successfully:', response.data.value);
    } else {
      console.error('Failed to save the Deal:', response);
    }
  } catch (error: any) {
    console.error('Failed to save the Deal:', error);
  }
};

</script>

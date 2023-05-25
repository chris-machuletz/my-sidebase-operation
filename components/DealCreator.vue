<template>
  <div>
    <DealCreatorUrlForm @next="fetchData" />
    Loading: {{ loading }}<br><br>
    <div v-if="data">
      <DealCreatorOverview :data="data" v-model="data"></DealCreatorOverview>
      <DealCreatorExpDate v-if="data" :data="data" :start-date="startDate" :end-date="endDate" @date-selected="handleDateSelected" />
      <button @click="onCreateDeal" v-if="expirationDate">Save</button>
    </div>
    Step: {{ step }}
  </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' });

// const url = ref('');
const step = ref(1);
const { data, loading, fetchData } = useCrawler();

const startDate = '2023-01-01'; // Example start date
const endDate = '2023-12-31'; // Example end date
const expirationDate = ref('');

const handleDateSelected = (date: string) => {
  expirationDate.value = date;
};

const onCreateDeal = async () => {

  const { title, url, price, basisPrice } = data.value;

  try {
    const response = await useFetch('/api/deals', {
      method: 'POST',
      body: {
        title,
        url,
        basisPrice,
        price,
        expirationDate: expirationDate.value
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

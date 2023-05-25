import { ref } from 'vue';

export function useCrawler() {
  const data = ref<any>(null);
  const loading = ref(false);

  async function fetchData(url: string) {
    loading.value = true;

    try {
      const response = await useFetch('/api/crawler', {
        method: 'POST',
        body: { url },
      });

      data.value = response.data.value;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, fetchData };
}

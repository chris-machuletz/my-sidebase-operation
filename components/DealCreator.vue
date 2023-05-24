<template>
    <div>
      <DealCreatorUrlForm @next="onValidateUrl" />
        Loading: {{ loading }}<br><br>
        <div v-if="data">
            Data:<br>
            Titel: {{ data?.title }}<br>
            Angebotspreis: {{ data?.price }}<br>
            UVP: {{ data?.basisPrice }}<br>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' });

// const url = ref('');
const data = ref<any>(null);
const loading = ref<boolean>(false);

const onValidateUrl = async (url: string) => {
    // console.log(url.value);
    loading.value = true;
    console.log(url);

    const crawler = await useFetch('/api/crawler', {
      method: 'POST',
      body: {
        // url: 'https://www.amazon.de/720%C2%B0DGREE-Trinkflasche-uberBottle-softTouch-Sieb/dp/B0888TY4PD/ref=zg-bs_sports_sccl_1/260-1458986-4841218?pd_rd_w=kqKkt&content-id=amzn1.sym.22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_p=22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_r=W232PH0PYGJ79NV22KKN&pd_rd_wg=cXhyf&pd_rd_r=77796bf6-641f-4cde-a093-888ea1dcc1af&pd_rd_i=B0888TY4PD&psc=1'
        // url: 'https://www.amazon.de/Yaheetech-Metallbett-Bettgestelle-Schlafzimmer-G%C3%A4stezimmer/dp/B0BHRZVVTG/ref=sr_1_4?c=ts&keywords=Betten%2C+Bettrahmen+%26+Lattenroste&qid=1684845878&s=kitchen&sr=1-4&ts_id=2810140031'
        url: url
      }
    })
    .then((res) => {
      data.value = res.data.value;
    })
    .finally(() => {
        loading.value = false;
    });

}

</script>

<template>
    <div>
        <h1>Create deal</h1>
        <!-- <form @submit.prevent="createDeal">
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="title" required />
                <input type="text" id="url" v-model="url" required />
            </div>
             Add more input fields for other deal properties
            <button type="submit">Create Deal</button>
        </form> -->
        <DealCreator />
    </div>
</template>

<script setup lang="ts">

definePageMeta({ middleware: 'auth' });

const title = ref('');
const url = ref('');
// Add more ref variables for other deal properties

// const crawler = await useFetch('/api/crawler', {
//     method: 'POST',
//     body: {
//         url: 'https://www.amazon.de/720%C2%B0DGREE-Trinkflasche-uberBottle-softTouch-Sieb/dp/B0888TY4PD/ref=zg-bs_sports_sccl_1/260-1458986-4841218?pd_rd_w=kqKkt&content-id=amzn1.sym.22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_p=22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_r=W232PH0PYGJ79NV22KKN&pd_rd_wg=cXhyf&pd_rd_r=77796bf6-641f-4cde-a093-888ea1dcc1af&pd_rd_i=B0888TY4PD&psc=1'
//         // url: 'https://www.amazon.de/Yaheetech-Metallbett-Bettgestelle-Schlafzimmer-G%C3%A4stezimmer/dp/B0BHRZVVTG/ref=sr_1_4?c=ts&keywords=Betten%2C+Bettrahmen+%26+Lattenroste&qid=1684845878&s=kitchen&sr=1-4&ts_id=2810140031'
//     }
// });

// console.log(crawler.data.value);

// // const additionalDealInfo = await runCrawler('https://www.amazon.de/720%C2%B0DGREE-Trinkflasche-uberBottle-softTouch-Sieb/dp/B0888TY4PD/ref=zg-bs_sports_sccl_1/260-1458986-4841218?pd_rd_w=kqKkt&content-id=amzn1.sym.22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_p=22f8be38-f3b8-454d-b680-116ba0143174&pf_rd_r=W232PH0PYGJ79NV22KKN&pd_rd_wg=cXhyf&pd_rd_r=77796bf6-641f-4cde-a093-888ea1dcc1af&pd_rd_i=B0888TY4PD&psc=1');

// async function createDeal() {
//   try {
//     const response = await $fetch('/api/deals', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title: title.value,
//         // Add more properties for other deal fields
//       }),
//     });
//     console.log(response); // Optionally handle the response
//     // TODO Redirect the user to a success page or perform other actions
//   } catch (error) {
//     console.error(error);
//     // Handle the error and display appropriate messages to the user
//   }
// }
</script>

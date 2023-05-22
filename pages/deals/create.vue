<template>
    <div>
        <h1>Create deal</h1>
        <form @submit.prevent="createDeal">
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="title" required />
            </div>
            <!-- Add more input fields for other deal properties -->
            <button type="submit">Create Deal</button>
        </form>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const title = ref('');
// Add more ref variables for other deal properties

const router = useRouter();

async function createDeal() {
  try {
    const response = await $fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        // Add more properties for other deal fields
      }),
    });
    console.log(response); // Optionally handle the response
    // TODO Redirect the user to a success page or perform other actions
  } catch (error) {
    console.error(error);
    // Handle the error and display appropriate messages to the user
  }
}
</script>

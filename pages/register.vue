<template>
    <div>
        <h1>Register</h1>
        <nuxt-link to="/login">Login</nuxt-link>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
const username = ref('');
const password = ref('');
const email = ref('');

const router = useRouter();

async function register() {
    try {
        const response = await $fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                email: email.value,
            }),
        });
        console.log(response); // Optionally handle the response
        // Redirect the user to a success page or perform other actions
        router.push('/')
    } catch (error) {
        console.error(error);
        // Handle the error and display appropriate messages to the user
    }
}
</script>
  
<template>
  <div>
    <nuxt-link to="/protected">Protected</nuxt-link><br>
    <nuxt-link to="/register">Register</nuxt-link>
    <h1 v-if="data">Signed in!</h1>
    <div class="sign-in" v-if="!data">
      <p>Sign-In Options:</p>
      <button @click="handleSignIn('github')">Github</button>

      <form>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" @click.prevent="login({ username, password, callbackUrl: '/'})">Log in</button>
        </form>

    </div>
    <button @click="signOut()" v-if="data">Log out</button>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useAuth, navigateTo } from '#imports'


definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  },
});

const { data, signIn, signOut } = useAuth();

let username: string = '';
let password: string = '';

const login = async ({ username, password, callbackUrl }: { username: string, password: string, callbackUrl: string }) => {

  console.log('credentials', username, password, 'callbackUrl', callbackUrl);

  const { error, url } = await signIn('credentials', { username, password, callbackUrl, redirect: false});

  if (error) {
    alert('Error: Bad Credentials')
  } else {
    return navigateTo(url, { external: true })
  }
};



const handleSignIn = async (provider: string, options: Record<string, string> = {}) => {
  if (provider === 'github') {
    await signIn(provider, options);
  }
};
</script>

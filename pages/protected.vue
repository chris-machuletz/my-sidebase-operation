<template>
  <div>
    <nuxt-link to="/login">Login</nuxt-link>
    <div>I'm protected! Session data: {{ data.user }}</div>
    <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { data, signOut } = useSession();
</script>
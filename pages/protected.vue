<template>
  <div>
    <nuxt-link v-if="!data" to="/login">Login</nuxt-link>
    <div v-if="data">
      <h1>User Profile</h1>
      <div>Session data: {{ data.user }}<br>Logged in until {{ data.expires }}</div>
      <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { data, signOut } = useSession();
</script>
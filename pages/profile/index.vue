<template>
    <div>
        <div v-if="data">
            <h1>Profile page</h1>
            {{ status }} <br>
            {{ data.user }}
            <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { status, data, signOut } = useAuth();
</script>

<style scoped lang="scss"></style>

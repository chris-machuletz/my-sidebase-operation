<template>
    <div v-editable="blok" v-if="blok">
        teaser works - {{ blok.headline }}
    </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object })</script>

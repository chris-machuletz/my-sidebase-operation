<template>
  <div class="main-container">
    <h1>Home</h1>
    <nuxt-link to="/login">Login</nuxt-link>
    <StoryblokComponent v-if="story" v-for=" blok in story.content.body" :blok="blok" />
    {{ story.content.body }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
});
const slug = useRoute().params.slug;

console.log('Slug', slug);

const story = await useAsyncStoryblok(
slug && slug.length > 0 ? (slug as string[]).join('/') : 'home',
{ version: 'draft' }
)

</script>

<style scoped>

</style>

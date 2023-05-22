<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const storyblokApi = useStoryblokApi()

// const config = await storyblokApi.get('cdn/stories/config', { version: 'draft', resolve_links: 'url' });
</script>

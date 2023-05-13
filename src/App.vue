<script setup lang="ts">
useHead({
  title: 'VAU AIS',
  meta: [
    { name: 'description', content: 'VRChat Aerospace University AIS' },
    {
      name: 'theme-color',
      content: () => isDark.value ? 'red' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

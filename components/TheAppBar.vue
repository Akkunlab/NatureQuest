<template>
  <v-app-bar density="compact" color="rgba(255, 255, 255, 0.9)">
    <v-app-bar-title class="font-weight-bold">{{ title }}</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
  interface Props {
    title: string
  }
  
  const props = withDefaults(defineProps<Props>(), { title: '' });
</script>

<script setup lang="ts">
const isTeleportDisabled = ref(true)
onMounted(() => isTeleportDisabled.value = false)
</script>

<template>
  <v-container>
    <div class="text-h4">
      我们致力于给 VRChat 模拟飞行玩家提供更好的飞行体验，但是我们目前真的没有其他航图。
    </div>
  </v-container>
</template>

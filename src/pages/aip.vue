<script setup lang="ts">
const isTeleportDisabled = ref(true)
onMounted(() => isTeleportDisabled.value = false)
</script>

<template>
  <Teleport v-if="!isTeleportDisabled" to="#layout" :disabled="isTeleportDisabled">
    <v-navigation-drawer permanent width="340">
      <v-container>
        <h1>我们致力于给 VRChat 模拟飞行玩家提供更好的飞行体验，但是我们目前真的没有其他航图。</h1>
      </v-container>
    </v-navigation-drawer>
  </Teleport>
  <ChartViewer :chart="undefined" />
</template>

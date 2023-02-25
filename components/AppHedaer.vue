<template>
  <div class="app-header">
    <img height="20" src="~/assets/VAU.svg" />
    <client-only>
      <el-autocomplete class="search-input" :trigger-on-focus="false" placeholder="搜索机场" />
    </client-only>
    <el-switch v-model="isDark" />
  </div>
</template>

<script lang="ts">
import { useDark, useToggle } from "@vueuse/core";

export default defineComponent({
  data() {
    return {
      isDark: useDark(),
    };
  },
  watch: {
    isDark(isDark: boolean) {
      useToggle(isDark);
    },
  },
});
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
}

.search-input {
  margin: 0.5rem;
}
</style>

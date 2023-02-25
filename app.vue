<template>
  <div style="height: 100%" :class="isDark ? 'dark' : ''">
    <el-container style="height: 100%">
      <el-header>
        <AppHeader />
      </el-header>
      <el-container>
        <el-aside width="64px">
          <client-only>
            <el-menu router collapse class="navbar">
              <el-menu-item v-for="item in navgationItems" :index="item.uri" :key="item.uri">
                <el-icon><component :is="item.icon"/></el-icon>
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </el-menu>
          </client-only>
        </el-aside>
        <el-main style="padding: 0">
          <NuxtPage />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import "element-plus/theme-chalk/dark/css-vars.css";
import AppHeader from "./components/AppHedaer.vue";
import NavigationItem from "./types/NavigationItem";
import { useDark } from "@vueuse/core";

export default defineComponent({
  data() {
    return {
      isDark: useDark(),
      navgationItems: [
        {
          icon: "Document",
          name: "Airport Charts",
          uri: "/",
        } as NavigationItem,
        {
          icon: "Memo",
          name: "AIP",
          uri: "/aip",
        } as NavigationItem,
      ],
    };
  },
  components: {
    AppHeader,
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#__nuxt {
  height: 100%;
}

.el-header {
  border-bottom: 1px solid var(--el-border-color);
}

.sidebar {
  border-right: 1px solid var(--el-border-color);
  padding: 0 1rem;
}

.navbar {
  height: 100%;
}
</style>

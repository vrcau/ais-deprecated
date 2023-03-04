<template>
  <div style="height: 100%" :class="isDark ? 'dark' : ''">
    <el-container style="height: 100%">
      <el-header style="padding-left: 5px">
        <AppHeader />
      </el-header>
      <el-container>
        <el-aside width="64px">
          <ClientOnly>
            <el-menu router collapse class="navbar" popper-effect="light">
              <el-menu-item
                v-for="item in navgationItems"
                :index="item.uri"
                :key="item.uri"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </el-menu>
          </ClientOnly>
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
        new NavigationItem("HomeFilled", "首页", "/"),
        new NavigationItem("Memo", "其他航图", "/aip"),
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

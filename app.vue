<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer rail expand-on-hover style="position: fixed">
        <v-list density="compact" nav>
          <v-list-item
            v-for="item in navigationItems"
            :key="item.uri"
            :title="item.name"
            :to="item.uri"
            :prepend-icon="item.icon"
            nav
          />
        </v-list>
      </v-navigation-drawer>
      <v-app-bar style="position: fixed">
        <v-app-bar-title>
          <SearchBar />
        </v-app-bar-title>
        <v-btn icon>
          <v-icon @click="toggleTheme">{{
            theme.global.current.value.dark
              ? "mdi-weather-night"
              : "mdi-white-balance-sunny"
          }}</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import { useTheme } from "vuetify";
import NavigationItem from "./types/NavigationItem";

const theme = useTheme();
const navigationItems = reactive([
  new NavigationItem("mdi-home", "首页", "/"),
  new NavigationItem("mdi-file-document", "其他航图", "/aip"),
]);

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

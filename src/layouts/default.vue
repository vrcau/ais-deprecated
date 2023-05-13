<script setup lang="ts">
import { useTheme } from 'vuetify'
import type { NavigationItem } from '~/types'

const theme = useTheme()
const router = useRouter()
const navigationItems = reactive<NavigationItem[]>([
  {
    icon: 'mdi-home',
    name: '首页',
    uri: '/',
  },
  {
    icon: 'mdi-file-document',
    name: '其他航图',
    uri: '/aip',
  },
])

theme.global.name.value = isDark ? 'dark' : 'light'
watch(isDark, dark => theme.global.name.value = dark ? 'dark' : 'light')

function toggleTheme() {
  toggleDark()
}

function selectAirport(icao: string | undefined) {
  if (icao != null)
    router.push(`airports/${icao}`)
}
</script>

<template>
  <v-app>
    <v-layout id="layout">
      <v-navigation-drawer rail expand-on-hover permanent style="position: fixed">
        <v-list density="compact" nav>
          <v-list-item
            v-for="item in navigationItems" :key="item.uri" :title="item.name" :to="item.uri"
            :prepend-icon="item.icon" nav
          />
        </v-list>
      </v-navigation-drawer>
      <v-app-bar style="position: fixed">
        <v-app-bar-title>
          <SearchBar @selected="selectAirport" />
        </v-app-bar-title>
        <v-btn icon @click="toggleTheme">
          <v-icon>
            {{
              theme.global.current.value.dark
                ? "mdi-weather-night"
                : "mdi-white-balance-sunny"
            }}
          </v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

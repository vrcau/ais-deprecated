<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = isDark ? 'dark' : 'light'
watch(isDark, dark => theme.global.name.value = dark ? 'dark' : 'light')

function toggleTheme() {
  toggleDark()
}

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
  <v-app>
    <v-layout id="layout">
      <v-app-bar style="position: fixed">
        <v-app-bar-title>
          VRChat 航空航天大学 AIS
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
      <v-navigation-drawer permanent style="position: fixed" width="320">
        <RouterView name="drawer" />
      </v-navigation-drawer>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import type { UserModule } from './types'

import './styles/main.css'
import 'uno.css'

import NavigationList from './components/NavigationList.vue'
import indexVue from './pages/index.vue'
import IcaoVue from './pages/airports/[icao].vue'
import AirportInfoVue from './components/AirportInfo.vue'
import aipVue from './pages/aip.vue'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes(routes) {
    routes[routes.findIndex(record => record.path === '/')].components = {
      default: indexVue,
      drawer: NavigationList,
    }

    routes[routes.findIndex(record => record.path.includes('airports'))].components = {
      default: IcaoVue,
      drawer: AirportInfoVue,
    }

    routes[routes.findIndex(record => record.path === '/aip')].components = {
      default: aipVue,
      drawer: NavigationList,
    }

    return routes
  },
})

const app = createApp(App)
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app._context))

app.use(router)
app.mount('#app')

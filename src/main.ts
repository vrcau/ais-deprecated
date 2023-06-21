import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import type { UserModule } from './types'

import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(),
  extendRoutes(routes) {
    routes[routes.findIndex(record => record.path === '/')].components = {
      default: () => import('./pages/index.vue'),
      drawer: () => import('./components/NavigationList.vue'),
    }

    const airportRouteChildren = routes[routes.findIndex(record => record.path.includes('airports'))].children
    if (airportRouteChildren !== undefined) {
      const airportRoute = airportRouteChildren[0]

      airportRoute.components = {
        default: () => import('./pages/airports/[icao].vue'),
        drawer: () => import('./components/AirportInfo.vue'),
      }
    }

    routes[routes.findIndex(record => record.path === '/aip')].components = {
      default: () => import('./pages/aip.vue'),
      drawer: () => import('./components/NavigationList.vue'),
    }

    return routes
  },
})

const app = createApp(App)
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app._context))

app.use(router)
app.mount('#app')

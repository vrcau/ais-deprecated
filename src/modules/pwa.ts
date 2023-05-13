import { registerSW } from 'virtual:pwa-register'
import { type UserModule } from '~/types'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = () => {
  registerSW()
}

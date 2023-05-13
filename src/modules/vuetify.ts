import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import { type UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: !isClient,
    theme: {
      defaultTheme: 'dark',
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })

  app.use(vuetify)
}

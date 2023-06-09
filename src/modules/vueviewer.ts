import VueViewer from 'v-viewer'
import { type UserModule } from '~/types'

import 'viewerjs/dist/viewer.css'

export const install: UserModule = ({ app }) => {
  app.use(VueViewer)
}

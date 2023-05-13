import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Airport {
  icao: string
  name: string
  charts: Chart[]
  notams: Notam[]
}

export interface Chart {
  name: string
  url: AssetsUrl
  type: string
}

export interface Notam {
  title: string
  content: string
  endAt: Date
  activeAt: Date
}

export interface AirportsData {
  airports: Airport[]
}

export interface AirportData {
  airport: Airport
}

export interface NavigationItem {
  icon: string
  name: string
  uri: string
}

export interface HomeInfo {
  data: HomeData
}

export interface HomeData {
  airportsConnection: Connection
  chartsConnection: Connection
  notamsConnection: Connection
  notams: Notam[]
}

export interface Connection {
  pageInfo: PageInfo
}

export interface PageInfo {
  pageSize: number
}

export interface AssetsUrl {
  url: string
}

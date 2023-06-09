<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { AirportsData } from '~/types'

const router = useRouter()

function selectAirport(icao: string | undefined) {
  if (icao != null)
    router.push(`/airports/${icao}`)
}

const { result } = useQuery<AirportsData>(gql`
  query Airports {
  airports {
    icao
    id
    name
    charts {
      ... on Chart {
        id
        name
        url {
          url
        }
      }
    }
    notams {
      ... on Notam {
        id
        activeAt
        content
        endAt
        title
      }
    }
  }
}`)
</script>

<template>
  <SearchBar style="margin: 0.5rem 1rem" @selected="selectAirport" />
  <v-list density="compact" nav>
    <v-list-item title="首页" prepend-icon="mdi-home" to="/" nav />
    <v-list-item title="总则" prepend-icon="mdi-file-document" to="/aip" nav />
    <v-divider />
    <v-list-item
      v-for="item in result?.airports" :key="item.icao" :title="item.name" :to="`/airports/${item.icao}`"
      nav
    />
  </v-list>
</template>

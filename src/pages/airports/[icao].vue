<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { AirportData, Chart } from '~/types'

const isTeleportDisabled = ref(true)
onMounted(() => isTeleportDisabled.value = false)

const { result, loading } = useQuery<AirportData>(gql`
query Airport($where: AirportWhereUniqueInput!) {
  airport(where: $where) {
    id
    name
    icao
    notams {
      ... on Notam {
        id
        activeAt
        endAt
        title
        content
      }
    }
    charts {
      ... on Chart {
        id
        name
        url {
          url
        },
        type
      }
    }
  }
}
`, { where: { icao: useRoute().params.icao } })

const chart: Ref<Chart | undefined> = ref(undefined)
</script>

<template>
  <v-progress-linear v-if="loading" indeterminate />
  <Teleport v-if="!isTeleportDisabled && !loading" to="#layout" :disabled="isTeleportDisabled">
    <v-navigation-drawer permanent width="340">
      <AirportInfo :airport="result?.airport" @select-chart="(item: Chart) => chart = item" />
    </v-navigation-drawer>
  </Teleport>
  <ChartViewer :chart="chart" />
</template>

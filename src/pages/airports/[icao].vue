<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { AirportData, Chart } from '~/types'

const isTeleportDisabled = ref(true)
onMounted(() => isTeleportDisabled.value = false)

const route = useRoute()

const result: Ref<AirportData | undefined> = ref(undefined)
const loading: Ref<boolean> = ref(true)

const chart: Ref<Chart | undefined> = ref(undefined)

queryData()

watch(() => route.params.icao, () => queryData())

function queryData() {
  const query = useQuery<AirportData>(gql`
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
`, { where: { icao: route.params.icao } })

  watch(query.loading, queryLoading => loading.value = queryLoading)
  watch(query.result, queryResult => result.value = queryResult)
}
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

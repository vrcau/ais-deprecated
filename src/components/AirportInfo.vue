<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useChartStore } from '~/stores/chart'
import type { Airport, AirportData } from '~/types'

const route = useRoute()
const router = useRouter()

const chartStore = useChartStore()

const result: Ref<Airport | undefined> = ref(undefined)
const loading: Ref<boolean> = ref(true)

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
  watch(query.result, queryResult => result.value = queryResult?.airport)

  loading.value = query.loading.value
  result.value = query.result?.value?.airport
}

const selectedTab = ref('')
const selectedChartType = ref('')

const taxiCharts = computed(() => {
  return result.value?.charts.filter(chart => chart.type === 'TAXI')
})

const sidCharts = computed(() => {
  return result.value?.charts.filter(chart => chart.type === 'SID')
})

const starCharts = computed(() => {
  return result.value?.charts.filter(chart => chart.type === 'STAR')
})

const approachCharts = computed(() => {
  return result.value?.charts.filter(chart => chart.type === 'APP')
})

const refCharts = computed(() => {
  return result.value?.charts.filter(chart => chart.type === 'REF')
})
</script>

<template>
  <div class="pa-3 airport-icao-title">
    <v-btn icon="mdi-arrow-left" variant="text" class="mr-3" @click="router.push('/')" />
    <div>
      <h2>
        {{ result?.icao }}
      </h2>
      <span>{{ result?.name }}</span>
    </div>
  </div>
  <v-tabs v-model="selectedTab" fixed-tabs stacked align-tabs="center">
    <v-tab value="info">
      <v-icon>mdi-information</v-icon>
      信息
    </v-tab>
    <v-tab value="charts">
      <v-icon>mdi-file-document-multiple</v-icon>
      航图
    </v-tab>
    <v-tab value="notams">
      <v-icon>mdi-bulletin-board</v-icon>
      NOTAM
    </v-tab>
  </v-tabs>
  <v-window v-model="selectedTab">
    <v-window-item value="info">
      <div class="pa-3">
        <div class="text-h6">
          跑道
        </div>
      </div>
    </v-window-item>
    <v-window-item value="charts">
      <v-tabs v-model="selectedChartType" fixed-tabs class="chart-tabs">
        <v-tab value="taxi">
          TAXI
        </v-tab>
        <v-tab value="sid">
          SID
        </v-tab>
        <v-tab value="star">
          STAR
        </v-tab>
        <v-tab value="app">
          APP
        </v-tab>
        <v-tab value="ref">
          REF
        </v-tab>
      </v-tabs>
      <v-window v-model="selectedChartType">
        <v-window-item value="taxi">
          <v-list>
            <v-list-item
              v-for="item in taxiCharts" :key="item.name" :title="item.name" :value="item"
              @click="chartStore.setSelectedChart(item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="sid">
          <v-list>
            <v-list-item
              v-for="item in sidCharts" :key="item.name" :title="item.name" :value="item"
              @click="chartStore.setSelectedChart(item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="star">
          <v-list>
            <v-list-item
              v-for="item in starCharts" :key="item.name" :title="item.name" :value="item"
              @click="chartStore.setSelectedChart(item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="app">
          <v-list>
            <v-list-item
              v-for="item in approachCharts" :key="item.name" :title="item.name" :value="item"
              @click="chartStore.setSelectedChart(item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="ref">
          <v-list>
            <v-list-item
              v-for=" item in refCharts" :key="item.name" :title="item.name" :value="item"
              @click="chartStore.setSelectedChart(item)"
            />
          </v-list>
        </v-window-item>
      </v-window>
    </v-window-item>
    <v-window-item value="notams">
      <v-card
        v-for="item in result?.notams" :key="item.title" class="ma-3" :title="item.title" :text="item.content"
        :subtitle="`生效于 ${item.activeAt} - ${item.endAt}`"
      />
    </v-window-item>
  </v-window>
</template>

<style scoped>
.airport-icao-title {
  display: flex;
}

.chart-list {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
}

.chart-list li {
  display: block;
  padding: 12px 8px;
  cursor: pointer;
  transition: border-color var(--el-transition-duration),
    background-color var(--el-transition-duration),
    color var(--el-transition-duration);
}

.chart-list li:hover {
  background-color: var(--el-color-primary-light-9);
}

.chart-item {
  font-size: var(--el-font-size-base);
  font-weight: bold;
  height: 3rem;
}

.chart-tabs .v-tab.v-tab {
  padding: 0;
  min-width: unset;
}
</style>

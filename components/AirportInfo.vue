<template>
  <div class="pa-3 airport-title-card">
    <h2 class="airport-icao-title">{{ airport?.icao }}</h2>
    <span class="airport-name-title">{{ airport?.name }}</span>
  </div>
  <v-tabs fixed-tabs v-model="selectedTab" stacked align-tabs="center">
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
        <div class="text-h6">跑道</div>
      </div>
    </v-window-item>
    <v-window-item value="charts">
      <v-tabs v-model="selectedChartType" fixed-tabs class="chart-tabs">
        <v-tab value="taxi">TAXI</v-tab>
        <v-tab value="sid">SID</v-tab>
        <v-tab value="star">STAR</v-tab>
        <v-tab value="app">APP</v-tab>
        <v-tab value="ref">REF</v-tab>
      </v-tabs>
      <v-window v-model="selectedChartType">
        <v-window-item value="taxi">
          <v-list>
            <v-list-item
              v-for="item in taxiCharts"
              :title="item.name"
              :value="item"
              :key="item.name"
              @click="$emit('selectChart', item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="sid">
          <v-list>
            <v-list-item
              v-for="item in sidCharts"
              :title="item.name"
              :value="item"
              :key="item.name"
              @click="$emit('selectChart', item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="star">
          <v-list>
            <v-list-item
              v-for="item in starCharts"
              :title="item.name"
              :value="item"
              :key="item.name"
              @click="$emit('selectChart', item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="app">
          <v-list>
            <v-list-item
              v-for="item in approachCharts"
              :title="item.name"
              :value="item"
              :key="item.name"
              @click="$emit('selectChart', item)"
            />
          </v-list>
        </v-window-item>
        <v-window-item value="ref">
          <v-list>
            <v-list-item
              v-for="item in refCharts"
              :title="item.name"
              :value="item"
              :key="item.name"
              @click="$emit('selectChart', item)"
            />
          </v-list>
        </v-window-item>
      </v-window>
    </v-window-item>
    <v-window-item value="notams">
      <v-card
        v-for="item in airport?.notams"
        class="ma-3"
        :key="item.title"
        :title="item.title"
        :text="item.content"
        :subtitle="`生效于 ${item.active_at} - ${item.end_at}`"
      />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { AirportDetail } from "~~/types/Airport";
import Chart from "~~/types/Chart";

const selectedTab = ref("");
const selectedChartType = ref("");

const emit = defineEmits<{
  (e: "selectChart", chart: Chart): void;
}>();

const props = defineProps({
  airport: AirportDetail,
});

const taxiCharts = computed(() => {
  return props.airport?.charts.filter((chart) => chart.type == "TAXI");
});

const sidCharts = computed(() => {
  return props.airport?.charts.filter((chart) => chart.type == "SID");
});

const starCharts = computed(() => {
  return props.airport?.charts.filter((chart) => chart.type == "STAR");
});

const approachCharts = computed(() => {
  return props.airport?.charts.filter((chart) => chart.type == "APP");
});

const refCharts = computed(() => {
  return props.airport?.charts.filter((chart) => chart.type == "REF");
});
</script>

<style>
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

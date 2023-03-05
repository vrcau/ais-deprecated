<template>
  <div class="airport-title-card">
    <h2 class="airport-icao-title">{{ airport?.icao }}</h2>
    <span class="airport-name-title">{{ airport?.name }}</span>
  </div>
  <el-tabs>
    <el-tab-pane label="信息">
      <el-descriptions class="airport-info" :column="1">
        <el-descriptions-item label="标高">100m</el-descriptions-item>
      </el-descriptions>
    </el-tab-pane>
    <el-tab-pane label="跑道"> </el-tab-pane>
    <el-tab-pane label="航图">
      <el-tabs>
        <el-tab-pane label="TAXI"> </el-tab-pane>
        <el-tab-pane label="SID"> </el-tab-pane>
        <el-tab-pane label="STAR">
          <ClientOnly>
            <el-menu
              class="chart-list"
              @select="(item: string) => $emit('selectChart', airport?.charts.filter((chart) => chart.name == item).at(0))"
            >
              <el-menu-item
                v-for="item in airport?.charts"
                :index="item.name"
                :key="item.name"
              >
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </el-menu>
          </ClientOnly>
        </el-tab-pane>
        <el-tab-pane label="APP"> </el-tab-pane>
        <el-tab-pane label="REF"> </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="NOTAM">
      <el-card v-for="item in airport?.notams" class="notam-card" :key="item">
        <h4>{{ item.title }}</h4>
        <div class="notam-card-time">
          <p>生效于 {{ item.active_at }}</p>
          <p>结束于 {{ item.end_at }}</p>
        </div>
        <p>{{ item.content }}</p>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { AirportDetail } from "~~/types/Airport";
import Chart from "~~/types/Chart";

const emit = defineEmits<{
  (e: "selectChart", chart: Chart): void;
}>();

const props = defineProps({
  airport: AirportDetail,
});
</script>

<style>
.airport-icao-title {
  font-size: var(--el-font-size-large);
  margin-bottom: 0.1rem;
}

.airport-name-title {
  font-size: var(--el-font-size-base);
}

.airport-title-card {
  margin-bottom: 0.5rem;
}

.chart-list {
  border-right: none;
}

.chart-item {
  font-size: var(--el-font-size-base);
  font-weight: bold;
  height: 3rem;
}

.airport-info .el-descriptions__cell {
  padding-bottom: 0 !important;
}

.notam-card h4 {
  font-size: var(--el-font-size-extra-large);
  line-height: 1;
  margin: 0;
}

.notam-card p {
  font-size: var(--el-font-size-base);
  margin: 0;
}

.notam-card-time {
  margin: 8px 0;
}

.notam-card-time p {
  font-size: var(--el-font-size-extra-small);
  color: var(--el-text-color-regular);
}
</style>

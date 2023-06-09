<script setup lang="ts">
import { useChartStore } from '~/stores/chart'

const chartStore = useChartStore()
</script>

<template>
  <ChartViewer :chart="chartStore.selectedChart" />
</template>

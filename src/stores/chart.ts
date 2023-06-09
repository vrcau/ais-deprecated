import { defineStore } from 'pinia'
import type { Chart } from '~/types'

export const useChartStore = defineStore('chart', () => {
  const selectedChart: Ref<Chart | undefined> = ref(undefined)

  function setSelectedChart(chart: Chart) {
    selectedChart.value = chart
  }

  return { selectedChart, setSelectedChart }
})

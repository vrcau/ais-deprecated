<template>
  <el-container style="height: 100%">
    <el-aside class="sidebar" width="340px">
      <AirportInfo />
    </el-aside>
    <el-main>
      <ChartViewer :chart="chart" />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import AirportInfo from "../components/AirportInfo.vue";
import ChartViewer from "../components/ChartViewer.vue";
import Chart from "../types/Chart";

export default defineComponent({
  components: {
    AirportInfo,
    ChartViewer,
  },
  data() {
    return {
      chart: new Chart(),
    };
  },
});
</script>

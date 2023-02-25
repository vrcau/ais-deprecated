<template>
  <div class="airport-title-card">
    <h2 class="airport-icao-title">ZVAU</h2>
    <span class="airport-name-title">枝江/航大</span>
  </div>
  <el-tabs>
    <el-tab-pane label="信息">
      <el-descriptions class="airport-info" :column="1">
        <el-descriptions-item label="标高">100m</el-descriptions-item>
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
      </el-descriptions>
    </el-tab-pane>
    <el-tab-pane label="跑道"> </el-tab-pane>
    <el-tab-pane label="航图">
      <el-tabs>
        <el-tab-pane label="TAXI"> </el-tab-pane>
        <el-tab-pane label="SID"> </el-tab-pane>
        <el-tab-pane label="STAR">
          <client-only>
            <el-menu class="chart-list">
              <el-menu-item class="chart-item"
                >STAR RWY10R (ASOUL/AIKUN)</el-menu-item
              >
            </el-menu>
          </client-only>
        </el-tab-pane>
        <el-tab-pane label="APP"> </el-tab-pane>
        <el-tab-pane label="REF"> </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="NOTAM"> </el-tab-pane>
  </el-tabs>
</template>
<script>
export default defineComponent({
  data() {
    return {
      selectPage: "",
    };
  },
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
</style>

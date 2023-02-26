<template>
  <div style="padding: var(--el-main-padding)">
    <div class="banner-image" />
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="6">
        <div style="display: flex; align-items: center">
          <img height="90" src="~/assets/VAU.svg" />
          <div>
            <p style="font-size: var(--el-font-size-extra-large); margin: 0">
              VRChat 航空航天大学
            </p>
            <span style="font-size: var(--el-font-size-small)"
              >航行情报服务</span
            >
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic
            :title="
              '当前周期 - 更新于 ' +
              getTimeString(cycleInfo?.lastCycleUpdatedAt as number)
            "
            prefix="Cycle"
            :value="pending ? 0 : cycleInfo?.cycle"
          />
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <el-statistic title="收录机场" suffix="座" :value="pending ? 0 : cycleInfo?.airports" />
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <el-statistic title="收录航图" suffix="张" :value="pending ? 0 : cycleInfo?.charts" />
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <el-statistic title="生效 NOTAM" suffix="个" :value="pending ? 0 : cycleInfo?.notams" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="6">
        <el-card header="活动"></el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="正在生效的 NOTAM"></el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="更新日志">
          <el-timeline>
            <el-timeline-item timestamp="Cycle 2 - 2023/2/26" placement="top">
              <ul>
                <li>添加 ZVAU STAR 10R (ASOUL, AIKUN) 标准仪表进场图</li>
              </ul>
            </el-timeline-item>
            <el-timeline-item timestamp="Cycle 1 - 2023/1/1" placement="top">
              <ul>
                <li>添加 ADC ZVAU 机场场图和 IAC ILS/DME 10R 仪表进近图</li>
              </ul>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import CycleInfo from "@/types/CycleInfo";

const { pending, data: cycleInfo } = useLazyAsyncData<CycleInfo>(
  "cycleInfo",
  () => $fetch("/api/info")
);

function getTimeString(time: number): string {
  var date = new Date(time);
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${
    date.getUTCDate() + 1
  }`;
}
</script>

<style>
.statistic-footer {
  font-size: var(--el-font-size-extra-small);
  color: var(--el-text-color-regular);
}

.banner-image {
  height: 40vh;
  width: 100%;
  box-shadow: var(--el-box-shadow);
  border-radius: var(--el-border-radius-base);
  border: 1px solid var(--el-border-color);
  background-position: center bottom -100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/home.webp");
}
</style>

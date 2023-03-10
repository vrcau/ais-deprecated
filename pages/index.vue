<template>
  <el-scrollbar>
    <div style="padding: var(--el-main-padding)">
      <div class="banner-image" />
      <el-row :gutter="16" style="margin-top: 16px">
        <el-col :span="12">
          <el-row :gutter="16">
            <el-col :span="12">
              <el-card header="活动">
                <el-empty description="没有活动哦"></el-empty>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card header="正在生效的 NOTAM">
                <el-card
                  v-for="item in notams"
                  class="notam-card"
                  shadow="never"
                  :key="item"
                >
                  <h4>{{ item.title }}</h4>
                  <div class="notam-card-time">
                    <p>生效于 {{ item.active_at }}</p>
                    <p>结束于 {{ item.end_at }}</p>
                  </div>
                  <p>{{ item.content }}</p>
                </el-card>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card>
                <el-statistic
                  title="收录机场"
                  suffix="座"
                  :value="homeInfo?.airports"
                />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <el-statistic
                  title="收录航图"
                  suffix="张"
                  :value="homeInfo?.charts"
                />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card>
                <el-statistic
                  title="生效 NOTAM"
                  suffix="个"
                  :value="homeInfo?.notams"
                />
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="16" style="margin-top: 16px">
            <el-col>
              <el-card header="更新日志">
                <el-timeline>
                  <el-timeline-item
                    timestamp="Cycle 2 - 2023/2/26"
                    placement="top"
                  >
                    <ul>
                      <li>添加 ZVAU STAR 10R (ASOUL, AIKUN) 标准仪表进场图</li>
                    </ul>
                  </el-timeline-item>
                  <el-timeline-item
                    timestamp="Cycle 1 - 2023/1/1"
                    placement="top"
                  >
                    <ul>
                      <li>
                        添加 ADC ZVAU 机场场图和 IAC ILS/DME 10R 仪表进近图
                      </li>
                    </ul>
                  </el-timeline-item>
                </el-timeline>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import HomeInfo from "~~/types/HomeInfo";
import Notam from "~~/types/Notam";

const sanity = useSanity();

const { data: notams } = useLazyAsyncData<Notam[]>("notams", () =>
  sanity.fetch(
    groq`*[_type == 'notam'] { _id, content, title, active_at, end_at }`
  )
);

const { data: homeInfo } = useLazyAsyncData<HomeInfo>("homeInfo", () =>
  sanity.fetch(
    groq`{ "notams": count(*[_type == 'notam']), "airports": count(*[_type == 'airport']), "charts": count(*[_type == 'chart']) }`
  )
);
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

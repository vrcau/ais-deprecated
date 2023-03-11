<template>
  <div class="pa-6">
    <v-parallax src="/home.webp" height="400" />
    <v-row class="my-2">
      <v-col cols="6">
        <v-row>
          <v-col cols="6">
            <v-card title="活动">
              <h6 class="text-center ma-16">没有活动哦</h6>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card title="正在生效的 NOTAM">
              <v-card-text>
                <v-card
                  v-for="item in notams"
                  variant="tonal"
                  :title="item.title"
                  :text="item.content"
                  :subtitle="`生效于 ${item.active_at} -> 结束于 ${item.end_at}`"
                  :key="item.title"
                >
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col cols="4">
            <v-card title="收录机场">
              <v-card-text>
                <span class="text-h5">{{ homeInfo?.airports }}座</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card title="收录航图">
              <v-card-text>
                <span class="text-h5">{{ homeInfo?.charts }}张</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card title="生效 NOTAM">
              <v-card-text>
                <span class="text-h5">{{ homeInfo?.notams }}个</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card title="更新日志">
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-card
                      variant="tonal"
                      title="Cycle 2"
                      subtitle="2023/2/26"
                    >
                      <v-card-text>
                        <ul>
                          <li>
                            添加 ZVAU STAR 10R (ASOUL, AIKUN) 标准仪表进场图
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                  <v-list-item>
                    <v-card variant="tonal" title="Cycle 1" subtitle="2023/1/1">
                      <v-card-text>
                        <ul>
                          <li>
                            添加 ADC ZVAU 机场场图和 IAC ILS/DME 10R 仪表进近图
                          </li>
                        </ul>
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
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

<style scoped>
.banner-image {
  height: 40vh;
  width: 100%;
  box-shadow: var(--v-box-shadow);
  border-radius: var(--v-border-radius-base);
  border: 1px solid var(--v-border-color);
  background-position: center bottom -100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/home.webp");
}
</style>

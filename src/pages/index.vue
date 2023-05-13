<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import type { HomeData } from '~/types'

const { result, loading } = useQuery<HomeData>(gql`
query HomeDataQuery {
  airportsConnection {
    pageInfo {
      pageSize
    }
  }
  chartsConnection {
    pageInfo {
      pageSize
    }
  }
  notamsConnection {
    pageInfo {
      pageSize
    }
  }
  notams {
    title
    id
    endAt
    activeAt
    content
  }
}
`)
</script>

<template>
  <v-container>
    <v-parallax src="/home.webp" height="400" />
    <v-progress-linear v-if="loading" indeterminate />
    <v-row v-if="!loading" class="my-2">
      <v-col md="3" xs="6" cols="12">
        <v-card title="活动">
          <h6 class="text-center ma-16">
            没有活动哦
          </h6>
        </v-card>
      </v-col>
      <v-col md="3" xs="6" cols="12">
        <v-card title="正在生效的 NOTAM">
          <v-card-text>
            <v-card
              v-for="item in result?.notams" :key="item.title" variant="tonal" :title="item.title"
              :text="item.content" :subtitle="`生效于 ${item.activeAt} -> 结束于 ${item.endAt}`"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-card title="收录机场">
          <v-card-text>
            <span class="text-h5">{{ result?.airportsConnection.pageInfo.pageSize }}座</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="2" sm="4" cols="6">
        <v-card title="收录航图">
          <v-card-text>
            <span class="text-h5">{{ result?.chartsConnection.pageInfo.pageSize }}张</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="2" sm="4" cols="12">
        <v-card title="生效 NOTAM">
          <v-card-text>
            <span class="text-h5">{{ result?.notamsConnection.pageInfo.pageSize }}个</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="更新日志">
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-card variant="tonal" title="Cycle 2" subtitle="2023/2/26">
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
  </v-container>
</template>

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

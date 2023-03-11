<template>
  <v-layout style="height: 100%">
    <v-navigation-drawer width="340">
      <AirportInfo
        @select-chart="(item: Chart) => chart = item"
        :airport="airports == null ? undefined : airports.at(0) as AirportDetail"
      />
    </v-navigation-drawer>
    <v-main>
      <ChartViewer :chart="chart" />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import AirportInfo from "@/components/AirportInfo.vue";
import ChartViewer from "@/components/ChartViewer.vue";
import Chart from "@/types/Chart";
import { AirportDetail } from "~~/types/Airport";

const sanity = useSanity();
const query = groq`*[_type == 'airport' && icao match '${
  useRoute().params.icao
}'] {
    _id, icao, name, charts[]-> {
    name, 'url': url.asset->url, type
  },
  notams[]-> {
    _id, title, content, active_at, end_at,
  },
}`;

const { pending, data: airports } = useLazyAsyncData<AirportDetail[]>(
  "airports",
  () => sanity.fetch(query)
);

console.log(typeof airports);

const chart: Ref<Chart | undefined> = ref(undefined);
</script>

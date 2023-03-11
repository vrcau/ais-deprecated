<template>
  <div
    v-if="chart == undefined"
    class="d-flex justify-center align-center"
    style="height: 100%"
  >
    <v-icon size="x-large">mdi-file-question-outline</v-icon>
    <h1>在？看看图？</h1>
  </div>
  <ClientOnly>
    <Viewer v-if="enableViewer" ref="chartView" :options="viewerOptions">
      <img
        :src="chart?.url"
        height="0"
        width="0"
        style="visibility: collapse"
      />
    </Viewer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { component as Viewer } from "v-viewer";
import Chart from "../types/Chart";

const props = defineProps({
  chart: Chart,
});

const viewerOptions = {
  inline: true,
  button: false,
  navbar: false,
  title: false,
  toolbar: {
    zoomIn: 1,
    zoomOut: 1,
    oneToOne: 1,
    reset: 1,
    prev: 0,
    play: {
      show: 0,
    },
    next: 0,
    rotateLeft: 1,
    rotateRight: 1,
  },
  backdrop: false,
  tooltip: true,
  movable: true,
  zoomable: true,
  rotatable: true,
  scalable: false,
  transition: true,
  fullscreen: false,
  keyboard: true,
};

const chartView = ref<Viewer>();
const enableViewer = ref(false);

watch(
  () => props.chart,
  (chart) => {
    if (chart == undefined) {
      enableViewer.value = false;
    } else {
      enableViewer.value = false;

      nextTick(() => {
        enableViewer.value = true;
      });
    }
  }
);
</script>

<style>
.v-theme--dark .viewer-canvas {
  filter: invert(100%);
}
</style>

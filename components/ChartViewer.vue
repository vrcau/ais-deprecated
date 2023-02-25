<template>
  <el-empty v-if="chart == undefined" description="在？看看图？"></el-empty>
  <client-only>
    <Viewer :options="options">
      <img
        :src="chart?.uri"
        height="0"
        width="0"
        style="visibility: collapse"
      />
    </Viewer>
  </client-only>
</template>

<script lang="ts">
import { component as Viewer } from "v-viewer";
import Chart from "../types/Chart";

export default defineComponent({
  props: {
    chart: Chart
  },
  data() {
    return {
      options: {
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
      },
    };
  },
  components: {
    Viewer,
  },
});
</script>

<style>
.dark .viewer-canvas {
  filter: invert(100%);
}
</style>
<template>
  <div class="app-header">
    <div class="app-header-icon">
      <img height="25" src="~/assets/VAU.svg" />
    </div>
    <div class="app-header-search-bar">
      <ClientOnly>
        <el-autocomplete
          class="search-input"
          v-model="searchKeyword"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          @select="selectAirport"
          placeholder="搜索机场"
        >
          <template #default="{ item }">
            <div class="search-item">
              <p class="search-item-name">{{ item.name }}</p>
              <p class="search-item-icao">{{ item.icao }}</p>
            </div>
          </template>
        </el-autocomplete>
      </ClientOnly>
    </div>
    <div class="app-header-theme-switcher">
      <el-switch
        active-icon="Moon"
        inactive-icon="Sunny"
        inline-prompt
        v-model="isDark"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";
import Airport from "@/types/Airport";

const isDark = ref(useDark());
const searchKeyword = ref("");

async function querySearch(queryString: string, cb: any) {
  var result = await useLazyFetch<Airport[]>(
    `/api/search/airport?icao=${queryString}`
  );
  cb(result.data.value);
}

function selectAirport(airport: Airport) {
  useRouter().push(`/airport/${airport.icao}`);
}
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
}

.app-header-icon {
  display: flex;
  justify-content: center;
  flex: 0 0 55px;
  max-width: 55px;
}

.app-header-search-bar {
  flex: 0 0 10%;
  margin-left: 3px;
}

.app-header-theme-switcher {
  flex: 0 0 auto;
  margin-left: 85%;
}

.search-item {
  padding: 8px 0;
}

.search-item p {
  margin: 0;
  line-height: 1.3;
}

.search-item .search-item-icao {
  font-size: var(--el-font-size-extra-large);
}

.search-item .search-item-name {
  font-size: var(--el-font-size-extra-small);
  color: var(--el-text-color-secondary);
}
</style>

<template>
  <v-autocomplete
    v-model:search="searchKeyword"
    v-model="selectedAirport"
    :items="searchResult"
    clearable
    item-title="icao"
    item-value="icao"
    density="compact"
    label="搜索机场"
    hide-no-data
    hide-details
    style="max-width: 300px"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item
        v-bind="props"
        :title="item?.raw.name"
        :subtitle="item?.raw.icao"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import Airport from "@/types/Airport";

const searchKeyword = ref("");
const isLoading = ref(false);
const searchResult: Ref<Airport[]> = ref([]);
const selectedAirport = ref("");

const sanity = useSanity();

async function querySearch(queryString: string) {
  isLoading.value = true;
  let query = groq`*[_type == "airport" && icao match "*${queryString}*"] {_id, icao, name}`;
  let data = await sanity.fetch<Airport[]>(query);

  searchResult.value = data;
  isLoading.value = false;
}

watch(searchKeyword, (keyword) => {
  querySearch(keyword);
});

watch(selectedAirport, (icao) => {
  if (icao != null) {
    useRouter().push(`/airport/${icao}`);
  }
});
</script>

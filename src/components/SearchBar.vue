<script lang="ts" setup>
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import gql from 'graphql-tag'
import type { Airport, AirportsData } from '~/types'

const emit = defineEmits<{
  (e: 'selected', icao: string | undefined): void
}>()

const httpLink = createHttpLink({
  uri: 'https://ap-northeast-1.cdn.hygraph.com/content/clhku5ux83vyw01t9dy3a7goc/master',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

provideApolloClient(apolloClient)

const searchKeyword = ref('')
const isLoading = ref(false)
const searchResult: Ref<Airport[]> = ref([])
const selectedAirport: Ref<string | undefined> = ref(undefined)

querySearch()

function querySearch() {
  isLoading.value = true
  const { result, loading } = useQuery<AirportsData>(gql`
  query Airports {
  airports {
    icao
    id
    name
    charts {
      ... on Chart {
        id
        name
        url {
          url
        }
      }
    }
    notams {
      ... on Notam {
        id
        activeAt
        content
        endAt
        title
      }
    }
  }
}
  `)

  watch(loading, loading => isLoading.value = loading)
  watch(result, result => searchResult.value = result?.airports as Airport[])
}

watch(searchKeyword, () => {
  querySearch()
})

watch(selectedAirport, (icao) => {
  emit('selected', icao)
})
</script>

<template>
  <v-autocomplete
    v-model:search="searchKeyword" v-model="selectedAirport" :items="searchResult" clearable
    item-title="icao" item-value="icao" density="compact" label="搜索机场" hide-no-data hide-details
  >
    <template #item="{ props, item }">
      <v-list-item v-bind="props" :title="item?.raw.name" :subtitle="item?.raw.icao" />
    </template>
  </v-autocomplete>
</template>

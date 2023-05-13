import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { type UserModule } from '~/types'

const httpLink = createHttpLink({
  uri: 'https://ap-northeast-1.cdn.hygraph.com/content/clhku5ux83vyw01t9dy3a7goc/master',
})

const cache = new InMemoryCache()

export const install: UserModule = ({ app, isClient }) => {
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    ...(!isClient
      ? {
          ssrMode: true,
        }
      : {
          ssrForceFetchDelay: 100,
        }),
  })

  app.provide(DefaultApolloClient, apolloClient)
}

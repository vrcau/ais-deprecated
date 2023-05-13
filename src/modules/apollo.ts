import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { type UserModule } from '~/types'

const httpLink = createHttpLink({
  uri: 'https://ap-northeast-1.cdn.hygraph.com/content/clhku5ux83vyw01t9dy3a7goc/master',
})

const cache = new InMemoryCache()

export const install: UserModule = ({ app }) => {
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
  })

  app.provide(DefaultApolloClient, apolloClient)
}

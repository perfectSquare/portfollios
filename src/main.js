import { watch, createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({  
    uri: 'https://seagull-baseball-cap.cyclic.app/',
    // uri: 'http://localhost:4000/',
  })
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    cache: new InMemoryCache({
      addTypename: false
    })
  })
const app = createApp(App)
const pinia = createPinia()

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  { deep: true }
  );

app.provide(DefaultApolloClient, apolloClient)
app.use(pinia).use(router).mount('#app')


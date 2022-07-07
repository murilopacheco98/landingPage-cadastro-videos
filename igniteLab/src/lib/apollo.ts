import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.REACT_APP_VITE_API_URL,
  headers: {
  'Authorization':`Bearer ${import.meta.env.REACT_APP_VITE_API_ACCESS_TOKEN}`
},
  cache: new InMemoryCache()
})
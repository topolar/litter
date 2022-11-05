import {ApolloClient, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

const isServer = typeof window === "undefined";
// @ts-ignore
//const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let client:ApolloClient<NormalizedCacheObject>;

export function getApolloClient(forceRefresh=false) {
    if(!client || forceRefresh) {
        client = new ApolloClient({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
            ssrMode: isServer,
            cache: new InMemoryCache(),
            //cache: new InMemoryCache().restore(windowApolloState || {}),
        });
    }
    return client;
}

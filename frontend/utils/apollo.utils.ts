import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

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

export function setApolloClientBearer(token:string) {
    const client=getApolloClient();
    const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });
    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : "",
            },
        });
        return forward(operation);
    });
    client.setLink(concat(authMiddleware,httpLink));
}

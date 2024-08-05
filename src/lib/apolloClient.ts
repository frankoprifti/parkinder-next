"use client";
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://interview-apixx07.dev.park-depot.de/',
    cache: new InMemoryCache(),
});

export default client;

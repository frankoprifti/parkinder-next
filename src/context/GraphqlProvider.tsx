"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

interface IGraphQlProviderProps {
  children: React.ReactNode;
}

const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQlProvider;

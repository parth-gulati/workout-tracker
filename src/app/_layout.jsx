import { Stack } from "expo-router";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';

export default function RootLayout() {
    return (
        <QueryClientProvider client={new QueryClient()}>
        <Stack/>
        </QueryClientProvider>
    )
}
import React, { useState } from "react";
import { Text, View } from "react-native";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "./utils/trpc";
import IndexPage from "./pages/IndexPage";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: "http://192.168.219.106:3000/trpc",
  //       }),
  //     ],
  //   })
  // );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

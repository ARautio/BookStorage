<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { onMount } from "svelte";
  import socket from "./api/socket";
  import { createLogStore } from "./stores/logStore";

  export let url = ""; //This property is necessary declare to avoid ignore the Router

  import Layout from "containers/Layout/Layout.svelte";
  import BookList from "containers/BookList/BookList.svelte";
  import Settings from "containers/Settings/Settings.svelte";
  import Log from "containers/Log/Log.svelte";

  const queryClient = new QueryClient();
  const logSocket = createLogStore();
  setContext("logSocket", logSocket);

  onMount(() => {
    socket.subscribe((data) => {
      if (typeof data === "object" && data !== null) {
        logSocket.add(data as Object);
      }
    });
  });
</script>

<svelte:head>
  <title>BookStorage</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <Router {url}>
    <Layout>
      <Route path="/" component={BookList} />
      <Route path="settings" component={Settings} />
      <Route path="log" component={Log} />
    </Layout>
  </Router>
</QueryClientProvider>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

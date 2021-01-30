<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import { onMount } from "svelte";
  import socket from "./api/socket";

  export let url = ""; //This property is necessary declare to avoid ignore the Router

  import Layout from "containers/Layout/Layout.svelte";
  import BookList from "containers/BookList/BookList.svelte";

  const queryClient = new QueryClient();
  onMount(() => {
    socket.subscribe((data) => {
      console.log(data);
    });
  });
</script>

<QueryClientProvider client={queryClient}>
  <Router {url}>
    <Layout>
      <Route path="/" component={BookList} />
      <Route path="books" component={BookList} />
    </Layout>
  </Router>
</QueryClientProvider>

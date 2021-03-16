<script lang="typescript">
  import BookListItem from "./BookListItem.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { getBooks } from "api/books";
  const queryResult: any = useQuery(["books"], getBooks);
</script>

<div class="max-w-7xl mx-auto">
  {#if $queryResult.isLoading}
    <span>Loading...</span>
  {:else if $queryResult.isError}
    <span>Error: {$queryResult.error.message}</span>
  {:else}
    <div class="flex flex-wrap m-4">
      {#each $queryResult.data as item}
        <BookListItem book={item} />
      {/each}
    </div>
  {/if}
</div>

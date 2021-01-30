<script lang="typescript">
  import { useQuery } from "@sveltestack/svelte-query";
  import { getBooks } from "api/books";
  const queryResult: any = useQuery(["books"], getBooks);
</script>

{#if $queryResult.isLoading}
  <span>Loading...</span>
{:else if $queryResult.isError}
  <span>Error: {$queryResult.error.message}</span>
{:else}
  <ul>
    {#each $queryResult.data as item}
      <li>
        <img
          src="http://localhost:8000/assets/covers/{item.coverFilename}"
          alt="Cover"
        />

        <a href="http://localhost:8000/assets/books/{item.filename}"
          >{item.creator} - {item.title}</a
        >
      </li>
    {/each}
  </ul>
{/if}

<style>
  img {
    width: 100px;
  }
</style>

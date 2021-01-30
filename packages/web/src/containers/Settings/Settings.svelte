<script lang="typescript">
  import { useMutation } from "@sveltestack/svelte-query";
  import { importBooks } from "api/books";
  const importMutation: any = useMutation(importBooks);
</script>

Settings

<button
  on:click|once={() => {
    $importMutation.mutate();
  }}>Import books</button
>

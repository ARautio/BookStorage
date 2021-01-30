<script lang="typescript">
  import { useMutation } from "@sveltestack/svelte-query";
  import { importBooks } from "api/books";
  const importMutation: any = useMutation(importBooks);
</script>

<div class="max-w-7xl mx-auto px-8">
  <button
    on:click|once={() => {
      $importMutation.mutate();
    }}>Import books</button
  >
</div>

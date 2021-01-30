<script lang="typescript">
  import { useMutation } from "@sveltestack/svelte-query";
  import { importBooks } from "api/books";

  const importMutation: any = useMutation(importBooks);
</script>

<div class="max-w-7xl mx-auto px-8">
  <!-- Docker file paths -->

  <!-- File statistics + import new books -->
  <button
    on:click|once={() => {
      $importMutation.mutate();
    }}>Import books</button
  >
</div>

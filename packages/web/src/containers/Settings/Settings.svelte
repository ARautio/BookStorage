<script lang="typescript">
  import { useMutation } from "@sveltestack/svelte-query";
  import { importBooks } from "api/books";

  import Button from "components/Button.svelte";

  const importMutation: any = useMutation(importBooks);
</script>

<div class="max-w-7xl mx-auto px-8">
  <!-- File statistics + import new books -->
  <Button
    on:click|once={() => {
      $importMutation.mutate();
    }}
    >Import books
  </Button>
</div>

<script lang="typescript">
  import LogItem from "./LogItem.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";
  const logSocket: Writable<any> = getContext("logSocket");
</script>

<div class="max-w-7xl mx-auto">
  <div class="m-4 divide-y divide-light-blue-400">
    {#each $logSocket as item}
      <LogItem {item} />
    {/each}
  </div>
</div>

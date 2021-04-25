<script>
  import { Link } from "svelte-routing";
  import ResponsiveMenu from "components/ResponsiveMenu.svelte";
</script>

<ResponsiveMenu
  items={[
    { to: "/", label: "Books" },
    { to: "/settings", label: "Settings" },
    { to: "/log", label: "Log" },
  ]}
>
  <Link slot="title" class="flex-shrink-0 flex items-center hover:underline" to="/">
    <img src="/favicon.png" class="w-6 h-6 mr-1" alt="Logo" />
    <h1 class="text-base">BookStorage</h1>
  </Link>
</ResponsiveMenu>

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
  <Link slot="title" class="flex-shrink-0" to="/">BookStorage</Link>
</ResponsiveMenu>

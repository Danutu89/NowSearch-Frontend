<script>
  import { onMount } from "svelte";
  import { main as mainState } from "$stores/index";
  import { catcher } from "$utils/index";

  onMount(async () => {
    const unsubscribe = mainState.subscribe((value) => {
      if (typeof value.called == "string") catcher(value);
    });
  });
</script>

<slot />

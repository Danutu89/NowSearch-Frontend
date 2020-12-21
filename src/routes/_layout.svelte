<script>
  import { onMount } from "svelte";
  import { main as mainState } from "$stores/index";
  import { catcher } from "$utils/index";

  onMount(async () => {
    const unsubscribe = mainState.subscribe((value) => {
      console.log(value.action);
      catcher(value);
    });
  });

  console.log(1);
</script>

<slot />

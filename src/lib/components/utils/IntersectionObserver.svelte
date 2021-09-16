<script>
  import { onMount } from "svelte";

  let once = true;
  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;

  let intersecting = false;
  let container;

  onMount(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

      const observer = new IntersectionObserver(
        (entries) => {
          intersecting = entries[0].isIntersecting;
          if (intersecting && once) {
            observer.unobserve(container);
          }
        },
        {
          rootMargin,
        }
      );

      observer.observe(container);
      return () => observer.unobserve(container);
    }
    return
  })
</script>

<div bind:this={container}>
  <slot {intersecting} />
</div>

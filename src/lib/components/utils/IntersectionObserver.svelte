<script>
  import { onMount } from "svelte";

  /**
   * @type {boolean}
   * whether you want the IntersectionObserver to only detect the element the 
   * first time it scrolls into view, or every time
  */
  export let once = false;
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

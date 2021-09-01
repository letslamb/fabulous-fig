<script>
  import { onMount } from 'svelte'

  /**
   * @type {string}
   * set an optional class name for the top-level element of this component to enable 
   * scoped styling of each component instance from outside (in parent components or pages)
  */
  export let wrapperClass
  /**
   * @type {number}
   * Stack contains three named slots. splitAfter takes a number from 1-3 and enables extra spacing to be inserted via the insertion of a 'margin-bottom: auto;'
  */
  export let splitAfter
  let stack

  onMount(() => {
    if (splitAfter) {
      stack.children[splitAfter - 1].classList.toggle('split-after')
    }
  })

</script>

<div class={wrapperClass
  ? `stack ${wrapperClass}`
  : "stack"
} 
  bind:this={stack}
>
  <slot />
</div>


<style>

  /* 
    Exposed as CSS variables:
      --space
  */
  .stack {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    /* flex: var(--stack-flex, 1); <====== make sure there's no adverse effect of removing this */
  }

  .stack, .stack :global(*) {
    border-radius: inherit;
  }

  /* margins should already be cleared by your app.css resets, but in case it's not */
  .stack > :global(*) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .stack > :global(* + *) {
    margin-top: var(--space, 1rem);
  }

  .stack > :global(.split-after) {
    height: 100%;
    display: flex;
  }

  /* Remove the margin-top if a slot is unused so layout remains visually consistent */
  .stack > :global(:nth-child(2):empty), .stack > :global(:nth-child(3):empty) {
    margin-top: 0;
  }

</style>
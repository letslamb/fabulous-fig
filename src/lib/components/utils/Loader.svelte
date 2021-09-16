<script>

  import IntersectionObserver from '$lib/components/utils/IntersectionObserver.svelte'

</script>

<IntersectionObserver once={true} let:intersecting>
  <!-- prevent slot content from breaking without JS -->
  <noscript>
    <slot />
  </noscript>
  <!-- use IntersectionObserver to load slot content with JS -->
  {#if intersecting}
    <slot />
  {/if}
</IntersectionObserver>

<style>

  noscript {
    width: 100%;
  }
  
</style>
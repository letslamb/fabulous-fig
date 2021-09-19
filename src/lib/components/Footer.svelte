<script>
  import Social from '$lib/components/Social.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'

  export let footerData

</script>

<svelte:options immutable={true} />

<footer>
  <Stack>
    <Social socialIconsData={footerData} />
    <span class="copyright">&#169; The Fabulous Fig - {new Date().getFullYear()}</span>
  </Stack>
</footer>

<style>
  footer {
    padding: var(--s3) var(--s-3);
    background: var(--color-dark);
    color: var(--color-white);
  }
  
  footer :global(.stack) {
    width: fit-content;
    margin: 0 auto;
  }

  footer :global(span.copyright) {
    text-align: center;
    /* hack to make it look more centered beneath the social icons */
    margin-right: var(--s-2);
  }

  footer :global(a) {
    color: var(--color-light);
  }
</style>
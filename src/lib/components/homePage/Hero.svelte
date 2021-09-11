<script>
  import Center from '$lib/components/layout/Center.svelte'
</script>


<svelte:options immutable={true} />

<div>
  <Center>
    <svg viewBox="0 0 900 1164" xlmns="http://www.w3.org/2000/svg" role="img" aria-label="The Fabulous Fig Logo">
      <use href={`#fabulous-fig-logo`} width="100%" height="100%"></use>
    </svg>
  </Center>

</div>

<style>
  svg {
    display: block;
    margin: 0 auto;
  }
</style>

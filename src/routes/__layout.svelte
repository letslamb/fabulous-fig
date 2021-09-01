<script>
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'

</script>

<svelte:head>
  <meta name="robots" content="noindex">
</svelte:head>

<Header />
<main>
  <slot />
</main>

<style>

  :global(body) {
    font-family: 'Work Sans'
  }

</style>
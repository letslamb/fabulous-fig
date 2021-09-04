<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'
  // import BaseSEO from '$lib/components/BaseSEO.svelte'


</script>

<!-- <BaseSEO /> -->
<svelte:head>
  <meta name="robots" content="noindex">
</svelte:head>

<Sprite />

<Header />
<main>
  <slot />
</main>
<Footer />

<style>

  :global(body) {
    font-family: 'Work Sans'
  }

</style>
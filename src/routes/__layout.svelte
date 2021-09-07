<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'

  export async function load({page}) {

    const { host, path } = page

    const context = {
      seo: {
        siteName: 'The Fabulous Fig Vegan Food Truck',
        locale: 'en_US',
        canonical: `https://${page.host}${page.path}`
      }
    }
    return {
      context
    }
  }


</script>

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
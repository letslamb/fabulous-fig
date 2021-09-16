<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'

  export async function load({page, fetch}) {

    let res = await fetch('/api/layout/getHeaderData', {
      method: 'GET',
      maxage: 3600
    })
    .then(data => data.json())

    const { host, path } = page

    const context = {
      seo: {
        siteName: 'The Fabulous Fig Vegan Food Truck',
        locale: 'en_US',
        canonical: `https://${host}${path}`
      }
    }
    return {
      props: {
        res
      },
      context
    }
  }


</script>

<script>
  
  export let res

</script>

<Sprite />

<Header headerData={res} />
<main>
  <slot />
</main>
<Footer />

<style>

  :global(body) {
    font-family: 'Work Sans'
  }

</style>
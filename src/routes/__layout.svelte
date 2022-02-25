<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'

  export async function load({url, fetch}) {

    let res = await fetch('/api/layout/getGlobalData', {
      method: 'GET',
      maxage: 3600
    })
    .then(data => data.json())

    const host = url.hostname

    const path = url.pathname


    const stuff = {
      seo: {
        siteName: res.seo.title,
        siteDescription: res.seo.description,
        logo: res.seo.image.logo.url,
        facebook: res.seo.facebookUrl,
        instagram: res.seo.instagramUrl,
        phone: res.seo.phoneNumber,
        email: res.seo.email,
        locale: 'en_US',
        canonical: `https://${host}${path}`,
        siteUrl: `https://${host}`
      }
    }
    return {
      props: {
        res
      },
      stuff
    }
  }


</script>

<script>
  
  export let res

</script>

<Sprite />

<Header headerData={res} />
  <slot />
<Footer footerData={res.socialIconsData} />

<style>

  :global(body) {
    font-family: 'Work Sans'
  }

</style>
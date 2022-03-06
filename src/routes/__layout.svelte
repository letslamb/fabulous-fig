<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  // import Header from '$lib/components/Header.svelte'
  import Header from '$lib/components/NewHeader.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'

  export async function load({url, params, fetch }) {

    console.log(`params in __layout.svelte load function: ${JSON.stringify(params, null, 2)}`)

    const layoutData = fetch('/api/layout/getGlobalData/', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      },
      maxage: 3600
    })

    const response = await layoutData.then(data => data.json())

    if (response.customErrorMessage) {
      return {
        status: 502,
        error: response.customErrorMessage
      }
    }

    const host = url.host

    const path = url.pathname

    const stuff = {
      seo: {
        siteName: response.seo.title,
        siteDescription: response.seo.description,
        logo: response.seo.image.logo.url,
        facebook: response.seo.facebookUrl,
        instagram: response.seo.instagramUrl,
        phone: response.seo.phoneNumber,
        email: response.seo.email,
        locale: 'en_US',
        canonical: `https://${host}${path}`,
        siteUrl: `https://${host}/`
      }
    }

    return {
      props: {
        response
      },
      stuff    
    }
  }


</script>

<script>
  
  export let response

</script>

<Sprite />

<!-- <Header headerData={response} /> -->
<Header headerData={response} />
  <slot />
<Footer footerData={response.socialIconsData} />

<style>

  :global(h1, h2, h3, h4, h5, h6) {
    font-family: 'Work Sans';
  }

</style>
<script context="module">

  export async function load({ fetch, url, stuff }) {

    // const { slug } = url.pathname

    console.log(`url.pathname on /menu/[slug].js: ${url.pathname}`)

    const menuData = fetch(`/api${url.pathname}`, {
      method: 'GET',
      maxage: 3600
    })

    const response = await menuData.then(data => data.json())

    if (response.customErrorMessage) {
      return {
        status: 502,
        error: response.customErrorMessage
      }
    }

    return {
      props: {
        data: response,
        globalSEO: stuff.seo,
      }
    }
  }

</script>

<script>
  import BaseSEO from '$lib/components/BaseSEO.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Article from '$lib/components/utils/Article.svelte'
  import Menu from '$lib/components/menuPage/Menu.svelte'

  export let data

  export let globalSEO

</script>

<BaseSEO data={{
  currentPage: data.seo, 
  global: globalSEO
}}/>

<main>
  <div>
    <Center>
      <Box>
        <Article>
          <Menu {data} />
        </Article>
      </Box>
    </Center>
  </div>
</main>


<style>
  main {
    width: 100%;
    color: var(--color-dark);
    min-height: 100%;
  }

  main :global(.box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    padding: var(--s0) var(--s-3);
  }

</style>
<script context="module">

  export async function load({ fetch, page, context }) {

    const { slug } = page.params

    let res = await fetch(`/api/menu/${slug}`, {
      method: 'GET',
      maxage: 3600
    })
    .then(data => data.json())


    return {
      props: {
        data: res,
        globalSEO: context.seo,
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

<div>
  <Center>
    <Box>
      <Article>
        <Menu {data} />
      </Article>
    </Box>
  </Center>
</div>


<style>
  div {
    width: 100%;
    color: var(--color-dark);
  }

  div :global(.box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    padding: var(--s0) var(--s-3);
  }

</style>
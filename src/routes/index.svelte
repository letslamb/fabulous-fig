<script context="module">

  export async function load({ fetch, stuff }) {
  
    const homePageData = fetch('/api/home/getHomePageData/', {
      method: 'GET',
      maxage: 3600
    })

    const home = await homePageData.then(data => data.json())

    if (home.customErrorMessage) {
      return {
        status: 502,
        error: home.customErrorMessage
      }
    }

    return {
      status: 200,
      headers: {
        'content-type': 'application/json'
      },
      props: {
        pageSEO: home.seo,
        globalSEO: stuff.seo,
        data: home
      }
    }
  }
</script>

<script>

  import BaseSEO from '$lib/components/BaseSEO.svelte'
  import Image from '$lib/components/layout/Image.svelte'
  import Frame from '$lib/components/layout/Frame.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Article from '$lib/components/utils/Article.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'


  export let pageSEO
  export let globalSEO

  export let data

</script>

<BaseSEO data={{
  currentPage: pageSEO, 
  global: globalSEO
}}/>

<main>
  <div>
    <Center>
      <Box>
        <Article>
          <Stack>
            <HeadingTag message={data.homePageTitle} />
            <Stack>
              <Center>
                <p>{data.homePageInstructions}</p>
              </Center>
              <Cluster wrapperElement="ul">
                <a sveltekit:prefetch href="/restaurant-medford/">Medford</a>
                <a sveltekit:prefetch href="/food-truck/">Food Truck</a>
              </Cluster>
            </Stack>
            <div class="hero-image-wrapper">
              <Frame>
                <Image
                  images={data.homePageHeroImage}
                />
              </Frame>
            </div>


          </Stack>
        </Article>
      </Box>

    </Center>
  </div>

</main>

<style>

  main {
    text-align: center;
    min-height: 100%;
  }

  /* TODO - these styles are identical to the wrapper for the menu page's content. Do you care? */
  main :global(.box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    padding: var(--s3) var(--s-3);
  }

  main :global(article > .stack) {
    --space: var(--s2);
  }

  main :global(h1) {
    font-size: var(--font-size-biggish);
  }

  main :global(.frame) {
    --numerator: 9;
    --denominator: 8;
  }

  main .hero-image-wrapper {
    width:70%;
    margin-left: auto;
    margin-right: auto;
  }

  main :global(article .center) {
    --measure: 55ch;
  }

  main :global(article .cluster) {
    margin-left: auto;
    margin-right: auto;
  }

  main a {
    text-decoration: none;
    padding: var(--s-3);
    width: fit-content;
    box-shadow: 0 5px #000;
    position: relative;
    display: inline-block;
    background-color: var(--color-mid);
    color: var(--color-white);
    border: 3px solid var(--color-lightish);
  }

</style>
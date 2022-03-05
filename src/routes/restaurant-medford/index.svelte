<script context="module">

  export async function load({ fetch, stuff }) {
  
    const restaurantPageData = fetch('/api/departments/restaurant-medford/home/getRestaurantPageData/', {
      method: 'GET',
      maxage: 3600
    })

    const restaurant = await restaurantPageData.then(data => data.json())

    if (restaurant.customErrorMessage) {
      return {
        status: 502,
        error: restaurant.customErrorMessage
      }
    }

    return {
      status: 200,
      headers: {
        'content-type': 'application/json'
      },
      props: {
        pageSEO: restaurant.seo,
        globalSEO: stuff.seo,
        data: restaurant
      }
    }
  }
</script>

<script>

  import BaseSEO from '$lib/components/BaseSEO.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Box from '$lib/components/layout/Box.svelte'
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
          <Center>
            <Stack>
              <HeadingTag message={data.restaurantPageTitle} />
                <Stack>
                  <p>{data.restaurantPageDescription}</p>
                  <Cluster wrapperElement="ul">
                    {#each data.restaurantPageLinks as link}
                      {#if !link.external}
                        <a sveltekit:prefetch href={link.href}>{link.text}</a>
                      {:else}
                        <a rel="external" href={link.href}>{link.text}</a>
                      {/if}
                    {/each}
                  </Cluster>
                  {#if data.hours}
                    <HeadingTag message={data.hours.title} />
                    {#each data.hours.text as text}
                      <p>{text}</p>
                    {/each}
                  {/if}
                  {#if data.location}
                    <HeadingTag message={data.location.title} />
                    {#each data.location.text as text}
                      <p>{text}</p>
                    {/each}
                  {/if}
                </Stack>


            </Stack>
          </Center>

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

  main :global(.stack) {
    --space: var(--s2);
  }

  main :global(h1) {
    /* font-size: var(--font-size-biggish); */
  }

  main :global(.frame) {
    --numerator: 9;
    --denominator: 8;
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
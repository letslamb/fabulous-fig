<script context="module">

  export async function load({ fetch, stuff }) {
    const calendarData = fetch('/api/departments/food-truck/googleCalendar/getCalendarEvents/', {
      method: 'GET',
      maxage: 3600
    })
  
    const homePageData = fetch('/api/departments/food-truck/home/getFoodTruckPageData/', {
      method: 'GET',
      maxage: 3600
    })

    const bothResponses = Promise.allSettled([
      calendarData.then(response => response.json()), 
      homePageData.then(response => response.json())
    ])

    const [cal, home] = await bothResponses

    if (home.value.customErrorMessage) {
      return {
        status: 502,
        error: home.value.customErrorMessage
      }
    }

    return {
      status: 200,
      headers: {
        'content-type': 'application/json'
      },
      props: {
        calendar: cal.value,
        noCalendarMessage: home.value.placeholderMessage,
        pageTitle: home.value.title,
        pageDescription: home.value.description,
        pageSEO: home.value.seo,
        globalSEO: stuff.seo
      }
    }
  }
</script>

<script>

  import BaseSEO from '$lib/components/BaseSEO.svelte'
  import CalendarDisplay from '$lib/components/homePage/CalendarDisplay.svelte'
  import Hero from '$lib/components/homePage/Hero.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Article from '$lib/components/utils/Article.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'


  export let pageSEO
  export let globalSEO
  export let noCalendarMessage
  export let pageTitle
  export let pageDescription

  export let calendar

</script>

<BaseSEO data={{
  currentPage: pageSEO, 
  global: globalSEO
}}/>

<main>
  <div class="hero">
    <Center>
      <Hero /> 
    </Center>
  </div>
  <div>
    <Center>
      <Box>
        <Article>
          <Stack>
            <HeadingTag wrapperClass="calendar-heading" message={pageTitle} />
            {#if calendar && calendar[0]}
              {#if pageDescription}
                <p>{pageDescription}</p>
              {/if}
              <CalendarDisplay {calendar}/>
            {:else}
              <p>{noCalendarMessage}</p>
            {/if}
          </Stack>
        </Article>
      </Box>
    </Center>
  </div>
</main>

<style>

  main {
    min-height:100%;
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

  main :global(.calendar-heading) {
    text-align: center;
    font-size: var(--font-size-biggish);
  }

  main p {
    text-align: center;
  }
</style>















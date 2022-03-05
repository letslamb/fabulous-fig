<script context="module">

  export async function load({ fetch, stuff }) {
    const calendarData = fetch('/api/departments/food-truck/googleCalendar/getCalendarEvents/', {
      method: 'GET',
      maxage: 3600
    })
  
    const homePageData = fetch('/api/departments/food-truck/home/getHomePageData/', {
      method: 'GET',
      maxage: 3600
    })

    const bothResponses = await Promise.allSettled([
      calendarData.then(response => response.json()), 
      homePageData.then(response => response.json())
    ])

    const [cal, home] = bothResponses

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

  export let calendar

  $: console.log(`noCalendarMessage: ${JSON.stringify(noCalendarMessage, null, 2)}`)

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
            <!-- TODO this title shouldn't be hardcoded -->
            <HeadingTag wrapperClass="calendar-heading" message="Where to Find The Fabulous Fig" />
            {#if calendar && calendar[0]}
              <CalendarDisplay {calendar}/>
            {:else}
              <p>{noCalendarMessage.message}</p>
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
    padding: var(--s0) var(--s-3);
  }

  main :global(.calendar-heading) {
    text-align: center;
    font-size: var(--font-size-biggish);
  }

  main p {
    text-align: center;
  }
</style>















<script context="module">

  export async function load({ fetch, stuff }) {
    const calendarData = await fetch('/api/googleCalendar/getCalendarEvents', {
      method: 'GET',
      // maxage: 3600
    })
    const cal = await calendarData.json()

    const homePageData = await fetch('/api/home/getHomePageData', {
      method: 'GET',
      // maxage: 3600
    })
    const homePage = await homePageData.json()

    if (calendarData.ok && homePageData.ok) {
      return {
        status: calendarData.status,
        headers: {
          'content-type': 'application/json'
        },
        props: {
          calendar: cal,
          noCalendarMessage: homePage.placeholder,
          pageSEO: homePage.seo,
          globalSEO: stuff.seo
        }
      }
    }

    return {
      status: res.status,
      error: new Error('could not load endpoint data')
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

</script>

<BaseSEO data={{
  currentPage: pageSEO, 
  global: globalSEO
}}/>

<main>

  <div>
    <Center>
      <Hero /> 
    </Center>
  </div>

  <div>
    <Center>
      <Box wrapperClass={"calendar-box"}>
        <Article>
          <Stack>
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















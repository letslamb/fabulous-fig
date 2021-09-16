<script context="module">

  export async function load({ fetch, context }) {
    const calendarData = await fetch('/api/googleCalendar/getCalendarEvents', {
      method: 'GET',
      maxage: 3600
    })
    const cal = await calendarData.json()

    const homePageData = await fetch('/api/home/getHomePageData', {
      method: 'GET',
      maxage: 3600
    })
    const homePageSEO = await homePageData.json()

    if (calendarData.ok && homePageData.ok) {
      return {
        status: calendarData.status,
        headers: {
          'content-type': 'application/json'
        },
        props: {
          calendar: cal,
          pageSEO: homePageSEO.seo,
          globalSEO: context.seo
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

  export let pageSEO
  export let globalSEO


  export let calendar

</script>

<BaseSEO data={{
  page: pageSEO, 
  global: globalSEO
}}/>

<Hero />

<div>
  <Center>
    <Box wrapperClass={"calendar-box"}>
      {#if calendar[0]}
        <CalendarDisplay {calendar}/>
      {:else}
        <p>This is a placeholder for when there are no calendar events</p>
      {/if}
    </Box>
  </Center>
</div>

<style>

  /* TODO - these styles are identical to the wrapper for the menu page's content. Do you care? */
  div :global(.box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    padding: var(--s0) var(--s-3);
  }
</style>















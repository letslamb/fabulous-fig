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
  import Section from '$lib/components/utils/Section.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'

  export let pageSEO
  export let globalSEO


  import { setContext } from 'svelte'

  export let calendar

  setContext('seo', {
    page: pageSEO,
    global: globalSEO
  })

  setContext('calendarData', calendar)

  // $: console.log(JSON.stringify(seo, null, 2))

</script>

<BaseSEO />

<Hero />

<div wrapperClass="calendar-wrapper-section">
  <Center>
    <Box wrapperClass={"calendar-box"}>
      {#if calendar[0]}
        <CalendarDisplay />
      {:else}
        <p>This is a placeholder for when there are no calendar events</p>
      {/if}
    </Box>
  </Center>
</div>

<style>
  :global(.calendar-wrapper-section) {
    max-height: fit-content;
  }

  :global(.calendar-box) {
    --color: var(--color-dark);
    --background-color: var(--color-light);
    padding: var(--s-3);
    width: 100%;
  }
</style>















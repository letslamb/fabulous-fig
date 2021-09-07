<script context="module">

  export async function load({ fetch, context }) {
    const res = await fetch('/api/googleCalendar/getCalendarEvents', {
      method: 'GET',
      maxage: 3600
    })
    const cal = await res.json()

    let seo = context.seo

    if (res.ok) {
      return {
        status: res.status,
        headers: {
          'content-type': 'application/json'
        },
        props: {
          calendar: cal,
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

  // import BaseSEO from '$lib/components/BaseSEO.svelte'
  import CalendarDisplay from '$lib/components/homePage/CalendarDisplay.svelte'
  import Hero from '$lib/components/homePage/Hero.svelte'
  import Section from '$lib/components/utils/Section.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'

  // export let seo

  import { setContext } from 'svelte'

  export let calendar

  setContext('calendarData', calendar)

  // $: console.log(seo)

</script>

<Hero />

<Section wrapperClass="calendar-wrapper-section">
  <Center>
    <Box wrapperClass={"calendar-box"}>
      {#if calendar[0]}
        <CalendarDisplay />
      {:else}
        <p>This is a placeholder for when there are no calendar events</p>
      {/if}
    </Box>
  </Center>
</Section>

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















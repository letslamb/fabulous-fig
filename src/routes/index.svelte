<script context="module">

  export async function load({ fetch }) {
    const res = await fetch('/api/googleCalendar/getCalendarEvents', {
      method: 'GET',
      maxage: 3600
    })
    const cal = await res.json()

    if (res.ok) {
      return {
        status: res.status,
        headers: {
          'content-type': 'application/json'
        },
        props: {
          calendar: cal
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

  import CalendarDisplay from '$lib/components/homePage/CalendarDisplay.svelte'
  import Hero from '$lib/components/homePage/Hero.svelte'
  import Section from '$lib/components/utils/Section.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'


  import { setContext } from 'svelte'

  export let calendar

  setContext('calendarData', calendar)

  // $: console.log(calendar)

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
  }
</style>















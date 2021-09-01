<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api/googleCalendar/getCalendarEvents', {
      method: 'GET',
      mode: 'cors',
      // headers: {
      //   'content-type': 'application/json'
      // }
    })
      .then(data => data.json())
    // const cal = await res.json()

    // if (res.ok) {
      return {
        status: res.status,
        headers: {
          'content-type': 'application/json'
        },
        props: {
          calendar: res || {}
        }
      }
    // }

    return {
      status: res.status,
      error: new Error('could not load endpoint data')
    }
  }
</script>

<script>

  import CalendarDisplay from '$lib/components/homePage/CalendarDisplay.svelte'
  import Hero from '$lib/components/homePage/Hero.svelte'

  import { setContext } from 'svelte'

  export let calendar

  setContext('calendarData', calendar)

  // $: console.log(calendar)

</script>

<Hero />

<CalendarDisplay />















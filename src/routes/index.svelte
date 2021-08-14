<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/googleCalendar/getCalendarEvents')
    const cal = await res.json()

    if (res.ok) {
      return {
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
  export let calendar

  $: console.log(calendar)

</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each calendar as cal}
  <h2>{cal.summary}</h2>
  <h3>{new Date(
      Date.parse(cal.start.dateTime)
    ).toLocaleString()
    .split(',')[0]}
  </h3>
  <h4>{new Date(
      Date.parse(cal.start.dateTime)
    ).toLocaleString()
    .split(',')[1]} - 
      {new Date(
        Date.parse(cal.end.dateTime)
      ).toLocaleString()
      .split(',')[1]}
  </h4>
  {#if cal.description}
    <p>{@html cal.description}</p>
  {/if}
{/each}








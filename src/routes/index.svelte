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
  <h3>{cal.date}</h3>
  <h4>{cal.startTime} - {cal.endTime}</h4>
  {#if cal.description}
    <p>{@html cal.description}</p>
  {/if}
{/each}








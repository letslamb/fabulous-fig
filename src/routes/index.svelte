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
  import Icon from '$lib/components/layout/Icon.svelte'
  import Section from '$lib/components/utils/Section.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'
  export let calendar

  $: console.log(calendar)

</script>

<!-- <Section>
  {#each calendar as cal}
    <HeadingTag message={cal.summary} />
    <Section>
      <HeadingTag message={cal.date} />
      <HeadingTag message ={`${cal.startTime} - ${cal.endTime}`} />
      {#if cal.description}
        <p>{@html cal.description}</p>
      {/if}
    </Section>
  {/each}
</Section>


<Icon iconId={'#icon-nut-free'}>
  Nut Free
</Icon>  
<Icon iconId={'#icon-gluten-free'}>
  Gluten Free
</Icon>
<Icon iconId={'#icon-soy-free'}>
  Soy Free
</Icon> -->









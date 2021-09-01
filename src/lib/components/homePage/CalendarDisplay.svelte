<script>
  import Section from '$lib/components/utils/Section.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'

  import { getContext } from 'svelte'

  let calendar = getContext('calendarData')

  $: console.log(calendar)

</script>

<Section wrapperClass="calendar-wrapper-section">
  <Center>
    <Box wrapperClass={"calendar-box"}>
      <Stack>
        <HeadingTag wrapperClass={"calendar-heading"} message={"Upcoming Schedule"} />
        <Section>
          <Stack>
            {#each calendar as cal, i}
              <Box wrapperClass={"event-box"} switchColors={true}>
                <Stack>
                  <HeadingTag message={cal.summary} />
                  <Section>
                    <Stack>
                      <HeadingTag message={`${cal.dayOfWeek}, ${cal.date}`} />
                      {#if cal.startTime && cal.endTime}
                        <HeadingTag message ={`${cal.startTime} - ${cal.endTime}`} />
                      {/if}
                      {#if cal.googleMapsLink}
                        <div>
                          <a href={cal.googleMapsLink} target="_blank" id={`googleMapsLink-${i}`} aria-labelledby={`googleMapsLink-${i} googleMapsSpan-${i}`}>Link to Map</a>
                          <span id={`googleMapsSpan-${i}`}>
                            (opens a new window)
                          </span>
                        </div>
                      {/if}
                      {#if cal.menu.link}
                        <a href={cal.menu.link}>View Menu</a>
                      {/if}
                      {#if cal.description}
                        <p class="event-description">
                          {@html cal.description}
                        </p>
                      {/if}
                    </Stack>
                  </Section>
                </Stack>
              </Box>
            {/each}
          </Stack>
        </Section>
      </Stack>
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
 
  :global(.calendar-heading) {
    text-align: center;
  }

  :global(.calendar-box .event-box.box) {
    padding: var(--s-1);
    border: 2px solid var(--color-mid);
    border-radius: 5px;
  }

  :global(.calendar-box .event-box section) {
    color: var(--color-white);
  }

  :global(.calendar-box .event-box a) {
    color: var(--color-light);
  }

  :global(.event-description ul) {
    padding: 0 var(--s0) 0 var(--s0);
  }

  :global(.event-description ol) {
    padding: 0 var(--s1) 0 var(--s1);
  }
</style>



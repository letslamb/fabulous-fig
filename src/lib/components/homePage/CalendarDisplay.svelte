<script>
  import Section from '$lib/components/utils/Section.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'

  export let calendar = {}

</script>


<div>
  <Section>
    <Stack>
      {#each calendar as cal, i}
        <Box wrapperClass={"event-box"} switchColors={true}>
          <Stack>
            <HeadingTag wrapperClass={"event-title"} message={cal.summary} />
            <Section>
              <Stack>
                <HeadingTag message={`${cal.dayOfWeek}, ${cal.date}`} />
                {#if cal.startTime && cal.endTime}
                  <HeadingTag message ={`${cal.startTime} - ${cal.endTime}`} />
                {/if}
                {#if cal.googleMapsLink}
                  <div>
                    <a href={cal.googleMapsLink} class="view-map-link" target="_blank" id={`googleMapsLink-${i}`} aria-labelledby={`googleMapsLink-${i} googleMapsSpan-${i}`}>Map</a>
                    <span id={`googleMapsSpan-${i}`}>
                      (opens a new window)
                    </span>
                  </div>
                {/if}
                {#if cal.menu.link}
                  <a class="visit-menu-link" href={cal.menu.link}>Event Menu</a>
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
</div>

<style>

  div :global(section .stack) {
    --space: var(--s0);
  }

  div :global(.event-box.box) {
    padding: var(--s-1);
    border: 2px solid var(--color-mid);
    border-radius: 5px;
  }

  div :global(.event-title) {
    font-weight: 600;
  }

  div :global(h3) {
    font-weight: 400;
  }

  div :global(.event-box section) {
    color: var(--color-white);
  }

  div a {
    color: var(--color-light);
  }

  div :global(.event-description ul) {
    padding: 0 var(--s0) 0 var(--s0);
  }

  div :global(.event-description ol) {
    padding: 0 var(--s1) 0 var(--s1);
  }

  div a.visit-menu-link, div a.view-map-link {
    text-decoration: none;
    padding: var(--s-3);
    width: fit-content;
    box-shadow: 0 5px #000;
    position: relative;
    display: inline-block;
  }

  div a.visit-menu-link {
    background-color: var(--color-light);
    color: var(--color-dark);
    border: 3px solid var(--color-lightish);
  }

  div a.view-map-link {
    background-color: var(--color-mid);
    color: var(--color-white);
    border: 3px solid var(--color-light);
  }

  div a:active {
    top: 5px;
  }
</style>



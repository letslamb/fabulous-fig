<script>
  import Stack from '$lib/components/layout/Stack.svelte'
  import ToggleSection from '$lib/components/utils/ToggleSection.svelte'
  import MenuItem from '$lib/components/menuPage/MenuItem.svelte'

  export let section
  export let index
</script>

<div>
  <ToggleSection headerText={section.title} expanded={index === 0 ? true : false}>
    <Stack>
      {#if section.description}
        <p>{section.description}</p>
      {/if}
      {#each section.items as item}
        <MenuItem {item} />
      {/each}
    </Stack>
  </ToggleSection>
</div>



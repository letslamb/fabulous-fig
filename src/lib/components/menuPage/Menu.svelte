<script>
  import Stack from '$lib/components/layout/Stack.svelte'
  import Icon from '$lib/components/layout/Icon.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Section from '$lib/components/utils/Section.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'
  import MenuSection from '$lib/components/menuPage/MenuSection.svelte'

  export let data

</script>

  <div class="menu-wrapper">
    <Stack wrapperClass="menu-wrapper-stack">
      <div>
        <Stack>
          <HeadingTag message={data.menuTitle} />
          {#if data.menuDescription}
            <p>{data.menuDescription}</p>
          {/if}
          <Section>
            <Center>
              <Stack>
                <HeadingTag message={"Icon Map"} />
                <Cluster wrapperElement="ul" wrapperClass="icon-legend">
                  <li>
                    <Icon iconId={'#icon-gluten-free'}>
                      Gluten Free
                    </Icon>
                  </li>
                  <li>
                    <Icon iconId={'#icon-nut-free'}>
                      Nut Free
                    </Icon>
                  </li>
                  <li>
                    <Icon iconId={'#icon-soy-free'}>
                      Soy Free
                    </Icon>
                  </li>
                </Cluster>
              </Stack>
            </Center>

          </Section>
        </Stack>
      </div>
      <Section>
      {#each data.sections as section, i}
        <Box wrapperClass="menu-section--wrapper-box">
          <MenuSection {section} index={i} />
        </Box>
      {/each}
      </Section>
    </Stack>
  </div>  

<style>

  div.menu-wrapper {
    --space: var(--s2);
  }


  div :global(.menu-wrapper-stack > div) {
    text-align: center;
  }

  div :global(section > .center) {
    --measure: 20ch;
  }

  div :global(.icon-legend) {
    --space: var(--s-1);
    /* margin-left: auto;
    margin-right: auto; */
    flex-direction: column;
  }

  div :global(.icon-legend li) {
    margin-right: auto;
  }

  div :global(.icon-legend .with-icon) {
    align-items: center;
  }

  div :global(.box + .box) {
    border-top: 1px;
  }

  div :global(.box) {
    border: 2px solid var(--color-mid);
    border-radius: 5px;
    padding: var(--s-1)
  }

  div :global(.with-icon svg) {
    font-size: var(--s2);
  }
</style>

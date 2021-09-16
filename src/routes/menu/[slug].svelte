<script context="module">

  export async function load({ fetch, page, context }) {

    const { slug } = page.params

    let res = await fetch(`/api/menu/${slug}`, {
      method: 'GET',
      maxage: 3600
    })
    .then(data => data.json())


    return {
      props: {
        data: res,
        globalSEO: context.seo,
      }
    }
  }

</script>

<script>
  import BaseSEO from '$lib/components/BaseSEO.svelte'
  import Image from '$lib/components/layout/Image.svelte'
  import Frame from '$lib/components/layout/Frame.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Icon from '$lib/components/layout/Icon.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Sidebar from '$lib/components/layout/Sidebar.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Loader from '$lib/components/utils/Loader.svelte'
  import Section from '$lib/components/utils/Section.svelte'
  import Article from '$lib/components/utils/Article.svelte'
  import ToggleSection from '$lib/components/utils/ToggleSection.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'

  export let data

  export let globalSEO

</script>

<BaseSEO data={{
  page: data.seo, 
  global: globalSEO
}}/>

<div>
  <Center>
    <Box wrapperClass="menu--wrapper-box">
      <Article>
        <Stack wrapperClass="menu-wrapper-stack">
          <div>
            <Stack>
              <HeadingTag message={data.menuTitle} />
              {#if data.menuDescription}
                <p>{data.menuDescription}</p>
              {/if}
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
  
          </div>
          <Section>
          {#each data.sections as section, i}
  
            <Box wrapperClass="menu-section--wrapper-box">
  
              <ToggleSection headerText={section.title} expanded={i === 0 ? true : false}>
                <Stack>
                  {#if section.description}
                    <p>{section.description}</p>
                  {/if}
                  {#each section.items as item}
                    <Article wrapperClass="menu-item--wrapper-section">
                      <Stack --space="var(--s-2)">
                        <hr>
                        <HeadingTag message={item.name} />
                        {#if item.images}
                          <Sidebar wrapperClass="menu-item--wrapper-sidebar">
                            <div slot="sidebar-content">
                              <Frame>
                                <Loader>
                                  <Image
                                    images={item.images}
                                    altText={item.altText}
                                  />
                                </Loader>
                              </Frame>
                            </div>
                            <div slot="main-content">
                              <Stack>                              
                                {#if item.glutenFree || item.nutFree || item.soyFree}
                                  <Cluster wrapperClass="menu-item-icons--cluster-wrapper" wrapperElement="ul">
                                    {#if item.glutenFree}
                                    <li>
                                      <Icon iconId={'#icon-gluten-free'} label="Gluten Free" />
                                    </li>
                                    {/if}
                                    {#if item.nutFree}
                                    <li>
                                      <Icon iconId={'#icon-nut-free'} label="Nut Free" />
                                    </li>
                                    {/if}
                                    {#if item.soyFree}
                                    <li>
                                      <Icon iconId={'#icon-soy-free'} label="Soy Free" />
                                    </li>
                                    {/if}
                                  </Cluster>
                                {/if}
                                {#if item.price}
                                  <p>{item.price}</p>
                                {/if}
                                {#if item.description}
                                  <p>{item.description}</p>
                                {/if}
                              </Stack>
                            </div>
                          </Sidebar>
                        {:else if !item.images}
                          {#if item.glutenFree || item.nutFree || item.soyFree}
                            <Cluster wrapperClass="menu-item-icons--cluster-wrapper" wrapperElement="ul">
                              {#if item.glutenFree}
                                <li>
                                  <Icon iconId={'#icon-gluten-free'} label="Gluten Free" />
                                </li>
                              {/if}
                              {#if item.nutFree}
                                <li>
                                  <Icon iconId={'#icon-nut-free'} label="Nut Free" />
                                </li>
                              {/if}
                              {#if item.soyFree}
                                <li>
                                  <Icon iconId={'#icon-soy-free'} label="Soy Free" />
                                </li>
                              {/if}
                            </Cluster>
                          {/if}
                          {#if item.price}
                            <p>{item.price}</p>
                          {/if}
                          {#if item.description}
                            <p>{item.description}</p>
                          {/if}
                        {/if}
                      </Stack>
                    </Article>
                  {/each}
                </Stack>
              </ToggleSection>
            </Box>
          {/each}
          </Section>
        </Stack>
      </Article>

    </Box>
  </Center>
</div>


<style>
  div {
    width: 100%;
    color: var(--color-dark);
  }

  div :global(.menu-wrapper-stack > div) {
    text-align: center;
  }

  div :global(.icon-legend) {
    --space: var(--s-1);
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
  }

  div :global(.icon-legend li) {
    margin-right: auto;
  }

  div :global(.icon-legend .with-icon) {
    align-items: center;
  }

  /* TODO - when you break this page up into a couple more components, you can just target
  div :global(.box), and if any overrides are still needed, use the cascade.
  Unique classes got out of control because the page comp is too big */
  div :global(.menu--wrapper-box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    padding: var(--s0) var(--s-3);
  }

  div :global(.menu-section--wrapper-box + .menu-section--wrapper-box) {
    border-top: 1px;
  }

  div :global(.menu-section--wrapper-box) {
    border: 2px solid var(--color-mid);
    border-radius: 5px;
    padding: var(--s-1)
  }

  div :global(.menu-item--wrapper-section hr) {
    background-color: var(--color-lightish);
    border: 0;
    display: block;
    width: 100%;
    height: 1px;
  }

  div :global(.menu-item--wrapper-sidebar) {
    --sidebar-spacing: var(--s0); 
    --sidebar-width: 15ch;
  }

  /* hack to compensate for the <li> wanting to have extra height beneath its content, Stack can't
  make alignment perfectly even. Only do this for the vertical layout */
  div :global(:not(.mainContent) > div > div > ul > li) {
    display: inline-block;
    margin-top: var(--s-4);
  }

  div :global(.stack .with-sidebar) {
    --space: var(--s0);
  }

  div :global(.menu-item-icons--cluster-wrapper) {
    --space: var(--s-2);
  }

  div :global(.with-icon svg) {
    font-size: var(--s2);
  }
</style>
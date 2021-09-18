<script>
  import Image from '$lib/components/layout/Image.svelte'
  import Frame from '$lib/components/layout/Frame.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Icon from '$lib/components/layout/Icon.svelte'
  import Sidebar from '$lib/components/layout/Sidebar.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Article from '$lib/components/utils/Article.svelte'
  import HeadingTag from '$lib/components/utils/HeadingTag.svelte'

  export let item

</script>


<div>
  <Article wrapperClass="menu-item--wrapper-section">
    <Stack wrapperClass="outerStack">
      <hr>
      <HeadingTag message={item.name} />
      {#if item.images}
        <Sidebar>
          <div slot="sidebar-content">
            <Frame lazy={true}>
              <Image
                images={item.images}
                altText={item.altText}
              />
            </Frame>
          </div>
          <div slot="main-content">
            <Stack wrapperClass="innerStack">                              
              {#if item.glutenFree || item.nutFree || item.soyFree}
                <Cluster wrapperElement="ul">
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
          <Cluster wrapperElement="ul">
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
          <p>{`$${item.price}`}</p>
        {/if}
        {#if item.description}
          <p>{item.description}</p>
        {/if}
      {/if}
    </Stack>
  </Article>
</div>

<style>

  div :global(.outerStack) {
    --space: var(--s0);
  }

  div :global(.innerStack) {
    --space: var(--s-1);
  }

  hr {
    background-color: var(--color-lightish);
    border: 0;
    display: block;
    width: 100%;
    height: 1px;
  }

  div :global(.with-sidebar) {
    --sidebar-spacing: var(--s1); 
    --sidebar-width: 15ch;
  }

  div :global(.outerStack > ul) {
    margin-top: var(--s0);
  }

  div :global(.outerStack > ul ~ p) {
    margin-top: var(--s-1)
  }

  div :global(.outerStack .with-sidebar) {
    --space: var(--s1);
  }

  div :global(.cluster) {
    --space: var(--s-2);
  }

</style>

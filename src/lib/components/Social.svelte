<script>

  import Icon from '$lib/components/layout/Icon.svelte'
  import Cluster from '$lib/components/layout/Cluster.svelte'

  /**
   * @type {Array.<{id: string, label: string, link: string}>}
  */
  export let socialIconsData

</script>

<div>
  <Cluster wrapperElement="ul" wrapperClass="social-wrapper-cluster">
    {#each socialIconsData as socialIcon}
      <li>
        <a href={socialIcon.link}>
          <Icon wrapperClass="social-icon" iconId={socialIcon.id} label={socialIcon.label} />
        </a>
      </li>
    {/each}
  </Cluster>
</div>

<style>

  div :global(.cluster.social-wrapper-cluster) {
    --space: var(--s-2);
    justify-content: space-between;
  }

  /* give email icon a little extra margin-right to compensate for looking wider than others */
  div :global(.cluster.social-wrapper-cluster :nth-child(2)) {
    --space: var(--s-1);
  }

  a {
    display: block;
  }

  li :global(.social-icon .icon) {
    font-size: var(--s2);
    width: 1em;
  }
  
</style>

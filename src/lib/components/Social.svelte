<script context="module">

  // TODO: This info should be read from the sprite file in an endpoint or private module, 
  // and while you're at it the sprite file should probably be auto-generated from standalone source svg files
  const socialIconsData = [
    {
      id: '#icon-phone',
      label: 'Call the Fabulous Fig (opens your native phone app)',
      link: 'tel:+1-267-432-7790'
    },
    {
      id: '#icon-email',
      label: 'Click to Email The Fabulous Fig (opens your native mail app)',
      link: 'mailto: thefabulousfig@gmail.com'
    },
    {
      id: '#icon-facebook',
      label: 'Visit The Fabulous Fig on Facebook (opens a new window)',
      link: 'https://www.facebook.com/thefabulousfig'
    },
    {
      id: '#icon-instagram',
      label: 'Visit The Fabulous Fig on Instagram (opens a new window)',
      link: 'https://www.instagram.com/thefabulousfig'
    }
  ]
</script>

<script>

  import Icon from '$lib/components/layout/Icon.svelte'
  // import Sprite from '$static/svg/icons.svg'
  import Cluster from '$lib/components/layout/Cluster.svelte'

</script>

<Cluster wrapperElement="ul" wrapperClass="social-wrapper-cluster">
  {#each socialIconsData as socialIcon}
    <li>
      <a href={socialIcon.link}>
        <Icon wrapperClass="social-icon" iconId={socialIcon.id} label={socialIcon.label} />
      </a>
    </li>
  {/each}
</Cluster>

<style>
  

  :global(.social-wrapper-cluster) {
    /* TODO: this is a hack. is it worth it? */
    margin-top: var(--s-4)
  }

  li :global(.social-icon .icon) {
    font-size: var(--s1);
    overflow: visible;
  }

  a {
    display: block;
  }


</style>

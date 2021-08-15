<script>

  import Sprite from '$static/diet-icons/icons.svg'

  /**
   * @type {string}
   * set an optional class name for the top-level element of this component to enable 
   * scoped styling of each component instance from outside (in parent components or pages)
  */
  export let wrapperClass

  /**
   * @type {string}
   * the text you want to accompany the icon. Should be descriptive & contextualize the icon
  */
  export let iconText

  /**
   * @type {string}
   * the ID attribute (including '#') of the icon you want to pull from the sprite
  */
  export let iconId

  /**
   * @type {boolean}
   * 
  */
  export let label

</script>

<span class={wrapperClass
  ? `with-icon ${wrapperClass}`
  : "with-icon"
}
aria-label={label ? label : null}
role={label ? 'img' : null}
>
  <svg class="icon">
    <use href={`${Sprite}${iconId}`}></use>
  </svg>
  {#if !label}
    <slot />
  {/if}
  <!-- <slot /> -->
  <!-- {iconText} -->
</span>

<style>
  /* Exposed as CSS variables:
      --space
  */

  /* :global(svg) {
    width: 0.75em;
    height: 0.75em;
  } */

  .icon {
    width: 0.75em;
    width: 1cap;
    height: 0.75em;
    height: 1cap;
  }

  .with-icon {
    display: inline-flex;
    align-items: baseline;
  }

  .with-icon .icon {
    margin-inline-end: var(--space, 1rem);
  }

  /* :global(.with-icon svg) {
    margin-inline-end: var(--space, 1rem);
  } */
</style>
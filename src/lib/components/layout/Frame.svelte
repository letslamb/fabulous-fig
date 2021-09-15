<script>
  /**
   * @type {string}
   * set an optional class name for the top-level element of this component to enable 
   * scoped styling of each component instance from outside (in parent components or pages)
  */
  export let wrapperClass

</script>


<div class={wrapperClass
  ? `frame ${wrapperClass}`
  : "frame"
}>
  <slot />
</div>


<style>
  /* 
    Exposed as CSS variables:
      --numerator
      --denominator
  */

  .frame {
    padding-bottom: calc(var(--numerator, 1) / var(--denominator, 1) * 100%);
    position: relative;
  }

  /* 
  for cropping non - <img> or <video> direct children 
  */
  .frame > :global(*) {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 
  for cropping <img> or <video> descendants of .frame
  Note that this allows the option of a <Loader> component to slot into .frame & 
  wrap the <img> for lazyloading 
  */
  .frame :global(img),
  .frame :global(video) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

</style>
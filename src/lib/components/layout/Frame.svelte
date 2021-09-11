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

:global(.frame > *) {
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

/* TODO - keep an eye on this, the original comp. had img as a direct child of <Frame>
but we canged it so that <Loader> could slot into <Frame> instead of wrapping it,
thus preserving the browser's pre-calculated aspect-ratio. Watch to see if
you have any problems with this component elsewhere */
:global(.frame img),
:global(.frame > video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .frame {
  padding-bottom: calc(var(--numerator, 1) / var(--denominator, 1) * 100%);
  position: relative;
}

:global(.frame > *) {
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

:global(.frame > img),
:global(.frame > video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */
</style>
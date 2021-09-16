<script>
  import { setContext, getContext } from 'svelte'
  import { headingLevel } from '$lib/js/constants'
  import { enhanceSection } from '$lib/js/actions'

  /**
   * @type {string}
   * set an optional class name for the top-level element of this component to enable 
   * scoped styling of each component instance from outside (in parent components or pages)
  */
  export let wrapperClass
  let level

  if (typeof getContext(headingLevel) === 'number') {
    level = getContext(headingLevel) + 1
    setContext(headingLevel, level)
  } else {
    level = 1
    setContext(headingLevel, level)
  }

</script>

<article
  use:enhanceSection
  class={wrapperClass}>
  <slot />
</article>
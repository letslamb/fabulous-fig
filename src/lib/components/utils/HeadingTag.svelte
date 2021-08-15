<script>

  import { getContext } from 'svelte'
  import { browser } from '$app/env'

  /**
   * @type {string}
   * set an optional class name for the top-level element of this component to enable 
   * scoped styling of each component instance from outside (in parent components or pages)
  */
  export let wrapperClass
  /**
   * @type {string}
   * the content you want inside the heading tag. Also accepts HTML 
   * (need to sanitize it yourself if applicable)
  */
  export let message

  let id
  let level

  if (getContext('headingLevel')) {
    level = getContext('headingLevel')
    level = Math.min(level, 6)
  } else {
    level = 1
  }

  const render = () => {
    id = `h-${Math.floor((new Date() * Math.random()))}`
    return `
    <h${level} 
      id=${id} 
      ${wrapperClass ? `class=${wrapperClass}` : ''}
    >
      ${message}
    </h${level}>
  `
  }

</script>

<!-- <noscript>
  {@html `
    <h${level} 
      id="h-${Math.floor((new Date() * Math.random()))}"
      ${wrapperClass ? `class=${wrapperClass}` : ''}
    >
      ${message}
    </h${level}>
  `}
</noscript> -->

<!-- {#if browser} -->
  {@html render()}
<!-- {/if} -->

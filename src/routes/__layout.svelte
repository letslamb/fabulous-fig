<script context="module">
  import '../app.css'
  import '@fontsource/work-sans'
  import '@fontsource/work-sans/600.css'
  import Header from '$lib/components/Header.svelte'
  import Sprite from '$lib/components/utils/Sprite.svelte'
  // import Sprite from '/svg/icons.svg'

  // export async function load({ context }) {
  //   return { context: Sprite }
  // }

</script>

<script>
  // import { setContext, getContext } from 'svelte'

  // if (getContext('svgSprite')) {
  //   null
  // } else {
  //   setContext('svgSprite', context.Sprite)
  // }

</script>

<svelte:head>
  <meta name="robots" content="noindex">
</svelte:head>

<Sprite />

<Header />
<main>
  <slot />
</main>

<style>

  :global(body) {
    font-family: 'Work Sans'
  }

</style>
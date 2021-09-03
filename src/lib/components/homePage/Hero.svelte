<script>
  // import Sprite from '/svg/icons.svg'
  // import { getContext } from 'svelte'

  // let sprite

  // if (getContext('svgSprite')) {
  //   console.log(`svg sprite in getContext: ${getContext('svgSprite')}`)
  //   sprite = getContext('svgSprite')
  // } else {
  //   console.log(`we didn't find the sprite, trying async import now`)
  //   sprite = async() => await import('/svg/icons.svg')
  // }

</script>

<section>
  <svg viewBox="0 0 900 1164" xlmns="http://www.w3.org/2000/svg" role="img" aria-label="The Fabulous Fig Logo">
    <use href={`#fabulous-fig-logo`} width="100%" height="100%"></use>
  </svg>
</section>

<style>
  svg {
    display: block;
    margin: 0 auto;
  }
</style>

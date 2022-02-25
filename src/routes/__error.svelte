<script>
  import Image from '$lib/components/layout/Image.svelte'
  import Frame from '$lib/components/layout/Frame.svelte'
  import Box from '$lib/components/layout/Box.svelte'
  import Center from '$lib/components/layout/Center.svelte'

</script>

<main>
  <section aria-labelledby="error-page-label">
    <Center>
      <Box>
        <Frame lazy={true}>
          <Image
            images={[
              { width: 1200, src: "/images/pug-1200.jpg"},
              { width: 800, src: "/images/pug-800.jpg"},
              { width: 400, src: "/images/pug-400.jpg"}]}
            altText={"a cute puppy looking over his shoulder at you"}
          />
        </Frame>
        <Box>  
          <p>Sorry,</p>
          <h1 aria-label="error-page-label">We can't find that page.</h1>
          <p>Try checking the URL to make sure it's correct, or go <a href="/">back to Home</a> </p>
        </Box>
      </Box>
    </Center>
  </section>
</main>


<style>
  section {
    min-height: 100vh;
  }

  p {
    font-size: var(--font-size-biggish);
  }

  h1 {
    font-size: var(--font-size-base);
  }

  main :global(.center) {
    --measure: 32.5ch;
  }

  main :global(.frame) {
    --numerator: 9;
    --denominator: 16;
  }

  main :global(.box) {
    --background-color: var(--color-light);
    --color: var(--color-dark);
    width: 100%;
    min-height: 100vh;
  }

  main :global(.box:nth-of-type(2)) {
    padding: var(--s1) var(--s-3);
    min-height: auto;
    text-align: center;
  }

  main :global(.box:nth-of-type(2) p:nth-of-type(2)) {
    font-size: var(--font-size-base);
  }



</style>
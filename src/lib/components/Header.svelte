<script>

  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Social from '$lib/components/Social.svelte'

</script>

<header>
  <Center>
    <Cluster wrapperClass="header-cluster" wrapperElement="div">
      <Stack wrapperClass="header-social-contact--wrapper-stack">
        <Social />
        <div>Text 267-432-7790 for events and catering needs!</div>
      </Stack>
      <nav>
        <Cluster wrapperElement="ul">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">Catering Menu</a>            
          </li>
        </Cluster>
      </nav>
    </Cluster>
  </Center>
</header>

<style>

  header {
    padding: var(--s3) var(--s-3);
    background: var(--color-dark);
    color: var(--color-white);
  }

  header a {
    color: var(--color-light);
  }

  header :global(.header-cluster) {
    justify-content: space-between;
    width: 100%;
  }

  header :global(.header-social-contact--wrapper-stack) {
    /* margin-top: var(--s0);
    margin-bottom: var(--s0); */
  }
  header div {
    max-width: 22ch;
  }

</style>
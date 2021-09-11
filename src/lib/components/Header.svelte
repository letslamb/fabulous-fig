<script>

  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Social from '$lib/components/Social.svelte'

  export let headerData

  const { phoneNumber, email, message, navLinks } = headerData

</script>

<svelte:options immutable={true} />

<header>
  <Center>
    <Cluster wrapperClass="header-cluster" wrapperElement="div">
      <Stack wrapperClass="header-social-contact--wrapper-stack">
        <Social />
        <Stack wrapperClass="contact-info--stack">
          <div>{phoneNumber}</div>
          <div>{email}</div>
          <div>{message}</div>
        </Stack>
      </Stack>
      <nav>
        <Cluster wrapperElement="ul">
          {#each navLinks as link}
            <li>
              <a sveltekit:prefetch href={link.href}>{link.text}</a>
            </li>
          {/each}
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
    /* color: var(--color-light); */
    text-decoration: none;
    padding: var(--s-3);
    width: fit-content;
    box-shadow: 0 5px #000;
    position: relative;
    display: inline-block;
    background-color: var(--color-light);
    color: var(--color-dark);
    border: 3px solid var(--color-lightish);
  }

  header a:active {
    top: 5px;
  }

  header :global(.header-cluster) {
    justify-content: space-between;
    width: 100%;
  }

  header :global(.contact-info--stack > *) {
    --space: var(--s-2);
  }
  
  header div {
    max-width: 22ch;
  }

</style>
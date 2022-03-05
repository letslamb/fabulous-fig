<script>

  import Cluster from '$lib/components/layout/Cluster.svelte'
  import Switcher from '$lib/components/layout/Switcher.svelte'
  import Center from '$lib/components/layout/Center.svelte'
  import Stack from '$lib/components/layout/Stack.svelte'
  import Social from '$lib/components/Social.svelte'
  import { page } from '$app/stores'

  export let headerData

  const { navLinks, socialIconsData } = headerData
  const { phoneNumber, email, message } = headerData.headerVisibleText

  // $: currentPath = $

  // $: console.log($page.url.pathname)

</script>

<svelte:options immutable={true} />

<header>
  <Center>
    <Switcher wrapperElement="div">
      <div class="social-icons-wrapper">
        <Social {socialIconsData} />
      </div>
      <Stack wrapperClass="contact-info--stack">
        <div>{phoneNumber}</div>
        <div>
          {@html email}
        </div>
        <div>{message}</div>
      </Stack>
    </Switcher>
    <nav>
      <Cluster wrapperElement="ul">
        {#if $page.url.pathname === '/'}
          <span>HOME</span>
        {:else if $page.url.pathname === '/restaurant-medford/'}
          <a sveltekit:prefetch href="/">HOME</a>
          <span>></span>
          <span>RESTAURANT</span>
        {:else if $page.url.pathname === '/menu/restaurant-medford/'}
          <a sveltekit:prefetch href="/">HOME</a>
          <span>></span>
          <a sveltekit:prefetch href="/restaurant-medford/">RESTAURANT</a>
          <span>></span>
          <span>MENU</span>
        {:else if $page.url.pathname === '/food-truck/'}
        <a sveltekit:prefetch href="/">HOME</a>
        <span>></span>
        <span>FOOD TRUCK</span>
        {:else if $page.url.pathname.startsWith('/menu/')}
        <a sveltekit:prefetch href="/">HOME</a>
        <span>></span>
        <a sveltekit:prefetch href="/food-truck/">FOOD TRUCK</a>
        <span>></span>
        <span>{$page.params.slug.replaceAll('-', ' ').toUpperCase()}</span>
        {/if}
      </Cluster>
    </nav>
  </Center>
</header>

<style>

  header {
    padding: var(--s-2) var(--s-3);
    background: var(--color-dark);
    color: var(--color-white);
  }

  header a {
    /* text-decoration: none; */
    color: var(--color-light);
   /* text-decoration: none;
    padding: var(--s-3);
    width: fit-content;
    box-shadow: 0 5px #000;
    position: relative;
    display: inline-block;
    background-color: var(--color-light);
    color: var(--color-dark);
    border: 3px solid var(--color-lightish); */
  }

  header a:active {
    top: 5px;
  }

  header :global(.box) {
    min-width: 1px; /* ****************** */
  }

  header :global(.switcher) {
    --space: var(--s-2);
    width: 100%;
  }

  header :global(.switcher > *) {
    margin: 0 auto;
    max-width: 22ch;
  }

  header :global(.contact-info--stack > *) {
    --space: var(--s-2);
    text-align: center;
  }
  
  header div {
    max-width: 22ch;
  }

  header nav :global(.cluster) {
    --space: var(--s-4);
  }

</style>
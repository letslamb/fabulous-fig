<script>
  import { getContext } from 'svelte'
  import { seo } from '$lib/js/constants'


  let data = getContext(seo)

  const { global } = data
  const [ page ] = data.page

</script>

<svelte:head>
  <title>{page.title}</title>
  <link rel="canonical" href={global.canonical} />
  <meta name="description" content={page.description} />
  <meta property="og:description" content={page.description} />
  <meta property="og:locale" content={global.locale} />
  <meta property="og:site_name" content={global.siteName} />
  <meta property="og:title" content={page.title} />
  <meta property="og:image" content={page.images.facebook.url} />
  <meta property="og:image:width" content={page.images.facebook.width} />
  <meta property="og:image:height" content={page.images.facebook.height} />
  <meta property="og:image:alt" content={page.altText} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={global.canonical} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@letslamb" />
  <meta name="twitter:title" content={global.siteName} />
  <meta name="twitter:description" content={page.description} />
  <meta name="twitter:image" content={page.images.twitter.url} />
  <meta name="twitter:image:alt" content={page.altText} />
</svelte:head>

<script>

  import { page } from '$app/stores'

  export let data

  const { global, currentPage } = data

  let restaurantType, webSiteType, webPageType, jsonld

  restaurantType = {
    "@type": "Restaurant",
    "@id": `${global.siteUrl}#westmont`,
    name: global.siteName,
    logo: {
      "@type": "ImageObject",
      "@id": `${global.siteUrl}#logo`,
      url: global.logo,
    },
    hasMenu: `${global.siteUrl}/menu/catering`,
    telephone: global.phone,
    url: global.siteUrl,
    sameAs: [
      global.instagram,
      global.facebook,
    ],
    email: global.email,
    image: {
      "@id": `${global.siteUrl}#logo`,
    },
    servesCuisine: ["Vegan", "Vegetarian"],
    priceRange: "$",
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "USD",
    acceptsReservations: "No",
    description: global.siteDescription,
  }

  webSiteType = {
    "@type": "WebSite",
    "@id": `${global.siteUrl}#website`,
    name: global.siteName,
    url: global.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${global.siteUrl}?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": `${global.siteUrl}#westmont`,
    },
  }

  webPageType = {
    "@type": "WebPage",
    "@id": `${global.canonical}#webPage`,
    url: global.canonical,
    inLanguage: global.locale,
    name: `${currentPage.title} | ${global.siteName}`,
    image: {
      "@type": "ImageObject",
      "@id": `${global.canonical}#primaryimage`,
      url: currentPage.images.main.url,
    },
    isPartOf: {
      "@id": `${global.siteUrl}#website`,
    },
    primaryImageOfPage: {
      "@id": `${global.canonical}#primaryimage`,
    },
    description: currentPage.description,
    ...($page.path.startsWith("/menu/")) && 
    { 
      breadcrumb: {
        "@id": `${global.canonical}#breadcrumb`
      }
    }
  }


  jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      restaurantType,
      webSiteType,
      webPageType,
      // conditional logic to add breadcrumbs only on pages in /menu/ directory.
      // TODO - need to solve for more robust breadcrumb displays on future projects.
      // Probably means getting all routes in the site & storing it in a context
      // to be referenced in this component for more complicated conditional checks
      ...($page.path.startsWith("/menu/")) 
        && [{
            "@type": "BreadcrumbList",
            "@id": `${global.canonical}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "WebPage",
                  "@id": `${global.siteUrl}/#webPage`,
                  url: global.siteUrl,
                  name: `Home`,
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "WebPage",
                  "@id": `${global.canonical}#webPage`,
                  url: global.canonical,
                  name: currentPage.title,
                },
              },
            ],
          }]
    ]
  })


  console.log(jsonld)


  let jsonldScript = `<script type="application/ld+json">${
    jsonld + "<"
  }/script>`

</script>

<svelte:head>
  <title>{currentPage.title}</title>
  <link rel="canonical" href={global.canonical} />
  <meta name="description" content={currentPage.description} />
  <meta property="og:description" content={currentPage.description} />
  <meta property="og:locale" content={global.locale} />
  <meta property="og:site_name" content={global.siteName} />
  <meta property="og:title" content={currentPage.title} />
  <meta property="og:image" content={currentPage.images.facebook.url} />
  <meta property="og:image:width" content={currentPage.images.facebook.width} />
  <meta property="og:image:height" content={currentPage.images.facebook.height} />
  <meta property="og:image:alt" content={currentPage.altText} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={global.canonical} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@realgoatish" />
  <meta name="twitter:title" content={global.siteName} />
  <meta name="twitter:description" content={currentPage.description} />
  <meta name="twitter:image" content={currentPage.images.twitter.url} />
  <meta name="twitter:image:alt" content={currentPage.altText} />
  {@html jsonldScript}
</svelte:head>

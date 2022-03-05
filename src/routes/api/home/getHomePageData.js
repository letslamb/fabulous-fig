
import { initApi, getPageByType } from '$lib/js/utils'

export async function get(event) {

  let response

  try {
    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getPageByType(api, 'home_page')
      })
      .then(res => {

        // console.log(`response from Prismic in /api/home/getHomePageData.js: ${JSON.stringify(res, null, 2)}`)

        let homePageObject, getSEO, homePageHeroImage, homePageTitle, homePageInstructions, homePageLinks

        try {
          homePageObject = res.results[0].data

          // TODO these properties should probably be named differently (.title & .instructions)

          homePageTitle = homePageObject.title[0]
            ? homePageObject.title[0].text 
            : null

          homePageInstructions = homePageObject.instructions[0]
            ? homePageObject.instructions[0].text 
            : null

          homePageHeroImage = homePageObject.hero_image.desktop.dimensions 
          ? [
              { width: homePageObject.hero_image.desktop.dimensions.width, src: homePageObject.hero_image.desktop.url },
              { width: homePageObject.hero_image.tablet.dimensions.width, src: homePageObject.hero_image.tablet.url },
              { width: homePageObject.hero_image.mobile.dimensions.width, src: homePageObject.hero_image.mobile.url }
            ] 
          : null

          let linkSlice = homePageObject.body
            .filter(slice => slice.slice_type === "links")[0]

          homePageLinks = linkSlice.items.map(item => {
            if (item.nav_link.type === "restaurant_page") {
              return {
                href: event.locals.DOM.Link.url(item.nav_link, event.locals.ctx.linkResolver), 
                text: 'Medford'
              }
            } else if (item.nav_link.link_type === "food_truck_page") {
              return {
                href: event.locals.DOM.Link.url(item.nav_link, event.locals.ctx.linkResolver), 
                text: `Food Truck`
              }
            } 
          })

          console.log(`homePageLinks in getHomePageData.js: ${JSON.stringify(homePageLinks, null, 2)}`)

          getSEO = homePageObject.body
            .filter(section => section.slice_type === "seo")
            .map(section => {
              return {
                title: section.primary.title[0]
                  ? section.primary.title[0].text
                  : null,
                description: section.primary.description[0]
                  ? section.primary.description[0].text
                  : null,
                altText: section.primary.image.alt,
                images: section.primary.image.dimensions 
                  ? {
                      main: {
                        url: section.primary.image.url
                      },
                      facebook: {
                        width: section.primary.image.facebook.dimensions.width,
                        height: section.primary.image.facebook.dimensions.height,
                        url: section.primary.image.facebook.url
                      },
                      twitter: {
                        width: section.primary.image.twitter.dimensions.width,
                        height: section.primary.image.twitter.dimensions.height,
                        url: section.primary.image.twitter.url
                      }
                    } 
                  : null
              }
            })

          const [seo] = getSEO

          const data = { 
            seo,
            homePageTitle,
            homePageInstructions,
            homePageHeroImage,
            homePageLinks
          }

          return data

        } catch (e) {
          return {
            customErrorMessage: "Failed during processing of homePage data in /api/home/getHomePageData.js after Prismic API call"
          }
        }
      })

  } catch (e) {
      response = {
        customErrorMessage: `Failed during Prismic API call in /api/home/getHomePageData.js`
      }
  }

  if (response.customErrorMessage) {
    return {
      status: 502,
      body: response
    }
  }

  return {
    status: 200,
    body: response
  }
}
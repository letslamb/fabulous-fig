
import { initApi, getPageByType } from '$lib/js/utils'

export async function get(event) {

  let response

  try {
    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getPageByType(api, 'food_truck_page')
      })
      .then(res => {

        let homePageObject, getSEO, title, description, placeholderMessage

        try {
          homePageObject = res.results[0].data

          title = homePageObject.page_title[0].text

          description = homePageObject.page_description[0].text

          placeholderMessage = homePageObject.placeholder_message[0].text

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

          return { 
            seo, 
            title,
            description,
            placeholderMessage
          }

        } catch (e) {
          return {
            customErrorMessage: "Failed during processing of Food Truck Page data in /api/departments/food-truck/home/getHomePageData.js after Prismic API call"
          }
        }
      })

  } catch (e) {
      response = {
        customErrorMessage: `Failed during Prismic API call`
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
    headers: {
      'Cache-Control': 's-max-age=3600, stale-while-revalidate=3600',

    },
    body: response
  }
}
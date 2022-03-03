
import { initApi, getHomePageData } from '$lib/js/utils'

export async function get(event) {

  let response

  try {
    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getHomePageData(api)
      })
      .then(res => {

        let homePageObject, getSEO, placeholderMessage

        try {
          homePageObject = res.results[0].data

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

          placeholderMessage = homePageObject.body
            .filter(section => section.slice_type === "text_box")
            .map(section => {
              return {
                message: section.primary.text_content[0].text
              }
            })

          const [seo] = getSEO
          const [placeholder] = placeholderMessage

          return { seo, placeholder }

        } catch (e) {
          return {
            customErrorMessage: "Failed during processing of homePage data after Prismic API call"
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
    body: response
  }
}
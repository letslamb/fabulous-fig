import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

const { PRISMIC_API_ENDPOINT } = process.env

function initApi(req) {
  return Prismic.getApi(PRISMIC_API_ENDPOINT, {
    req: req
  })
}

export async function get(event) {

  const result = await initApi(event.request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('document.type', 'homepage')
    ])
  })
    .then(res => {
      if (res.results[0]) {
        let homePageObject = res.results[0].data

        let getSEO = homePageObject.body
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

        let placeholderMessage = homePageObject.body
          .filter(section => section.slice_type === "text_box")
          .map(section => {
            return {
              message: section.primary.text_content[0].text
            }
          })

        const [seo] = getSEO
        const [placeholder] = placeholderMessage

        return { seo, placeholder }

      } else {
        throw new Error("Response from Prismic has no results")
      }
    })

    .catch((error) => {
    console.error(error)
  })

  return {
    status: 200,
    body: result
  }
}
import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

const { PRISMIC_API_ENDPOINT } = process.env

function initApi(req) {
  return Prismic.getApi(PRISMIC_API_ENDPOINT, {
    req: req
  })
}

export async function get({ request, params }) {

  const { slug } = params
  const result = await initApi(request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('my.menu_layout.uid', `${slug}`)
    ])
  })
    .then(res => {
      if (res.results[0]) {

        // TODO: put this code in a module, import & call it in the endpoint

        let menuObject = res.results[0].data

        let data, menuTitle, menuDescription, sections 

        // using all these ternary operators isn't ideal for readability, but for a bunch of the response fields,
        // we need to check that their arrays aren't empty before accessing child objects with dot notation
        // for assignment to variables we'll send to the client. A helper function would be nice, 
        // but we can't pass the (potentially) invalid values into functions without causing errors.

        menuTitle = menuObject.menu_title[0]
          ? menuObject.menu_title[0].text 
          : null

        menuDescription = menuObject.menu_description[0] 
          ? menuObject.menu_description[0].text 
          : null

        
        sections = menuObject.body
          .filter(section => section.slice_type === "menu_section")
          .map(section => {
            return {
              title: section.primary.menu_section_title[0] 
                ? section.primary.menu_section_title[0].text 
                : null,
              description: section.primary.menu_section_description[0] 
                ? section.primary.menu_section_description[0].text 
                : null,
              items: section.items.map(item => {
                return {
                  name: item.name[0] 
                    ? item.name[0].text 
                    : null,
                  price: item.price,
                  description: item.description[0] 
                    ? item.description[0].text 
                    : null,
                  glutenFree: item.gluten_free,
                  soyFree: item.soy_free,
                  nutFree: item.nut_free,
                  altText: item.image.alt
                    ? item.image.alt
                    : null,
                  images: item.image.desktop.dimensions 
                    ? [
                        { width: item.image.desktop.dimensions.width, src: item.image.desktop.url },
                        { width: item.image.tablet.dimensions.width, src: item.image.tablet.url },
                        { width: item.image.mobile.dimensions.width, src: item.image.mobile.url }
                      ] 
                    : null
                }
              })
            } 
          })

        let getSEO = menuObject.body
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
                    facebook: {
                      width: section.primary.image.dimensions.width,
                      height: section.primary.image.dimensions.height,
                      url: section.primary.image.url
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
        
        data = {
          menuTitle,
          menuDescription,
          sections,
          seo
        }

        return data

      } else {
        throw new Error("Response from Prismic has no results")
      }
    }).catch((error) => {
      console.error(error)
    })

  return {
    status: 200,
    body: result
  }
}


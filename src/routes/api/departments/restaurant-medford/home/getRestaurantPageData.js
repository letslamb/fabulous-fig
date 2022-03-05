
import { initApi, getPageByType } from '$lib/js/utils'

export async function get(event) {

  let response

  try {
    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getPageByType(api, 'restaurant_page')
      })
      .then(res => {

        let restaurantPageObject, getSEO, restaurantPageTitle, restaurantPageDescription, restaurantHours, restaurantLocation, restaurantPageLinks

        try {

          restaurantPageObject = res.results[0].data

          restaurantPageTitle = restaurantPageObject.restaurant_page_title[0]
            ? restaurantPageObject.restaurant_page_title[0].text 
            : null

          restaurantPageDescription = restaurantPageObject.restaurant_page_description[0]
            ? restaurantPageObject.restaurant_page_description[0].text 
            : null

          restaurantHours = restaurantPageObject.body
            .filter(slice => slice.primary.section_type === 'hours')
            .map(slice => {
              return {
                title: slice.primary.section_title,
                text: slice.items          
                  .reduce((result, current) => {
                    if (current.text) {
                      result.push(...current.text)
                    }
                    return result
                  }, [])
                  .reduce((result, current) => {
                    if (current.text) {
                      result.push(current.text)
                    }
                    return result
                  }, [])
              }
            })

            restaurantLocation = restaurantPageObject.body
              .filter(slice => slice.primary.section_type === 'location')
              .map(slice => {
                return {
                  title: slice.primary.section_title,
                  text: slice.items          
                    .reduce((result, current) => {
                      if (current.text) {
                        result.push(...current.text)
                      }
                      return result
                    }, [])
                    .reduce((result, current) => {
                      if (current.text) {
                        result.push(current.text)
                      }
                      return result
                    }, [])
                }
              })

          let linkSlice = restaurantPageObject.body
            .filter(slice => slice.slice_type === 'links')[0]

          restaurantPageLinks = linkSlice.items.map(item => {
            if (item.nav_link.type === 'menu_layout') {
              return {
                href: event.locals.DOM.Link.url(item.nav_link, event.locals.ctx.linkResolver), 
                text: 'View Menu'
              }
            } else if (item.nav_link.link_type === 'Web') {
              return {
                external: true,
                href: item.nav_link.url,
                text: "Order Online"
              }
            } 
          })

          getSEO = restaurantPageObject.body
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
          const [hours] = restaurantHours
          const [location] = restaurantLocation

          const data = { 
            seo,
            restaurantPageTitle,
            restaurantPageDescription,
            hours,
            location,
            restaurantPageLinks
          }

          return data

        } catch (e) {
          return {
            customErrorMessage: "Failed during processing of homePage data in /api/departments/restaurant-medford/home/getRestaurantPageData.js after Prismic API call"
          }
        }
      })

  } catch (e) {
      response = {
        customErrorMessage: `Failed during Prismic API call in /api/departments/restaurant-medford/home/getRestaurantPageData.js`
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
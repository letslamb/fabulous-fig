import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()
import { capitalizeEachLetter } from '$lib/js/utils'

const { PRISMIC_API_ENDPOINT } = process.env

function initApi(req) {
  return Prismic.getApi(PRISMIC_API_ENDPOINT, {
    req: req
  })
}

export async function get(event) {

  const result = await initApi(event.request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('my.global_content.uid', 'global-layout')
    ])
  })
    .then(res => {
      if (res.results[0]) {


        let facebookUrl, instagramUrl, phoneNumber, email, message, navLinks

        let body = res.results[0].data.body

        facebookUrl = body
          .filter(slice => slice.slice_label === "facebook")[0]
          .primary
          .text_content[0]
          .text

        instagramUrl = body
          .filter(slice => slice.slice_label === "instagram")[0]
          .primary
          .text_content[0]
          .text

        phoneNumber = body
          .filter(slice => slice.slice_label === "phone_number")[0]
          .primary
          .text_content[0]
          .text

        email = body
          .filter(slice => slice.slice_label === "email")[0]
          .primary
          .text_content[0]
          .text

        message = body
          .filter(slice => slice.slice_label === "message")[0]
          .primary
          .text_content[0]
          .text

        let getSEO = body
          .filter(slice => slice.slice_type === "seo")
          .map(slice => {
            return {
              title: slice.primary.title[0]
                ? slice.primary.title[0].text
                : null,
              description: slice.primary.description[0]
                ? slice.primary.description[0].text
                : null,
              altText: slice.primary.image.alt,
              image: slice.primary.image.dimensions 
                ? {
                    logo: {
                      width: slice.primary.image.dimensions.width,
                      height: slice.primary.image.dimensions.height,
                      url: slice.primary.image.url
                    }
                  } 
                : null,
              facebookUrl,
              instagramUrl,
              phoneNumber,
              email
            }
          })
  
          const [seo] = getSEO

        let linkSlice = body
          .filter(slice => slice.slice_type === "links")[0]
        
        navLinks = linkSlice.items.map(item => {
          if (item.nav_link.type === "homepage") {
            return { href: '/', text: 'Home'}
          } else if (item.nav_link.type === "menu_layout") {
            return { href: `/menu/${item.nav_link.uid}`, text: `${capitalizeEachLetter(item.nav_link.uid)} Menu`}
          }
        })

        return {
          seo,
          socialIconsData: [
            {
              id: '#icon-phone',
              label: 'Call the Fabulous Fig (opens your native phone app)',
              link: `tel:+1-${phoneNumber}`
            },
            {
              id: '#icon-email',
              label: 'Click to Email The Fabulous Fig (opens your native mail app)',
              link: `mailto: ${email}`
            },
            {
              id: '#icon-facebook',
              label: 'Visit The Fabulous Fig on Facebook (opens a new window)',
              link: facebookUrl
            },
            {
              id: '#icon-instagram',
              label: 'Visit The Fabulous Fig on Instagram (opens a new window)',
              link: instagramUrl
            }
          ],
          headerVisibleText: {
            phoneNumber,
            email: email
              .split('@')
              .join('<br>@'),
            message,

          },
          navLinks
        }

      }
    })

  return {
    status: 200,
    body: result
  }
}
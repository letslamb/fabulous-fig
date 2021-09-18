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

export async function get({ request }) {

  const result = await initApi(request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('my.global_content.uid', 'global-layout')
    ])
  })
    .then(res => {
      if (res.results[0]) {

        let phoneNumber, email, message, navLinks

        let body = res.results[0].data.body

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
          .split('@')
          .join('<br>@')

        message = body
          .filter(slice => slice.slice_label === "message")[0]
          .primary
          .text_content[0]
          .text

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
          phoneNumber,
          email,
          message,
          navLinks
        }

      }
    })

  return {
    status: 200,
    body: result
  }
}
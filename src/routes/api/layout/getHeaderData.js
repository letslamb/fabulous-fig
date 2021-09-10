import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

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
  // .then(res => res)
    .then(res => {
      if (res.results[0]) {
        let phoneNumber, email, message

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

        message = body
          .filter(slice => slice.slice_label === "message")[0]
          .primary
          .text_content[0]
          .text

        return {
          phoneNumber,
          email,
          message
        }

      }
    })

  return {
    status: 200,
    body: result
  }
}
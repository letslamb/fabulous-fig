import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

const { PRISMIC_API_ENDPOINT } = process.env

function initApi(req) {
  return Prismic.getApi(PRISMIC_API_ENDPOINT, {
    req: req
  })
}

export async function get(request) {

  const result = await initApi(request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('document.type', 'menu_layout'),
      Prismic.Predicates.not('my.menu_layout.uid', 'master-list')
    ])
  })
  .then(res => res)
  .catch((error) => {
    console.log(error)
    return {
      status: 401,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        message: "Unable to get all messages"
      }
    }
  })

  return {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: result
  }
}
import Prismic from '@prismicio/client'
import dotenv from 'dotenv'
dotenv.config()

const { PRISMIC_API_ENDPOINT, MENUS_PATH } = process.env

function initApi(req) {
  return Prismic.getApi(PRISMIC_API_ENDPOINT, {
    req: req
  })
}

export async function post(event) {

  const result = await initApi(event.request).then(function(api) {
    return api.query([
      Prismic.Predicates.at('document.tags', [`${event.request.body.tag}`])
    ])
  })
    .then(res => res)
    .catch((error) => {
      return {
        status: 401,
        headers: {
          'content-type': 'application/json'
        },
        body: {
          message: "This event has no menu"
        }
      }
    })

    let link

    // console.log(JSON.stringify(result, null, 2))

    if (result?.results && Array.isArray(result.results) && result.results[0]) {
      link = `${MENUS_PATH}${result.results[0].uid}`
    } else {
      link = null
    }

    // console.log(JSON.stringify(link, null, 2))

  return {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: {
      link
    }
  }
}


import dotenv from 'dotenv'
dotenv.config()

const { MENUS_PATH } = process.env

import { initApi, getMenuByTag } from '$lib/js/utils'

export async function post(event) {

  let response

  try {

    let body = await event.request.json()

    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getMenuByTag(api, body.tag)
    })
      .then(res => {

        let link

        if (res?.results && Array.isArray(res.results) && res.results[0]) {
          link = `${MENUS_PATH}${res.results[0].uid}/`
        } else {
          link = null
        }

        return {
          link: link
        }

      })
  } catch (e) {
    response = {
      customErrorMessage: "Failed during Prismic API call in getMenuByTag.js"
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
      'content-type': 'application/json'
    },
    body: response
  }
}


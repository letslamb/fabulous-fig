
import { initApi, getAllPublicMenus } from '$lib/js/utils'


export async function get(event) {

  let response

  try {
    response = await initApi(event.request, event.locals.ctx.endpoint).then(
      function(api) {
        return getAllPublicMenus(api)
    })
    .then(res => res)

  } catch (e) {
    response = {
      customErrorMessage: "Failed during Prismic API call in getAllMenus.js"
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
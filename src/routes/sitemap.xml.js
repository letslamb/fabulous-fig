import dotenv from 'dotenv'
dotenv.config()

const { BASE_PATH, MENUS_PATH, FOOD_TRUCK_PATH, RESTAURANT_MEDFORD_PATH } = process.env

export async function get() {
  const allMenusData = fetch(`${BASE_PATH}/api/menu/getAllMenus/`)
  const menus = await allMenusData.then(res => res.json())

  // console.log(`menus received from Prismic API in sitemap.xml: ${JSON.stringify(menus, null, 2)}`)


  const headers = {
    'Cache-Control': `max-age=0, s-max-age=${600}`,
    'Content-Type': 'application/xml'
  }

  let getPageImages = ((thing) => {
    let answer = thing
      .reduce((result, current) => {
        // keep images in slices to minimize pain
        // you can change this slice_type check to be 
        // e.g. !== "seo" if needed in the future 
        if (current.slice_type === "menu_section") {
          result.push(...current.items)
        }
        return result
      }, [])
      .reduce((result, current) => {
        if (current.image.url) {
          result.push(current.image.url)
        }
        return result
      }, [])
    return answer
  })

  const render = (menuPages) => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${BASE_PATH}/</loc>
    </url>
    <url>
      <loc>${BASE_PATH}${FOOD_TRUCK_PATH}</loc>
    </url>
    <url>
      <loc>${BASE_PATH}${RESTAURANT_MEDFORD_PATH}</loc>
    </url>
  ${menuPages
    .map(
      page => `
    <url>
      <loc>${BASE_PATH}${MENUS_PATH}${page.uid}/</loc>
      ${getPageImages(page.data.body)
        .map(item => `
      <image:image>
        <image:loc>${item}/</image:loc>
      </image:image>`).join("")}
    </url>`).join("")}
  </urlset>
  `

  return {
    status: 200,
    headers,
    body: render(menus.results)
  }
}

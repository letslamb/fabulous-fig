import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'
import { createClientData } from './_createClientData'

const { privateKey } = JSON.parse(process.env['GOOGLE_PRIVATE_KEY'] || '{ privateKey: null }')
const { GOOGLE_CLIENT_EMAIL, GOOGLE_CALENDAR_ID, BASE_PATH } = process.env

let jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/calendar']
)

jwtClient.authorize(function (err) {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('Successfully connected!')
  }
})

export async function get() {

  let calendar = google.calendar('v3')
  let resp = await calendar.events.list({
    auth: jwtClient,
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString()
  })
    .then(async res => {
      // console.log(`res in getCalendarEvents.js ${JSON.stringify(res, null, 2)}`)

      if (res.data) {
        let entries = createClientData(res.data.items)

        // console.log(`entries (cleaned up calendar events) in getCalendarEvents.js: ${JSON.stringify(entries, null, 2)}`)

        for (let entry of entries) {
          // the fetch base URL needs to be changed to the production URL once this is deployed
          let menu = await fetch(`${BASE_PATH}/api/menu/getMenuByTag`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ tag: `${entry.summary.trim()}` })
          })

          entry.menu = await menu.json()

        }

        return entries

      } else {
        return {
          status: 502,
          body: {
            customMessage: "THE ERROR IS IN getCalendarEvents.js"
          }
        }
        // throw new Error("Response from Google Calendar API has no results")
      }
    })

  return {
    status: 200,
    body: resp
  }
}
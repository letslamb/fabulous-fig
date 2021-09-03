import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'
import { createClientData } from './_createClientData'
import { base } from '$app/paths'

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
    calendarId: GOOGLE_CALENDAR_ID
  })
    .then(async res => {
      if (res.data) {
        let entries = createClientData(res.data.items)

        for (let entry of entries) {
          // the fetch base URL needs to be changed to the production URL once this is deployed
          let menu = await fetch(`${BASE_PATH}/api/menu/getMenuByTag`, {
            method: 'POST',
            // mode: 'cors',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ tag: `${entry.summary.trim()}` })
          })

          entry.menu = await menu.json()

        }

        return entries

      } else {
        throw new Error("Response from Google Calendar API has no results")
      }
    })

  return {
    status: 200,
    body: resp
  }
}
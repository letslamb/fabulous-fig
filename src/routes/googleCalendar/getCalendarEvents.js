import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'

const { privateKey } = JSON.parse(process.env['GOOGLE_PRIVATE_KEY'] || '{ privateKey: null }')
const { GOOGLE_CLIENT_EMAIL, GOOGLE_CALENDAR_ID } = process.env

let jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/calendar']
)

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('Successfully connected!')
    console.log(privateKey)
  }
})

export async function get() {

  let calendar = google.calendar('v3')
  let resp = await calendar.events.list({
    auth: jwtClient,
    // calendarId: process.env['CALENDAR_ID']
    calendarId: GOOGLE_CALENDAR_ID
  }).then(res => {
    if (res.data) {
      return res.data.items
    } else {
      console.log(res)
    }
  })

  return {
    status: 200,
    body: resp
  }
}
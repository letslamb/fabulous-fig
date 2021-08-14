import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'


let jwtClient = new google.auth.JWT(
  process.env['PK_CLIENT_EMAIL'],
  null,
  process.env['PK'],
  ['https://www.googleapis.com/auth/calendar']
)

jwtClient.authorize(function (err, tokens) {
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
    calendarId: process.env['CALENDAR_ID']
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
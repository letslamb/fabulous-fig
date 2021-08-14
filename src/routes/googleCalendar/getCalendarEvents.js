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
  }
})

export async function get() {

  let calendar = google.calendar('v3')
  let resp = await calendar.events.list({
    auth: jwtClient,
    calendarId: GOOGLE_CALENDAR_ID
  }).then(res => {
    if (res.data) {
      let clientCalendarEntryData =
        res.data.items.map((calendarEntry) => {

          // Process the event date, start & end times into the human-friendly formats we want
          let date = new Date(
            Date.parse(calendarEntry.start.dateTime)
          )
          .toLocaleString()
          .split(',')[0]

          let startTime = new Date(
            Date.parse(calendarEntry.start.dateTime)
          ).toLocaleString()
          .split(',')[1]
          .replace(':00', '')


          let endTime = new Date(
            Date.parse(calendarEntry.end.dateTime)
          ).toLocaleString()
          .split(',')[1]
          .replace(':00', '')

          // return only the event data that's needed on the client
          data = {
            summary: calendarEntry.summary,
            date: date,
            startTime: startTime,
            endTime: endTime,
            description: calendarEntry.description
          }

          return data

        })

      return clientCalendarEntryData
    } else {
      console.log(res)
    }
  })

  return {
    status: 200,
    body: resp
  }
}
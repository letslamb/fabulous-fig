// import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'

// dayjs.extend(utc)
// dayjs.extend(timezone)

export function createClientData(googleCalendarItems) {

  // Extract the needed info from the response to be sent to the client
  let clientCalendarEntryData = googleCalendarItems.map((calendarEntry) => {

    console.log(`event received from Google Calendar: ${JSON.stringify(calendarEntry, null, 2)}`)

    // For converting days of week from Google API response's abbreviations to their full names
    let dayOfWeekMap = {
      Mon: 'Monday',
      Tue: 'Tuesday',
      Wed: 'Wednesday',
      Thu: 'Thursday',
      Fri: 'Friday',
      Sat: 'Saturday',
      Sun: 'Sunday'
    }

    let dayOfWeek, date, startTime, endTime, googleMapsLink, data

    // Generate the Google Maps Link if the Location section was filled out by the event creator
    googleMapsLink = calendarEntry.location 
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(calendarEntry.location)}` 
      : null

    // Process the event date, start & end times into the human-friendly formats we want
    if (calendarEntry.start.dateTime) {

      // console.log(`date received from Google Calendar: ${calendarEntry.start.dateTime}`)

      let parsedStartDate = new Date(
        Date.parse(calendarEntry.start.dateTime)
      )

      // dayjs.tz.setDefault(calendarEntry.start.dateTime)

      // console.log(`parsedStartDate: new Date(Date.parse(calendarEntry.start.dateTime)): ${parsedStartDate}`)
      // console.log(`dayjs parsed date: ${dayjs(calendarEntry.start.dateTime)}`)
      // console.log(`dayjs parsed in timezone: ${dayjs(calendarEntry.start.dateTime).tz(calendarEntry.start.timeZone)}`)



      let dayAbbreviation = parsedStartDate
        .toDateString()
        .split(' ')[0]

      // console.log(`dayAbbreviation: ${dayAbbreviation}`)


      dayOfWeek = dayOfWeekMap[dayAbbreviation]

      date = parsedStartDate

        .toDateString()
        .split(' ')
        .slice(1)
        .join(' ')

      // console.log(`parsedStartDate: ${parsedStartDate}`)


      startTime = parsedStartDate
        .toLocaleString('en-US', { timeZone: calendarEntry.start.timeZone })
        .split(', ')[1]
        .replace(':00', '')

      // console.log(`startTime: ${startTime}`)


      endTime = new Date(
        Date.parse(calendarEntry.end.dateTime)
      )
        .toLocaleString('en-US', { timeZone: calendarEntry.end.timeZone })
        .split(', ')[1]
        .replace(':00', '')

      // console.log(`endTime: ${endTime}`)
      

      // Handle all-day events, which need to be parsed a bit differently
    } else if (calendarEntry.end.date) {

      let parsedEndDate = new Date(
        Date.parse(calendarEntry.end.date)
      )

      let dayAbbreviation = parsedEndDate
        .toDateString()
        .split(' ')[0]

      dayOfWeek = dayOfWeekMap[dayAbbreviation]

      date = parsedEndDate
        .toDateString()
        .split(' ')
        .slice(1)
        .join(' ')

      startTime = null

      endTime = null

    }

    // return only the event data that's needed on the client
    data = {
      summary: calendarEntry.summary,
      googleMapsLink: googleMapsLink,
      dayOfWeek: dayOfWeek,
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: calendarEntry.description
    }

    return data

  })



  clientCalendarEntryData.sort(function(a, b) {
    const date1 = new Date(a.date)
    const date2 = new Date(b.date)

    return date1 - date2
  })

  return clientCalendarEntryData
}
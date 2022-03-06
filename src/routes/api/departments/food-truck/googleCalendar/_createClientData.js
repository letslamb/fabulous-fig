
export function createClientData(googleCalendarItems) {

  // Extract the needed info from the response to be sent to the client
  let clientCalendarEntryData = googleCalendarItems.map((calendarEntry) => {

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

      let parsedStartDate = new Date(
        Date.parse(calendarEntry.start.dateTime)
      )

      let dayAbbreviation = parsedStartDate
        .toDateString()
        .split(' ')[0]

      dayOfWeek = dayOfWeekMap[dayAbbreviation]

      date = parsedStartDate

        .toDateString()
        .split(' ')
        .slice(1)
        .join(' ')

      startTime = parsedStartDate
        .toLocaleString()
        .split(', ')[1]
        .replace(':00', '')

      endTime = new Date(
        Date.parse(calendarEntry.end.dateTime)
      )
        .toLocaleString()
        .split(', ')[1]
        .replace(':00', '')

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
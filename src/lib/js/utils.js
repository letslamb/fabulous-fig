import dotenv from 'dotenv'
import Prismic from '@prismicio/client';
dotenv.config()
import { google } from 'googleapis'
const { privateKey } = JSON.parse(process.env['GOOGLE_PRIVATE_KEY'] || '{ privateKey: null }')
const { GOOGLE_CLIENT_EMAIL, GOOGLE_CALENDAR_ID } = process.env

// capitalize each letter in a multi-word string
export function capitalizeEachLetter(phrase) {
  const words = phrase.split(" ")
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1)
  }).join(" ")
}

// duck typing to check if an object is an Error
export function isError(e){
  return e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message === 'string';
}

// map links coming from Prismic to your site's url paths
export function linkResolver(doc) {
	if (doc.type === 'menu_layout') {
    return '/menu/' + doc.uid + '/'
  }

	return '/';
}

// get only upcoming or in-progress events from Google Calendar API
export async function queryGoogleCalendarApi() {
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

  let calendar = google.calendar('v3')
  let resp = await calendar.events.list({
    auth: jwtClient,
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString()
  })

  return resp
}

// initialize the Prismic API
export function initApi(req, endpoint) {
  return Prismic.getApi(endpoint, {
    req: req
  })
}

// Prismic query for Home Page data
export function getHomePageData(api) {
  return api.query([
    Prismic.Predicates.at('document.type', 'homepage')
  ])
}

// Prismic query for Global Layout data
export function getGlobalData(api) {
  return api.query([
    Prismic.Predicates.at('my.global_content.uid', 'global-layout')
  ])
}

// Prismic query for individual Menu pages - searches by Prismic menu_layout type uid
export function getMenuByUid(api, uid) {
  return api.query([
    Prismic.Predicates.at('my.menu_layout.uid', `${uid}`)
  ])
}

// Prismic query to get all menus except Master List
export function getAllPublicMenus(api) {
  return api.query([
    Prismic.Predicates.at('document.type', 'menu_layout'),
    Prismic.Predicates.not('my.menu_layout.uid', 'master-list')
  ])
}

// Prismic query to get a menu by tag (for matching menus to their Google Calendar events)
export function getMenuByTag(api, tag) {
  return api.query([
    Prismic.Predicates.at('document.tags', [`${tag}`])
  ])
}
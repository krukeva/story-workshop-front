import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getEventList(query) {
  await fakeNetwork()

  try {
    let events = await localforage.getItem("events")
    if (!events) {
      events = []
    }
    if (query) {
      events = matchSorter(events, query, {
        keys: ["name", "keywords"],
      })
    }
    return events.sort(sortBy("date"))
  } catch (error) {
    throw error
  }
}

export async function createEvent(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let event = { id, ...itemToInsert }
  try {
    let events = await getEventList()
    events.unshift(event)
    await set(events)
    return event
  } catch (error) {
    throw error
  }
}

export async function getEvent(id) {
  await fakeNetwork()

  try {
    let events = await getEventList()
    if (!events) return null
    let event = events.find((event) => event.id === id)
    return event ?? null
  } catch (error) {
    throw error
  }
}

export async function updateEvent(id, updates) {
  await fakeNetwork()
  try {
    let events = await getEventList()
    let event = events.find((event) => event.id === id)
    if (!event) throw new Error(`No event found for ${id}`)
    Object.assign(event, updates)
    await set(events)
    return event
  } catch (error) {
    throw error
  }
}

export async function deleteEvent(id) {
  try {
    let events = await getEventList()
    let index = events.findIndex((event) => event.id === id)
    if (index > -1) {
      events.splice(index, 1)
      await set(events)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

function set(events) {
  return localforage.setItem("events", events)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise((res) => {
    setTimeout(res, Math.random() * 500)
  })
}

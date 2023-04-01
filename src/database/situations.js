import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getSituationList(query) {
  await fakeNetwork()

  try {
    let situations = await localforage.getItem("situations")
    if (!situations) {
      situations = []
    }
    if (query) {
      situations = matchSorter(situations, query, {
        keys: ["name", "content"],
      })
    }
    return situations.sort(sortBy("name"))
  } catch (error) {
    throw error
  }
}

export async function createSituation(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let situation = { id, ...itemToInsert }
  try {
    let situations = await getSituationList()
    situations.unshift(situation)
    await set(situations)
    return situation
  } catch (error) {
    throw error
  }
}

export async function getSituation(id) {
  await fakeNetwork()

  try {
    let situations = await getSituationList()
    if (!situations) return null
    let situation = situations.find((situation) => situation.id === id)
    return situation ?? null
  } catch (error) {
    throw error
  }
}

export async function updateSituation(id, updates) {
  await fakeNetwork()
  try {
    let situations = await getSituationList()
    let situation = situations.find((situation) => situation.id === id)
    if (!situation) throw new Error(`No situation found for ${id}`)
    Object.assign(situation, updates)
    await set(situations)
    return situation
  } catch (error) {
    throw error
  }
}

export async function deleteSituation(id) {
  try {
    let situations = await getSituationList()
    let index = situations.findIndex((situation) => situation.id === id)
    if (index > -1) {
      situations.splice(index, 1)
      await set(situations)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function resetSituations(newList) {
  return await set(newList)
}

function set(situations) {
  return localforage.setItem("situations", situations)
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

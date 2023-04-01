import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getSiteList(query) {
  await fakeNetwork()

  try {
    let sites = await localforage.getItem("sites")
    if (!sites) {
      sites = []
    }
    if (query) {
      sites = matchSorter(sites, query, { keys: ["name", "keywords"] })
    }
    return sites.sort(sortBy("name"))
  } catch (error) {
    throw error
  }
}

export async function createSite(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let site = { id, ...itemToInsert }
  try {
    let sites = await getSiteList()
    sites.unshift(site)
    await set(sites)
    return site
  } catch (error) {
    throw error
  }
}

export async function getSite(id) {
  await fakeNetwork()

  try {
    let sites = await getSiteList()
    if (!sites) return null
    let site = sites.find((site) => site.id === id)
    return site ?? null
  } catch (error) {
    throw error
  }
}

export async function updateSite(id, updates) {
  await fakeNetwork()

  try {
    let sites = await getSiteList()
    let site = sites.find((site) => site.id === id)
    if (!site) throw new Error(`No site found for ${id}`)
    Object.assign(site, updates)
    await set(sites)
    return site
  } catch (error) {
    throw error
  }
}

export async function deleteSite(id) {
  try {
    let sites = await await getSiteList()
    let index = sites.findIndex((site) => site.id === id)
    if (index > -1) {
      sites.splice(index, 1)
      await set(sites)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function resetSites(newList) {
  return await set(newList)
}

function set(sites) {
  return localforage.setItem("sites", sites)
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
    setTimeout(res, Math.random() * 800)
  })
}

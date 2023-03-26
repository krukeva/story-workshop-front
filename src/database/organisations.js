import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getOrganisationList(query) {
  await fakeNetwork()

  try {
    let organisations = await localforage.getItem("organisations")
    if (!organisations) {
      organisations = []
    }
    if (query) {
      organisations = matchSorter(organisations, query, {
        keys: ["name", "keywords"],
      })
    }
    return organisations.sort(sortBy("name"))
  } catch (error) {
    throw error
  }
}

export async function createOrganisation(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let organisation = { id, ...itemToInsert }
  try {
    let organisations = await getOrganisationList()
    organisations.unshift(organisation)
    await set(organisations)
    return organisation
  } catch (error) {
    throw error
  }
}

export async function getOrganisation(id) {
  await fakeNetwork()

  try {
    let organisations = await getOrganisationList()
    if (!organisations) return null
    let organisation = organisations.find(
      (organisation) => organisation.id === id
    )
    return organisation ?? null
  } catch (error) {
    throw error
  }
}

export async function updateOrganisation(id, updates) {
  await fakeNetwork()

  try {
    let organisations = await getOrganisationList()
    let organisation = organisations.find(
      (organisation) => organisation.id === id
    )
    if (!organisation) throw new Error(`No organisation found for ${id}`)
    Object.assign(organisation, updates)
    await set(organisations)
    return organisation
  } catch (error) {
    throw error
  }
}

export async function deleteOrganisation(id) {
  try {
    let organisations = await getOrganisationList()
    let index = organisations.findIndex(
      (organisation) => organisation.id === id
    )
    if (index > -1) {
      organisations.splice(index, 1)
      await set(organisations)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

function set(organisations) {
  return localforage.setItem("organisations", organisations)
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

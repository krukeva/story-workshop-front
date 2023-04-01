import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getPeople(query) {
  await fakeNetwork()

  try {
    let people = await localforage.getItem("people")
    if (!people) {
      people = []
    }
    if (query) {
      people = matchSorter(people, query, {
        keys: ["name", "activity", "keywords"],
      })
    }
    return people.sort(sortBy("name"))
  } catch (error) {
    throw error
  }
}

export async function createPerson(newStory) {
  await fakeNetwork()
  let id = Math.random().toString(36).substring(2, 9)
  let person = { id, ...newStory }
  try {
    let people = await getPeople()
    people.unshift(person)
    await set(people)
    return person
  } catch (error) {
    throw error
  }
}

export async function getPerson(id) {
  await fakeNetwork()
  try {
    let people = await getPeople()
    if (!people) return null
    let person = people.find((person) => person.id === id)
    return person ?? null
  } catch (error) {
    throw error
  }
}

export async function updatePerson(id, updates) {
  await fakeNetwork()
  try {
    let people = await getPeople()
    let person = people.find((person) => person.id === id)
    if (!person) throw new Error("No person found for", id)
    Object.assign(person, updates)
    await set(people)
    return person
  } catch (error) {
    throw error
  }
}

export async function deletePerson(id) {
  try {
    let people = await getPeople()
    let index = people.findIndex((person) => person.id === id)
    if (index > -1) {
      people.splice(index, 1)
      await set(people)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function resetPeople(newList) {
  return await set(newList)
}

async function set(people) {
  return await localforage.setItem("people", people)
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

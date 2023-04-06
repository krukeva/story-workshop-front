import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getSequenceList(query) {
  await fakeNetwork()

  try {
    let sequences = await localforage.getItem("sequences")
    if (!sequences) {
      sequences = []
    }
    if (query) {
      sequences = matchSorter(sequences, query, {
        keys: ["name", "keywords"],
      })
    }
    return sequences.sort(sortBy("date"))
  } catch (error) {
    throw error
  }
}

export async function createSequence(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let sequence = { id, ...itemToInsert }
  try {
    let sequences = await getSequenceList()
    sequences.unshift(sequence)
    await set(sequences)
    return sequence
  } catch (error) {
    throw error
  }
}

export async function getSequence(id) {
  await fakeNetwork()

  try {
    let sequences = await getSequenceList()
    if (!sequences) return null
    let sequence = sequences.find((sequence) => sequence.id === id)
    return sequence ?? null
  } catch (error) {
    throw error
  }
}

export async function updateSequence(id, updates) {
  await fakeNetwork()

  try {
    let sequences = await getSequenceList()
    let sequence = sequences.find((sequence) => sequence.id === id)
    if (!sequence) throw new Error(`No sequence found for ${id}`)
    Object.assign(sequence, updates)
    await set(sequences)
    return sequence
  } catch (error) {
    throw error
  }
}

export async function deleteSequence(id) {
  try {
    let sequences = await getSequenceList()
    let index = sequences.findIndex((sequence) => sequence.id === id)
    if (index > -1) {
      sequences.splice(index, 1)
      await set(sequences)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function resetSequences(newList) {
  return await set(newList)
}

function set(sequences) {
  return localforage.setItem("sequences", sequences)
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

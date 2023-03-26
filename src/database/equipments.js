import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getEquipmentList(query) {
  await fakeNetwork()

  try {
    let equipments = await localforage.getItem("equipments")
    if (!equipments) {
      equipments = []
    }
    if (query) {
      equipments = matchSorter(equipments, query, {
        keys: ["name", "keywords"],
      })
    }
    return equipments.sort(sortBy("name"))
  } catch (error) {
    throw error
  }
}

export async function createEquipment(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let equipment = { id, ...itemToInsert }
  try {
    let equipments = await getEquipmentList()
    equipments.unshift(equipment)
    await set(equipments)
    return equipment
  } catch (error) {
    throw error
  }
}

export async function getEquipment(id) {
  await fakeNetwork()

  try {
    let equipments = await getEquipmentList()
    if (!equipments) return null
    let equipment = equipments.find((equipment) => equipment.id === id)
    return equipment ?? null
  } catch (error) {
    throw error
  }
}

export async function updateEquipment(id, updates) {
  await fakeNetwork()

  try {
    let equipments = await getEquipmentList()
    let equipment = equipments.find((equipment) => equipment.id === id)
    if (!equipment) throw new Error(`No equipment found for ${id}`)
    Object.assign(equipment, updates)
    await set(equipments)
    return equipment
  } catch (error) {
    throw error
  }
}

export async function deleteEquipment(id) {
  try {
    let equipments = await getEquipmentList()
    let index = equipments.findIndex((equipment) => equipment.id === id)
    if (index > -1) {
      equipments.splice(index, 1)
      await set(equipments)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

function set(equipments) {
  return localforage.setItem("equipments", equipments)
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

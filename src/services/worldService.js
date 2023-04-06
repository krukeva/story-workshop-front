import format from "date-fns/format"

import * as World from "../database/worlds"
import { writeFile } from "../utils/functions/files"

export const getAllWorlds = async () => {
  try {
    const allEvents = await World.getWorlds()
    return allEvents
  } catch (error) {
    throw error
  }
}

export const getOneWorld = async (id) => {
  try {
    const world = await World.getWorld(id)
    return world
  } catch (error) {
    throw error
  }
}

export const createOneWorld = async (newWorld) => {
  try {
    const worldToInsert = {
      ...newWorld,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
    }
    const createdWorld = await World.createWorld(worldToInsert)
    return createdWorld
  } catch (error) {
    throw error
  }
}

export const deleteOneWorld = async (id) => {
  try {
    await World.deleteWorld(id)
    return true
  } catch (error) {
    throw error
  }
}

// Temp version to avoir erasing the Relations
export const updateOneWorldData = async (id, data) => {
  try {
    const world = await World.getWorld(id)
    const worldData = { ...world.data }
    const newdata = { ...worldData, ...data }
    newdata.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
    const updatedWorld = await World.updateWorldData(id, newdata)
    return updatedWorld
  } catch (error) {
    throw error
  }
}

export const importOneWorld = async (world) => {
  try {
    const result = await World.importWorld(world)
    console.log(
      result
        ? `Le monde ${world.name} a été importé avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

export const importManyWorlds = async (worldList) => {
  try {
    const result = await World.importWorlds(worldList)
    console.log(
      result
        ? `${result} monde(s) a/ont été importé(s) avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

export async function exportAllWorlds() {
  try {
    const worlds = await World.getWorlds()
    const date = format(new Date(), "yyyy-MM-dd")
    writeFile(worlds, `${date}_worldsFromStoryWorkshop`)
  } catch (error) {
    throw error
  }
}

import * as Equipment from "../database/equipments"
import { readStory } from "./currentStoryService.js"

export const getAllEquipments = async (query) => {
  try {
    const all = await Equipment.getEquipmentList(query)
    return all
  } catch (error) {
    throw error
  }
}

export const getOneEquipment = async (id) => {
  try {
    const item = await Equipment.getEquipment(id)
    return item
  } catch (error) {
    throw error
  }
}

export const createOneEquipment = async (itemToCreate) => {
  try {
    const story = await readStory()
    if (!story) {
      throw Error
    }
    const itemToInsert = {
      storyId: story.id,
      ...itemToCreate,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
    }

    const created = await Equipment.createEquipment(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneEquipment = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Equipment.updateEquipment(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneEquipment = async (id) => {
  try {
    await Equipment.deleteEquipment(id)
  } catch (error) {
    throw error
  }
}

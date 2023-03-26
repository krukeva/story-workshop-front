import * as Situation from "../database/situations"
import { readStory } from "./storyService.js"

export const getAllSituations = async (query) => {
  try {
    const all = await Situation.getSituationList(query)
    return all
  } catch (error) {
    throw error
  }
}

export const getOneSituation = async (id) => {
  try {
    const item = await Situation.getSituation(id)
    return item
  } catch (error) {
    throw error
  }
}

export const createOneSituation = async (itemToCreate) => {
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

    const created = await Situation.createSituation(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneSituation = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Situation.updateSituation(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneSituation = async (id) => {
  try {
    await Situation.deleteSituation(id)
  } catch (error) {
    throw error
  }
}

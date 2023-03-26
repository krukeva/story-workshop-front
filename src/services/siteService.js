import * as Site from "../database/sites"
import { readStory } from "./storyService.js"

export const getAllSites = async (query) => {
  try {
    const all = await Site.getSiteList(query)
    return all
  } catch (error) {
    throw error
  }
}

export const getOneSite = async (id) => {
  try {
    const item = await Site.getSite(id)
    return item
  } catch (error) {
    throw error
  }
}

export const createOneSite = async (itemToCreate) => {
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

    const created = await Site.createSite(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneSite = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Site.updateSite(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneSite = async (id) => {
  try {
    await Site.deleteSite(id)
  } catch (error) {
    throw error
  }
}

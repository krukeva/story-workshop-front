import * as Organisation from "../database/organisations.js"
import { readStory } from "./currentStoryService.js"

export const getAllOrganisations = async (query) => {
  try {
    const allOrganisations = await Organisation.getOrganisationList(query)
    return allOrganisations
  } catch (error) {
    throw error
  }
}

export const getOneOrganisation = async (id) => {
  try {
    const organisation = await Organisation.getOrganisation(id)
    return organisation
  } catch (error) {
    throw error
  }
}

export const createOneOrganisation = async (newOrganisation) => {
  try {
    const story = await readStory()
    if (!story) {
      throw Error
    }
    const itemToInsert = {
      storyId: story.id,
      ...newOrganisation,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
    }

    const created = await Organisation.createOrganisation(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneOrganisation = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Organisation.updateOrganisation(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneOrganisation = async (id) => {
  try {
    await Organisation.deleteOrganisation(id)
  } catch (error) {
    throw error
  }
}

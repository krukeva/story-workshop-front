import * as Sequence from "../database/sequences"
import { readStory } from "./currentStoryService.js"

export const getAllSequences = async (query) => {
  try {
    const allSequences = await Sequence.getSequenceList(query)
    return allSequences
  } catch (error) {
    throw error
  }
}

export const getOneSequence = async (id) => {
  try {
    const sequence = await Sequence.getSequence(id)
    return sequence
  } catch (error) {
    throw error
  }
}

export const createOneSequence = async (itemToCreate) => {
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

    const created = await Sequence.createSequence(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneSequence = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Sequence.updateSequence(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneSequence = async (id) => {
  try {
    await Sequence.deleteSequence(id)
  } catch (error) {
    throw error
  }
}

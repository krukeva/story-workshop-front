import * as People from "../database/people.js"
import { readStory } from "./currentStoryService.js"
export const getAllPeople = async (query) => {
  try {
    const allPeople = await People.getPeople(query)
    return allPeople
  } catch (error) {
    throw error
  }
}

export const getOnePerson = async (id) => {
  try {
    const person = await People.getPerson(id)
    return person
  } catch (error) {
    throw error
  }
}

export const createOnePerson = async (newPerson) => {
  try {
    const story = await readStory()
    if (!story) {
      throw Error
    }
    const personToInsert = {
      ...newPerson,
      storyId: story.id,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
    }
    const createdPerson = await People.createPerson(personToInsert)
    return createdPerson
  } catch (error) {
    throw error
  }
}

export const updateOnePerson = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updatedPerson = await People.updatePerson(id, changes)
    return updatedPerson
  } catch (error) {
    throw error
  }
}

export const deleteOnePerson = async (id) => {
  try {
    await People.deletePerson(id)
  } catch (error) {
    throw error
  }
}

import * as Event from "../database/events"
import { readStory } from "./currentStoryService.js"

export const getAllEvents = async (query) => {
  try {
    const allEvents = await Event.getEventList(query)
    return allEvents
  } catch (error) {
    throw error
  }
}

export const getOneEvent = async (id) => {
  try {
    const event = await Event.getEvent(id)
    return event
  } catch (error) {
    throw error
  }
}

export const createOneEvent = async (itemToCreate) => {
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

    const created = await Event.createEvent(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const updateOneEvent = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Event.updateEvent(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneEvent = async (id) => {
  try {
    await Event.deleteEvent(id)
  } catch (error) {
    throw error
  }
}

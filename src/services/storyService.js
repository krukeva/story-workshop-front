import format from "date-fns/format"

import * as Story from "../database/stories"
import { writeFile } from "../utils/functions/files"

export const getAllStories = async () => {
  try {
    const allstories = await Story.getStories()
    return allstories
  } catch (error) {
    throw error
  }
}

export const createOneStory = async (itemToCreate) => {
  try {
    const itemToInsert = {
      ...itemToCreate,
      createdAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("fr-FR", { timeZone: "UTC" }),
    }

    const created = await Story.createStory(itemToInsert)
    return created
  } catch (error) {
    throw error
  }
}

export const getOneStory = async (id) => {
  try {
    const story = await Story.getStory(id)
    return story
  } catch (error) {
    throw error
  }
}

export const updateOneStory = async (id, changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await Story.updateStory(id, changes)
    return updated
  } catch (error) {
    throw error
  }
}

export const deleteOneStory = async (id) => {
  try {
    await Story.deleteStory(id)
    return true
  } catch (error) {
    throw error
  }
}

export const importOneStory = async (story) => {
  try {
    const result = await Story.importStory(story)
    console.log(
      result
        ? `L'histoire ${story.name} a été importée avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

export const importManyStories = async (storyList) => {
  try {
    const result = await Story.importStories(storyList)
    console.log(
      result
        ? `${result} histoire(s) a/ont été importée(s) avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

export async function exportAllStories() {
  try {
    const stories = await Story.getStories()
    const date = format(new Date(), "yyyy-MM-dd")
    writeFile(stories, `${date}_stories`)
  } catch (error) {
    throw error
  }
}

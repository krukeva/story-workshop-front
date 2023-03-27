import { getStory } from "../database/stories"
import {
  setCurrentStory,
  readCurrentStory,
  updateCurrentStory,
} from "../database/currentStory"

//import { getWorld } from "../database/worlds"

export async function loadStory(storyId) {
  const story = await getStory(storyId)
  //const world = await getWorld(story.worldId)

  setCurrentStory(story)
}

export async function readStory() {
  let story = await readCurrentStory()
  return story
}

export const updateStory = async (changes) => {
  changes.updatedAt = new Date().toLocaleString("fr-FR", { timeZone: "UTC" })
  try {
    const updated = await updateCurrentStory(changes)
    return updated
  } catch (error) {
    throw error
  }
}

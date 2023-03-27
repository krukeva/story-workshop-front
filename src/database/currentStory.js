import localforage from "localforage"

export async function readCurrentStory() {
  try {
    let story = await localforage.getItem("story")
    if (!story) {
      story = {}
    }
    return story
  } catch (error) {
    throw error
  }
}

export async function updateCurrentStory(updates) {
  try {
    let story = await readCurrentStory()
    if (!story) throw new Error("Troubles while updating the current story.")
    Object.assign(story, updates)
    await localforage.setItem("story", story)
    return story
  } catch (error) {
    throw error
  }
}

export async function setCurrentStory(story) {
  try {
    await localforage.setItem("story", story)
  } catch (error) {
    throw error
  }
}

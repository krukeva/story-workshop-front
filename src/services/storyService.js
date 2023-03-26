import localforage from "localforage"

import { getStory } from "../database/stories"

//import { getWorld } from "../database/worlds"

export async function loadStory(storyId) {
  const story = await getStory(storyId)
  //const world = await getWorld(story.worldId)

  localforage.setItem("story", story)
}

export async function readStory(storyId) {
  let story = await localforage.getItem("story")
  if (!story) {
    story = {}
  }
  return story
}

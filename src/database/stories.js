import localforage from "localforage"
import { matchSorter } from "match-sorter"
import sortBy from "sort-by"

export async function getStories(query) {
  await fakeNetwork()

  try {
    let stories = await localforage.getItem("stories")
    if (!stories) {
      stories = []
    }
    if (query) {
      stories = matchSorter(stories, query, {
        keys: ["name", "description", "worldId"],
      })
    }
    return stories.sort(sortBy("worldId"))
  } catch (error) {
    throw error
  }
}

export async function createStory(itemToInsert) {
  await fakeNetwork()

  let id = Math.random().toString(36).substring(2, 9)
  let story = { id, ...itemToInsert }
  try {
    let stories = await getStories()
    stories.unshift(story)
    await set(stories)
    return story
  } catch (error) {
    throw error
  }
}

export async function getStory(id) {
  await fakeNetwork()

  try {
    let stories = await getStories()
    if (!stories) return null
    let story = stories.find((story) => story.id === id)
    return story ?? null
  } catch (error) {
    throw error
  }
}

export async function updateStory(id, updates) {
  await fakeNetwork()
  try {
    let stories = await getStories()
    let story = stories.find((story) => story.id === id)
    if (!story) throw new Error(`No story found for ${id}`)
    Object.assign(story, updates)
    await set(stories)
    return story
  } catch (error) {
    throw error
  }
}

export async function deleteStory(id) {
  try {
    let stories = await getStories()
    let index = stories.findIndex((story) => story.id === id)
    if (index > -1) {
      stories.splice(index, 1)
      await set(stories)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function importStory(story) {
  try {
    let stories = await getStories()
    //Check if the story exists
    let index = stories.findIndex((myStory) => story.id === myStory.id)
    if (index > -1) {
      console.log("Cette histoire existe déjà")
      return false
    } else {
      stories.unshift(story)
    }
    await set(stories)
    return story
  } catch (error) {
    throw error
  }
}

function set(stories) {
  return localforage.setItem("stories", stories)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise((res) => {
    setTimeout(res, Math.random() * 500)
  })
}

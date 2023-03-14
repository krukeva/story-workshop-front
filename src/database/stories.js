import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getStories(query) {
  let stories = await localforage.getItem("stories");
  if (!stories) stories = [];
  if (query) {
    stories = matchSorter(stories, query, { keys: ["name", "description"] });
  }
  return stories.sort(sortBy("worldId"));
}

export async function createStory(worldId) {
  let id = Math.random().toString(36).substring(2, 9);
  let story = {
    id,
    worldId,
    createdAt: Date.now()
  };
  let stories = await getStories();
  stories.unshift(story);
  await set(stories);
  return story;
}

export async function getStory(id) {
  let stories = await localforage.getItem("stories");
  let story = stories.find(story => story.id === id);
  return story ?? null;
}

export async function updateStory(id, updates) {
  let stories = await localforage.getItem("stories");
  let story = stories.find(story => story.id === id);
  if (!story) throw new Error("No story found for", id);
  Object.assign(story, updates);
  await set(stories);
  return story;
}

export async function deleteStory(id) {
  let stories = await localforage.getItem("stories");
  let index = stories.findIndex(story => story.id === id);
  if (index > -1) {
    stories.splice(index, 1);
    await set(stories);
    return true;
  }
  return false;
}

function set(stories) {
  return localforage.setItem("stories", stories);
}
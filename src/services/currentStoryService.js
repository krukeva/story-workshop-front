import { getStory } from "../database/stories"
import { getWorld } from "../database/worlds"
import { resetPeople } from "../database/people"
import { resetOrganisations } from "../database/organisations"
import { resetEquipments } from "../database/equipments"
import { resetEvents } from "../database/events"
import { resetSites } from "../database/sites"
import { resetSituations } from "../database/situations"

import {
  setCurrentStory,
  readCurrentStory,
  updateCurrentStory,
} from "../database/currentStory"

export async function loadStory(storyId) {
  const story = await getStory(storyId)
  const world = await getWorld(story.worldId)

  // Initialise the entities merging from the world and from the story
  let people = []
  let organisations = []
  let equipments = []
  let sites = []

  if (world.data) {
    people = world.data.people || []
    organisations = world.data.organisations || []
    equipments = world.data.equipments || []
    sites = world.data.sites || []
  }

  if (story.people && story.people.length > 0) {
    people.concat(story.people)
  }
  await resetPeople(people)
  delete story.people

  if (story.organisations && story.organisations.length > 0) {
    organisations.concat(story.organisations)
  }
  await resetOrganisations(organisations)
  delete story.organisations

  if (story.equipments && story.equipments.length > 0) {
    equipments.concat(story.equipments)
  }
  await resetEquipments(equipments)
  delete story.equipments

  if (story.sites && story.sites.length > 0) {
    sites.concat(story.sites)
  }
  await resetSites(sites)
  delete story.sites

  // Initialise events from the story
  await resetEvents(story.events)
  delete story.events

  // Initialise situations from the world and the story
  let situations = []
  if (world.hasOwnProperty("situation")) {
    const situation0 = {
      id: "initialSituation",
      name: world.situation.date.concat("-- Situation initiale"),
      diffusionDate: world.situation.date,
      diffusionTime: world.situation.time,
      diffusionDateTime: new Date(
        world.situation.date.concat("T" + world.situation.time)
      ),
      content: world.situation.document,
      createdAt: world.createdAt,
      updatedAt: world.updatedAt || world.createdAt,
    }
    situations.unshift(situation0)
  }
  if (story.situations && story.situations.length > 0) {
    situations = situations.concat(story.situations)
  }
  resetSituations(situations)
  delete story.situations

  return await setCurrentStory(story)
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

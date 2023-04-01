import { updateStory } from "../services/currentStoryService"
import { updateOneStory } from "../services/storyService"
import { updateOneWorldData } from "../services/worldService"

import { getAllPeople } from "../services/personService"
import { getAllOrganisations } from "../services/organisationService"
import { getAllEquipments } from "../services/equipmentService"
import { getAllSites } from "../services/siteService"
import { getAllEvents } from "../services/eventService"
import { getAllSituations } from "../services/situationService"

export async function actionUpdateCurrentStory({ request }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await updateStory(updates)
  return await updateStory(updates)
}

export async function actionSaveCurrentStory({ request }) {
  // update the version of the current story
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const updatedStory = await updateStory(updates)

  // Get all the entities
  const allPeople = await getAllPeople()
  const allOrganisations = await getAllOrganisations()
  const allEquipments = await getAllEquipments()
  const allSites = await getAllSites()
  const allEvents = await getAllEvents()
  const allSituations = await getAllSituations()

  // save the entities which belong the the story
  updatedStory.people = allPeople.filter(
    (item) => item.storyId === updatedStory.id
  )
  updatedStory.organisations = allOrganisations.filter(
    (item) => item.storyId === updatedStory.id
  )
  updatedStory.equipments = allEquipments.filter(
    (item) => item.storyId === updatedStory.id
  )
  updatedStory.sites = allSites.filter(
    (item) => item.storyId === updatedStory.id
  )
  updatedStory.events = allEvents.filter(
    (item) => item.storyId === updatedStory.id
  )
  updatedStory.situations = allSituations.filter(
    (item) => item.storyId === updatedStory.id
  )

  // Save the entities which belong to the world
  const worldData = {}
  worldData.people = allPeople.filter(
    (item) => item.worldId === updatedStory.worldId
  )
  worldData.organisations = allOrganisations.filter(
    (item) => item.worldId === updatedStory.worldId
  )
  worldData.equipments = allEquipments.filter(
    (item) => item.worldId === updatedStory.worldId
  )
  worldData.sites = allSites.filter(
    (item) => item.worldId === updatedStory.worldId
  )
  await updateOneWorldData(updatedStory.worldId, worldData)

  // update the current story in the database and returns
  return await updateOneStory(updatedStory.id, updatedStory)
}

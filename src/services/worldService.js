import * as World from "../database/worlds"

export const getAllWorlds = async () => {
  try {
    const allEvents = await World.getWorlds()
    return allEvents
  } catch (error) {
    throw error
  }
}

export const getOneWorld = async (id) => {
  try {
    const world = await World.getWorld(id)
    return world
  } catch (error) {
    throw error
  }
}

export const deleteOneWorld = async (id) => {
  try {
    await World.deleteWorld(id)
    return true
  } catch (error) {
    throw error
  }
}

export const importOneWorld = async (world) => {
  try {
    const result = await World.importWorld(world)
    console.log(
      result
        ? `Le monde ${world.name} a été importé avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

export const importManyWorlds = async (worldList) => {
  try {
    const result = await World.importWorlds(worldList)
    console.log(
      result
        ? `${result} monde(s) a/ont été importé(s) avec succès.`
        : "Echec de l'import."
    )
    return result
  } catch (error) {
    throw error
  }
}

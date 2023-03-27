import localforage from "localforage"
import sortBy from "sort-by"

export async function getWorlds() {
  try {
    let worlds = await localforage.getItem("worlds")
    if (!worlds) worlds = []
    return worlds.sort(sortBy("createdAt"))
  } catch (error) {
    throw error
  }
}

export async function getWorld(id) {
  try {
    let worlds = await getWorlds()
    let world = worlds.find((world) => world.id === id)
    return world ?? null
  } catch (error) {
    throw error
  }
}

export async function deleteWorld(id) {
  try {
    let worlds = await getWorlds()
    let index = worlds.findIndex((world) => world.id === id)
    if (index > -1) {
      worlds.splice(index, 1)
      await set(worlds)
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function importWorld(world) {
  try {
    let worlds = await getWorlds()

    let index = worlds.findIndex((myWorld) => world.id === myWorld.id)
    if (index > -1) {
      console.log("Ce monde est déjà présent dans la base.")
      return false
    } else {
      worlds.unshift(world)
    }
    await set(worlds)
    return true
  } catch (error) {
    throw error
  }
}

export async function importWorlds(worldList) {
  try {
    let worlds = await getWorlds()

    let numberOfImportedWorlds = 0
    for (let i = 0; i < worldList.length; i++) {
      let index = worlds.findIndex((myWorld) => worldList[i].id === myWorld.id)
      if (index > -1) {
        console.log(
          `Le monde ${worldList[i].name} est déjà présent dans la base.`
        )
      } else {
        worlds.unshift(worldList[i])
        numberOfImportedWorlds++
      }
    }
    await set(worlds)
    return numberOfImportedWorlds
  } catch (error) {
    throw error
  }
}

function set(worlds) {
  return localforage.setItem("worlds", worlds)
}

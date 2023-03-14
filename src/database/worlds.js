import localforage from "localforage";
import sortBy from "sort-by";

export async function getWorlds() {
  let worlds = await localforage.getItem("worlds");
  if (!worlds) worlds = [];
  return worlds.sort(sortBy("createdAt"));
}

export async function importWorlds(worldList) {
  let worlds = await getWorlds();
  for (let i=0; i<worldList.length; i++) {
    let index = worlds.findIndex(myWorld => worldList[i].id === myWorld.id);
    if (index > -1) {
      console.log("Ce monde existe déjà")
    } else {
      worlds.unshift(worldList[i]);
    }
  }
  await set(worlds);
  return true;
}

export async function getWorld(id) {
  let worlds = await getWorlds();
  let world = worlds.find(world => world.id === id);
  return world ?? null;
}

export async function deleteWorld(id) {
  let worlds = await getWorlds();
  let index = worlds.findIndex(world => world.id === id);
  if (index > -1) {
    worlds.splice(index, 1);
    await set(worlds);
    return true;
  }
  return false;
}

function set(worlds) {
  return localforage.setItem("worlds", worlds);
}
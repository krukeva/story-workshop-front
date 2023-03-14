import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getEquipmentList( storyId, query ) {
  let equipments = await localforage.getItem("equipments");
  if (!equipments) {
    equipments = [];
  } else if (storyId) {
    equipments = equipments.filter( equipment => equipment.storyId === storyId )
  }
  if (query) {
    equipments = matchSorter(equipments, query, { keys: ["name"] });
  }
  return equipments.sort(sortBy("name"));
}

export async function createEquipment(storyId) {
  let id = Math.random().toString(36).substring(2, 9);
  let equipment = { id, storyId, createdAt: Date.now() };
  let equipments = await getEquipmentList();
  equipments.unshift(equipment);
  await set(equipments);
  return equipment;
}

export async function getEquipment(id) {
  let equipments = await localforage.getItem("equipments");
  if (!equipments) return null;
  let equipment = equipments.find(equipment => equipment.id === id);
  return equipment ?? null;
}

export async function updateEquipment(id, updates) {
  let equipments = await localforage.getItem("equipments");
  let equipment = equipments.find(equipment => equipment.id === id);
  if (!equipment) throw new Error("No world equipment found for", id);
  Object.assign(equipment, updates);
  await set(equipments);
  return equipment;
}

export async function deleteEquipment(id) {
  let equipments = await localforage.getItem("equipments");
  let index = equipments.findIndex(equipment => equipment.id === id);
  if (index > -1) {
    equipments.splice(index, 1);
    await set(equipments);
    return true;
  }
  return false;
}

function set(equipments) {
  return localforage.setItem("equipments", equipments);
}

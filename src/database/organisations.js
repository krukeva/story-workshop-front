import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getOrganisationList( storyId, query ) {
  let organisations = await localforage.getItem("organisations");
  if (!organisations) {
    organisations = [];
  } else if (storyId) {
    organisations = organisations.filter( organisation => organisation.storyId === storyId )
  }
  if (query) {
    organisations = matchSorter(organisations, query, { keys: ["name"] });
  }
  return organisations.sort(sortBy("name"));
}

export async function createOrganisation(storyId) {
  let id = Math.random().toString(36).substring(2, 9);
  let organisation = { id, storyId, createdAt: Date.now() };
  let organisations = await getOrganisationList();
  organisations.unshift(organisation);
  await set(organisations);
  return organisation;
}

export async function getOrganisation(id) {
  let organisations = await localforage.getItem("organisations");
  if (!organisations) return null;
  let organisation = organisations.find(organisation => organisation.id === id);
  return organisation ?? null;
}

export async function updateOrganisation(id, updates) {
  let organisations = await localforage.getItem("organisations");
  let organisation = organisations.find(organisation => organisation.id === id);
  if (!organisation) throw new Error("No world organisation found for", id);
  Object.assign(organisation, updates);
  await set(organisations);
  return organisation;
}

export async function deleteOrganisation(id) {
  let organisations = await localforage.getItem("organisations");
  let index = organisations.findIndex(organisation => organisation.id === id);
  if (index > -1) {
    organisations.splice(index, 1);
    await set(organisations);
    return true;
  }
  return false;
}

function set(organisations) {
  return localforage.setItem("organisations", organisations);
}

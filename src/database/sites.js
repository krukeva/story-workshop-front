import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getSiteList( storyId, query ) {
  let sites = await localforage.getItem("sites");
  if (!sites) {
    sites = [];
  } else if (storyId) {
    sites = sites.filter( site => site.storyId === storyId )
  }
  if (query) {
    sites = matchSorter(sites, query, { keys: ["name"] });
  }
  return sites.sort(sortBy("name"));
}

export async function createSite(storyId) {
  let id = Math.random().toString(36).substring(2, 9);
  let site = { id, storyId, createdAt: Date.now() };
  let sites = await getSiteList();
  sites.unshift(site);
  await set(sites);
  return site;
}

export async function getSite(id) {
  let sites = await localforage.getItem("sites");
  if (!sites) return null;
  let site = sites.find(site => site.id === id);
  return site ?? null;
}

export async function updateSite(id, updates) {
  let sites = await localforage.getItem("sites");
  let site = sites.find(site => site.id === id);
  if (!site) throw new Error("No world site found for", id);
  Object.assign(site, updates);
  await set(sites);
  return site;
}

export async function deleteSite(id) {
  let sites = await localforage.getItem("sites");
  let index = sites.findIndex(site => site.id === id);
  if (index > -1) {
    sites.splice(index, 1);
    await set(sites);
    return true;
  }
  return false;
}

function set(sites) {
  return localforage.setItem("sites", sites);
}

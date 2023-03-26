import { redirect } from "react-router-dom"

import * as Site from "../services/siteService"

export async function actionCreateSite() {
  try {
    const site = await Site.createOneSite()
    return redirect(`/story/sites/${site.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateSite({ params, request }) {
  const { siteId } = params
  const formData = await request.formData()
  try {
    const updates = Object.fromEntries(formData)
    if (typeof updates.keywords !== "undefined") {
      if (updates.keywords.length > 0) {
        updates.keywords = updates.keywords.split("|")
      } else {
        updates.keywords = []
      }
    }
    const updated = await Site.updateOneSite(siteId, updates)
    return redirect(`/story/sites/${updated.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateSiteWithoutMutation({ request, params }) {
  const { siteId } = params
  let formData = await request.formData()
  return Site.updateOneSite(siteId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteSite({ params }) {
  try {
    await Site.deleteOneSite(params.siteId)
    return redirect("/story/sites")
  } catch (error) {
    throw error
  }
}

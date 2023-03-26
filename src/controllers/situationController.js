import { redirect } from "react-router-dom"

import * as Situation from "../services/situationService"

export async function actionCreateSituation() {
  try {
    const situation = await Situation.createOneSituation()
    return redirect(`/story/situations/${situation.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateSituation({ params, request }) {
  const { situationId } = params
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
    const updated = await Situation.updateOneSituation(situationId, updates)
    return redirect(`/story/situations/${updated.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateSituationWithoutMutation({
  request,
  params,
}) {
  const { situationId } = params
  let formData = await request.formData()
  return Situation.updateOneSituation(situationId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteSituation({ params }) {
  try {
    await Situation.deleteOneSituation(params.situationId)
    return redirect("/story/situations")
  } catch (error) {
    throw error
  }
}

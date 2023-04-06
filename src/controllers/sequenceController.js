import { redirect } from "react-router-dom"

import * as Sequence from "../services/sequenceService"

export async function actionCreateSequence() {
  try {
    const sequence = await Sequence.createOneSequence()
    return redirect(`/story/sequences/${sequence.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateSequence({ params, request }) {
  const { sequenceId } = params
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
    const updated = await Sequence.updateOneSequence(sequenceId, updates)
    return redirect(`/story/sequences/${updated.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateSequenceWithoutMutation({ request, params }) {
  const { sequenceId } = params
  let formData = await request.formData()
  return Sequence.updateOneSequence(sequenceId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteSequence({ params }) {
  try {
    await Sequence.deleteOneSequence(params.sequenceId)
    return redirect("/story/sequences")
  } catch (error) {
    throw error
  }
}

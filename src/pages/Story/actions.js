import { redirect } from "react-router-dom"

import { createStory, updateStory, deleteStory } from "../../database/stories"

export async function actionCreateStory() {
  const newStory = await createStory()
  return redirect(`/stories/${newStory.id}`)
}

export async function actionUpdateStory({ params, request }) {
  const { storyId } = params
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  updates.keywords=updates.keywords.split("|")
  const updatedStory = await updateStory(storyId, updates)
  return redirect(`/stories/${updatedStory.id}`)
}

export async function actionDeleteStory({ params }) {
  const res = await deleteStory(params.storyId)
  return res && redirect(`/stories`)
}
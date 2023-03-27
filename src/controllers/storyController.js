import { redirect } from "react-router-dom"
import { writeFile } from "../utils/functions/files"

import * as Story from "../services/storyService"

export async function actionCreateStory() {
  const newStory = await Story.createOneStory()
  return redirect(`/stories/${newStory.id}`)
}

export async function actionUpdateStory({ params, request }) {
  const { storyId } = params
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  updates.keywords = updates.keywords.split("|")
  const updatedStory = await Story.updateOneStory(storyId, updates)
  return redirect(`/stories/${updatedStory.id}`)
}

export async function actionDeleteStory({ params }) {
  const res = await Story.deleteOneStory(params.storyId)
  return res && redirect(`/stories`)
}

export async function actionExportStory({ params, request }) {
  const { storyId } = params
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const updatedStory = await Story.updateOneStory(storyId, updates)
  writeFile(updatedStory, `story_${updatedStory.name}_v${updatedStory.version}`)
  return redirect(`/stories/${updatedStory.id}`)
}

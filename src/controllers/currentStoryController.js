import { updateStory } from "../services/currentStoryService"

export async function actionUpdateCurrentStory({ request }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await updateStory(updates)
  return await updateStory(updates)
}

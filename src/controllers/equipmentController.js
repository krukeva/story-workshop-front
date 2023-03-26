import { redirect } from "react-router-dom"

import * as Equipment from "../services/equipmentService"

export async function actionCreateEquipment() {
  try {
    const equipment = await Equipment.createOneEquipment()
    return redirect(`/story/equipments/${equipment.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateEquipment({ params, request }) {
  const { equipmentId } = params
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
    const updated = await Equipment.updateOneEquipment(equipmentId, updates)
    return redirect(`/story/equipments/${updated.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateEquipmentWithoutMutation({
  request,
  params,
}) {
  const { equipmentId } = params
  let formData = await request.formData()
  return Equipment.updateOneEquipment(equipmentId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteEquipment({ params }) {
  try {
    await Equipment.deleteOneEquipment(params.equipmentId)
    return redirect("/story/equipments")
  } catch (error) {
    throw error
  }
}

import { redirect } from "react-router-dom"

import * as Event from "../services/eventService"

export async function actionCreateEvent() {
  try {
    const event = await Event.createOneEvent()
    return redirect(`/story/events/${event.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateEvent({ params, request }) {
  const { eventId } = params
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
    const updated = await Event.updateOneEvent(eventId, updates)
    return redirect(`/story/events/${updated.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateEventWithoutMutation({ request, params }) {
  const { eventId } = params
  let formData = await request.formData()
  return Event.updateOneEvent(eventId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteEvent({ params }) {
  try {
    await Event.deleteOneEvent(params.eventId)
    return redirect("/story/events")
  } catch (error) {
    throw error
  }
}

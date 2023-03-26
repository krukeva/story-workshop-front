import { redirect } from "react-router-dom"

import * as People from "../services/personService"

export async function actionCreatePerson() {
  try {
    //const person = await People.createOnePerson({storyId: storyId})
    const person = await People.createOnePerson()
    return redirect(`/story/people/${person.id}/edit`)
  } catch (error) {
    throw error
    //faire un redirect
    //.status(error?.status || 500)
    //.send({status: "FAILED", data:{error: error?.message || error}});
    //data: {error: "Le paramètre 'worldId' ne peut pas être vide."}
  }
}

export async function actionUpdatePerson({ params, request }) {
  const { personId } = params
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
    const updatedPerson = await People.updateOnePerson(personId, updates)
    return redirect(`/story/people/${updatedPerson.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateWithoutMutation({ request, params }) {
  const { personId } = params
  let formData = await request.formData()
  return People.updateOnePerson(personId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeletePerson({ params }) {
  try {
    await People.deleteOnePerson(params.personId)
    return redirect("/story/people")
  } catch (error) {
    throw error
  }
}

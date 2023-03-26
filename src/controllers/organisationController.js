import { redirect } from "react-router-dom"

import * as Organisation from "../services/organisationService"

export async function actionCreateOrganisation() {
  try {
    const organisation = await Organisation.createOneOrganisation()
    return redirect(`/story/organisations/${organisation.id}/edit`)
  } catch (error) {
    throw error
  }
}

export async function actionUpdateOrganisation({ params, request }) {
  const { organisationId } = params
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
    const updatedOrganisation = await Organisation.updateOneOrganisation(
      organisationId,
      updates
    )
    return redirect(`/story/organisations/${updatedOrganisation.id}`)
  } catch (error) {
    throw error
  }
}

// Deals with the "Favorite" button on the contact page (not in the edition form)
export async function actionUpdateOrganisationWithoutMutation({
  request,
  params,
}) {
  const { organisationId } = params
  let formData = await request.formData()
  return Organisation.updateOneOrganisation(organisationId, {
    favorite: formData.get("favorite") === "true",
  })
}

export async function actionDeleteOrganisation({ params }) {
  try {
    await Organisation.deleteOneOrganisation(params.organisationId)
    return redirect("/story/organisations")
  } catch (error) {
    throw error
  }
}

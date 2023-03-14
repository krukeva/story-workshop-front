import { redirect } from "react-router-dom"

import { deleteWorld } from "../../database/worlds"

export async function actionDeleteWorld({ params }) {
    const res = await deleteWorld(params.worldId)
    return res && redirect(`/worlds`)
}
import { redirect } from "react-router-dom"

import { readFile } from "../utils/functions/files"

import { deleteOneWorld, importManyWorlds } from "../services/worldService"

export async function actionDeleteWorld({ params }) {
  const res = await deleteOneWorld(params.worldId)
  return res && redirect(`/worlds`)
}

export const actionLoadWorlds = async () => {
  const newWorlds = await readFile()
  return importManyWorlds(newWorlds)
}

import { Outlet, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllSituations } from "../../services/situationService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const situations = await getAllSituations(q)
  return { situations, q }
}

export default function Events() {
  const { situations, q } = useLoaderData()

  return (
    <EntityExplorer
      title="Situations"
      list={situations}
      q={q}
      color={colors.event}
      starrable={false}
    >
      <Outlet />
    </EntityExplorer>
  )
}

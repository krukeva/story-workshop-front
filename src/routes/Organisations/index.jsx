import { Outlet, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllOrganisations } from "../../services/organisationService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const organisations = await getAllOrganisations(q)
  return { organisations, q }
}

export default function Organisations() {
  const { organisations, q } = useLoaderData()

  return (
    <EntityExplorer
      title="Organisations"
      list={organisations}
      q={q}
      color={colors.organisation}
      starrable={true}
    >
      <Outlet />
    </EntityExplorer>
  )
}

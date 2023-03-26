import { Outlet, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllSites } from "../../services/siteService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const sites = await getAllSites(q)
  return { sites, q }
}

export default function Sites() {
  const { sites, q } = useLoaderData()

  return (
    <EntityExplorer
      title="Lieux"
      list={sites}
      q={q}
      color={colors.site}
      starrable={true}
    >
      <Outlet />
    </EntityExplorer>
  )
}

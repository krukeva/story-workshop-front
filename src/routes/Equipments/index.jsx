import { Outlet, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllEquipments } from "../../services/equipmentService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const equipments = await getAllEquipments(q)
  return { equipments, q }
}

export default function Equipments() {
  const { equipments, q } = useLoaderData()

  return (
    <EntityExplorer
      title="Equipements"
      list={equipments}
      q={q}
      color={colors.equipment}
      starrable={true}
    >
      <Outlet />
    </EntityExplorer>
  )
}

import { Outlet, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllPeople } from "../../services/personService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const people = await getAllPeople(q)
  return { people, q }
}

export default function People() {
  const { people, q } = useLoaderData()

  return (
    <EntityExplorer
      title="Personnes"
      list={people}
      q={q}
      color={colors.person}
      starrable={true}
    >
      <Outlet />
    </EntityExplorer>
  )
}

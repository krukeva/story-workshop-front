import { Outlet, useOutletContext, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllSequences } from "../../services/sequenceService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const sequences = await getAllSequences(q)
  return { sequences, q }
}

export default function Sequences() {
  const { sequences, q } = useLoaderData()
  const story = useOutletContext()
  return (
    <EntityExplorer
      title="Séquences"
      list={sequences}
      q={q}
      color={colors.event}
      starrable={false}
    >
      <Outlet context={story} />
    </EntityExplorer>
  )
}

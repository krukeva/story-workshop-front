import { Outlet, useOutletContext, useLoaderData } from "react-router-dom"

import colors from "../../utils/styles/colors"
import EntityExplorer from "../../utils/templates/EntityExplorer"
import { getAllEvents } from "../../services/eventService"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const events = await getAllEvents(q)
  return { events, q }
}

export default function Events() {
  const { events, q } = useLoaderData()
  const story = useOutletContext()
  return (
    <EntityExplorer
      title="Evénements"
      list={events}
      q={q}
      color={colors.event}
      starrable={false}
    >
      <Outlet context={story} />
    </EntityExplorer>
  )
}

import { useLoaderData, Outlet } from "react-router-dom"

import { getWorld } from "../../database/worlds"

export async function loader({ params }) {
  const world = await getWorld(params.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { world }
}

export default function World() {
  const { world } = useLoaderData()

  return (
    <div>
      Hello world {`${world.name}`}!<Outlet context={world} />
    </div>
  )
}

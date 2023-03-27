import { useLoaderData, Form } from "react-router-dom"

import GridContainer from "../../utils/templates/GridContainer"
import { FixedDiv } from "../../utils/styles/Atoms"
import { ImportButton } from "../../components/buttons"

import WorldCard from "../../components/WorldCard"
import { getAllWorlds } from "../../services/worldService"
import { getStories } from "../../database/stories"

export async function loader() {
  const worlds = await getAllWorlds()
  const stories = await getStories()
  return { worlds, stories }
}

export default function Worlds() {
  const { worlds, stories } = useLoaderData()

  return (
    <>
      <GridContainer numberOfColumns="5">
        {worlds.map((world) => (
          <WorldCard
            key={world.id}
            world={world}
            isUsed={
              stories.findIndex((story) => story.worldId === world.id) > -1
            }
          />
        ))}
      </GridContainer>
      <FixedDiv bottom="50px" right="50px">
        <Form method="post">
          <ImportButton type="submit" />
        </Form>
      </FixedDiv>
    </>
  )
}

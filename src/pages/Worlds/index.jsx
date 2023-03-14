import { useLoaderData, Form } from "react-router-dom"

import GridContainer from "../../utils/templates/GridContainer"
import { FixedDiv } from "../../utils/styles/Atoms"
import { ImportButton } from "../../components/buttons"

import WorldCard from "../../components/WorldCard"
import { getWorlds, importWorlds } from "../../database/worlds"
import { getStories } from "../../database/stories"

import { readFile } from "../../utils/functions/files"
const loadWorlds = async () => {
  const newWorlds = await readFile()
  return importWorlds(newWorlds)
}

export async function loader() {
  const worlds = await getWorlds()
  const stories = await getStories()
  return { worlds, stories }
}

export async function action() {
  return loadWorlds()
}

export default function Worlds() {
  const { worlds, stories } = useLoaderData()

  return (
    <>
      <GridContainer>
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

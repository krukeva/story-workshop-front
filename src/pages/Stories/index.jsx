import { useLoaderData, Form } from "react-router-dom"

import GridContainer from "../../utils/templates/GridContainer"
import { FixedDiv } from "../../utils/styles/Atoms"
import { AddButton } from "../../components/buttons"

import StoryCard from "../../components/StoryCard"

import { getStories } from "../../database/stories"

export async function loader() {
  const stories = await getStories()
  return { stories }
}

export default function Stories() {
  const { stories } = useLoaderData()

  return (
    <>
      <GridContainer numberOfColumns="4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </GridContainer>
      <FixedDiv bottom="50px" right="50px">
        <Form method="post">
          <AddButton type="submit" />
        </Form>
      </FixedDiv>
    </>
  )
}

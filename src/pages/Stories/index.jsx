import { useLoaderData, Form } from "react-router-dom"

import GridContainer from "../../utils/templates/GridContainer"
import { FixedDiv } from "../../utils/styles/Atoms"
import StoryCard from "../../components/StoryCard"
import { AddButton } from "../../components/buttons"

import { getStories } from "../../database/stories"

export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get("q")
  const stories = await getStories(q)
  return { stories, q }
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
        <Form method="post" action={"/stories/create"}>
          <AddButton type="submit" />
        </Form>
      </FixedDiv>
    </>
  )
}

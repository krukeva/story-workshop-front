import { useLoaderData, Outlet, NavLink, redirect } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import Header, { TitleLink } from "../../utils/templates/Header"

import { readStory } from "../../services/currentStoryService"

const LeftDiv = styled.div`
  display: flex;
  flex-direction: line;
  align-items: center;
`

const RightDiv = styled.div`
  display: flex;
  flex-direction: line;
  align-items: center;
`

const MiddleDiv = styled.div`
  display: flex;
  flex-direction: line;
  align-items: center;
`

const StoryTitle = styled(NavLink)`
  margin-left: 1em;
  color: ${colors.lightPrimary};
  text-decoration: none;
  font-size: 24px;
  text-align: center;
`

export async function loader() {
  const story = await readStory()
  if (!story) return redirect("/stories")
  return { story }
}

export default function CurrentStoryWorkspace() {
  const { story } = useLoaderData()

  return (
    <div>
      <Header>
        <LeftDiv>
          <button onClick={() => null}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <StoryTitle to="/story">{story.name}</StoryTitle>
        </LeftDiv>
        <MiddleDiv>
          <TitleLink to="/story/situations">Situations</TitleLink>
          <TitleLink to="/story/events">Evénements</TitleLink>
        </MiddleDiv>
        <RightDiv>
          <TitleLink to="/story/people">Personnes</TitleLink>
          <TitleLink to="/story/organisations">Organisations</TitleLink>
          <TitleLink to="/story/equipments">Equipements</TitleLink>
          <TitleLink to="/story/sites">Lieux</TitleLink>
        </RightDiv>
      </Header>
      <Outlet context={story} />
    </div>
  )
}

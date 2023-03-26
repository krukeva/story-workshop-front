import { useLoaderData, Outlet, useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import colors from "../utils/styles/colors"
import Header, { TitleLink } from "../utils/templates/Header"

import { readStory } from "../services/storyService"

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

const StoryTitle = styled.div`
  color: ${colors.text};
  margin-left: 1em;
`

export async function loader() {
  const story = await readStory()
  return { story }
}

export default function StoryRoot() {
  const { story } = useLoaderData()
  const [collapsed, setCollapsed] = useOutletContext()

  useEffect(() => {
    setCollapsed(story !== {})
  }, [story, setCollapsed])
  return (
    <div>
      <Header>
        <LeftDiv>
          <button onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <StoryTitle>{story.name}</StoryTitle>
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
      <Outlet />
    </div>
  )
}

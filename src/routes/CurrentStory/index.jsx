import { useLoaderData, Outlet, NavLink, redirect } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import Header, { TitleLink } from "../../utils/templates/Header"
import SaveStory from "./Save"
import ExitStoryEditor from "./Exit"
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

const StyledMenuItems = styled.div`
  position: relative;
  font-size: 14px;
`

const StyledUl = styled.ul`
  position: absolute;
  left: 0;
  right: auto;
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  font-size: 0.875rem;
  z-index: 9999;
  min-width: 5rem;
  padding: 0.5rem 0;
  list-style: none;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  display: ${(props) => {
    return props.dropdown ? "block" : "none"
  }};
`

const StyledLi = styled.li`
  margin: 0.5rem;
`
const MenuButton = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  font-family: sans-serif; /* Use whatever font-family you want */
  font-size: 1rem;
  line-height: 1;
  background: transparent;
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    background-color: ${colors.lightPrimary};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

export async function loader() {
  const story = await readStory()
  if (!story) return redirect("/stories")
  return { story }
}

export default function CurrentStoryWorkspace() {
  const { story } = useLoaderData()
  const [dropdown, setDropdown] = useState(false)
  const [showSave, setShowSave] = useState(false)
  const [showExit, setShowExit] = useState(false)

  // To close the dropdown menu by clicking outside
  const ref = useRef()
  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  return (
    <div>
      <Header>
        <LeftDiv>
          <div>
            <StyledMenuItems>
              <button
                type="button"
                onClick={() => setDropdown((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <StyledUl dropdown={dropdown} ref={ref}>
                <StyledLi key={1}>
                  <MenuButton
                    onClick={() => {
                      setShowSave(true)
                      setDropdown(false)
                    }}
                  >
                    Enregistrer
                  </MenuButton>
                </StyledLi>

                <StyledLi key={3}>
                  <MenuButton
                    onClick={() => {
                      setShowExit(true)
                      setDropdown(false)
                    }}
                  >
                    Quitter
                  </MenuButton>
                </StyledLi>
              </StyledUl>
            </StyledMenuItems>
          </div>

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

      <SaveStory story={story} show={showSave} setShow={setShowSave} />
      <ExitStoryEditor show={showExit} setShow={setShowExit} />
    </div>
  )
}

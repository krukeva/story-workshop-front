import { useLoaderData, Outlet, redirect } from "react-router-dom"
import { useState } from "react"

import Header, {
  TitleLink,
  LeftDiv,
  MiddleDiv,
  RightDiv,
} from "../../utils/templates/Header"
import DropDownMenuButton from "../../utils/templates/DropDownMenuButton"

import SaveStory from "./Save"
import ExitStoryEditor from "./Exit"

import { readStory } from "../../services/currentStoryService"

export async function loader() {
  const story = await readStory()
  if (!story) return redirect("/stories")
  return { story }
}

export default function CurrentStoryWorkspace() {
  const { story } = useLoaderData()
  const [showSave, setShowSave] = useState(false)
  const [showExit, setShowExit] = useState(false)

  const menus = [
    {
      label: "Enregistrer",
      type: "button",
      onClick: () => {
        setShowSave(true)
      },
    },
    {
      label: "Fermer",
      type: "button",
      onClick: () => {
        setShowExit(true)
      },
    },
  ]

  return (
    <div>
      <Header>
        <LeftDiv>
          <DropDownMenuButton menus={menus} />
          <TitleLink to="/story">
            {"\u00AB\u00A0" + story.name + "\u00A0\u00BB"}
          </TitleLink>
        </LeftDiv>

        <MiddleDiv>
          <TitleLink to="/story/sequences">Séquences</TitleLink>
          <TitleLink to="/story/events">Evénements</TitleLink>
          <TitleLink to="/story/situations">Situations</TitleLink>
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

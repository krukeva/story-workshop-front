import { Outlet } from "react-router"

import Header, { TitleLink, LeftDiv } from "../../utils/templates/Header"
import DropDownMenuButton from "../../utils/templates/DropDownMenuButton"

import { exportAllStories } from "../../services/storyService"

export default function StoryManager() {
  const menus = [
    {
      label: "Importer",
      type: "form",
      action: "/stories/import",
    },
    {
      label: "Exporter",
      type: "button",
      onClick: exportAllStories,
    },
  ]

  return (
    <div>
      <Header>
        <LeftDiv>
          <DropDownMenuButton menus={menus} />
          <TitleLink to="/stories">Catalogue des histoires</TitleLink>
        </LeftDiv>

        <TitleLink to="/worlds">Catalogue des mondes</TitleLink>
      </Header>
      <Outlet />
    </div>
  )
}

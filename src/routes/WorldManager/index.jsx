import { Outlet } from "react-router"

import Header, { TitleLink, LeftDiv } from "../../utils/templates/Header"
import DropDownMenuButton from "../../utils/templates/DropDownMenuButton"

import { exportAllWorlds } from "../../services/worldService"

export default function WorldManager() {
  const menus = [
    {
      label: "Importer",
      type: "form",
      action: "/worlds",
    },
    {
      label: "Exporter",
      type: "button",
      onClick: exportAllWorlds,
    },
  ]

  return (
    <div>
      <Header>
        <LeftDiv>
          <DropDownMenuButton menus={menus} />
          <TitleLink to="/worlds">Catalogue des mondes</TitleLink>
        </LeftDiv>

        <TitleLink to="/stories">Catalogue des histoires</TitleLink>
      </Header>
      <Outlet />
    </div>
  )
}

import { Outlet } from "react-router"
import styled from "styled-components"
import Header, { TitleLink } from "../../utils/templates/Header"

const LeftDiv = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
`

export default function WorldManager() {
  return (
    <div>
      <Header>
        <LeftDiv>
          <TitleLink to="/worlds">Catalogue des mondes</TitleLink>
        </LeftDiv>

        <TitleLink to="/stories">Catalogue des histoires</TitleLink>
      </Header>
      <Outlet />
    </div>
  )
}

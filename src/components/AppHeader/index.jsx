import Header, { TitleLink } from "../../utils/templates/Header"

function AppHeader() {
  return (
    <Header>
      <TitleLink to="/Stories">Catalogue des histoires</TitleLink>
      <TitleLink to="/Worlds">Catalogue des mondes</TitleLink>
    </Header>
  )
}

export default AppHeader

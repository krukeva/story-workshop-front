import { NavLink } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

const NavContainer = styled.nav`
  background-color: ${colors.darkPrimary};
  padding: 5px 20px;
  margin: 0;
  height: 50px;
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
`

export const TitleLink = styled(NavLink)`
  padding: 2px 10px;
  color: ${colors.lightPrimary};
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  &.active {
    color: ${colors.primary};
    border-radius: 30px;
    background-color: ${colors.lightPrimary};
  }
`

function Header({ children }) {
  return <NavContainer>{children}</NavContainer>
}
export default Header

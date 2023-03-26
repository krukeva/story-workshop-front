import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import dimensions from "./dimensions"

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${dimensions.mainBodyHeight};
  overflow: auto;
`

const NavContainer = styled.nav`
  width: 22rem;
  background-color: ${(props) => props.color || colors.primary};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`

const MainContainer = styled.div`
  overflow: auto;
  margin: auto;
  width: 100%;
  margin-top: 0;
`

export const BlockNavLink = styled(NavLink)`
  display: block;
  padding: 4px 10px;
  margin: 20px;
  background-color: white;
  color: ${colors.darkPrimary};
  text-decoration: none;
  font-size: 18px;
  &: visited {
    color: ${colors.darkPrimary};
  }
  &.active {
    color: ${colors.primary};
    background-color: ${colors.lightPrimary};
  }
  &.pending {
    color: ${colors.primary};
    background-color: black;
  }
`

export default function PageWithNav({ color, children }) {
  let subComponentList = Object.keys(PageWithNav)
  let subComponents = {}

  subComponentList.forEach((key) => {
    subComponents[key] = []
    React.Children.forEach(children, (child) => {
      const childType =
        child && child.type && (child.type.displayName || child.type.name)
      if (childType === key) {
        subComponents[key].push(child)
      }
    })
  })
  return (
    <Wrapper>
      <NavContainer color={color}>{subComponents.NavBar}</NavContainer>
      <MainContainer>{subComponents.Main}</MainContainer>
    </Wrapper>
  )
}

const NavBar = (props) => <>{props.children}</>
PageWithNav.NavBar = NavBar

const Main = (props) => <>{props.children}</>
PageWithNav.Main = Main

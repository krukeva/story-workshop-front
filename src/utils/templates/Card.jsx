import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"

import colors from "../styles/colors"

const CardWrapper = styled.div`
  border-radius: 20px 0 20px 0;
  border: 1px solid ${colors.lightPrimary};
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.lightPrimary};
`

const CardHeaderWrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 50px;
  border-radius: 20px 0 0 0;
  background-color: ${colors.primary};
  width: 100%;
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
  color: ${colors.text};
`
const StyledTitle = styled(NavLink)`
  margin: 0;
  padding: 0;
  width: 100%;
  padding-left: 20px;
  text-align: left;
  text-decoration: none;
  color: ${colors.text};
`
const ButtonWrapper = styled.div`
  margin: 0 10px;
`

const CardContentWrapper = styled(NavLink)`
  margin: 0;
  padding: 0;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
`
const CardBodyWrapper = styled.div`
  background-color: white;
  margin: auto;
  text-align: left;
  height: 100%;
  margin: 0;
  padding: 0;
`
const CardFooterWrapper = styled.div`
  margin: auto;
  text-align: left;
  width: 100%;
  height: 50px;
  overflow: hidden;
  padding: 5px;
  margin: 0;
  font-size: 12px;
`

export default function Card({ children, openLink }) {
  let subComponentList = Object.keys(Card)
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
    <CardWrapper>
      {subComponents.Header}
      <CardContentWrapper to={openLink}>
        <CardBodyWrapper>{subComponents.Body}</CardBodyWrapper>
        <CardFooterWrapper>{subComponents.Footer}</CardFooterWrapper>
      </CardContentWrapper>
    </CardWrapper>
  )
}

const Header = ({ children, openLink }) => {
  let subComponentList = Object.keys(Header)
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
    <CardHeaderWrapper>
      <StyledTitle to={openLink}>{subComponents.Title}</StyledTitle>
      <ButtonWrapper>{subComponents.Buttons}</ButtonWrapper>
    </CardHeaderWrapper>
  )
}
const Title = (props) => <div>{props.children}</div>
Header.Title = Title
const Buttons = (props) => <div>{props.children}</div>
Header.Buttons = Buttons
Card.Header = Header

const Body = (props) => <div>{props.children}</div>
Card.Body = Body

const Footer = (props) => <div>{props.children}</div>
Card.Footer = Footer

import React from "react"
import styled from "styled-components"

import colors from "../styles/colors"

import DefaultPicture from "../../assets/profile.png"

const Template = styled.div`
  width: 75%;
  margin: 25px auto;
  background-color: white;
  min-height: 500px;
  padding: 50px;
`

const DataSheet = ({ children }) => {
  let subComponentList = Object.keys(DataSheet)
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
    <Template>
      {subComponents.Header}
      {subComponents.Body}
    </Template>
  )
}
export default DataSheet

const StyledHeader = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${colors.lightPrimary};
  margin-bottom: 25px;
`
const ProfileImage = styled.img`
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  padding: 1em;
`
const HeaderDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const Header = ({ children }) => {
  return (
    <StyledHeader>
      <HeaderDataWrapper>{children}</HeaderDataWrapper>
      <ProfileImage src={DefaultPicture} alt="Profile image" />
    </StyledHeader>
  )
}
DataSheet.Header = Header

const Body = (props) => <div>{props.children}</div>
DataSheet.Body = Body

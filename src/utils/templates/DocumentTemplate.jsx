import React from "react"
import styled from "styled-components"

import colors from "../styles/colors"

const Template = styled.div`
  width: 75%;
  margin: 25px auto;
  background-color: white;
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
  width: 100%;
`

const HeaderDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`

const Header = ({ children }) => {
  return (
    <StyledHeader>
      <HeaderDataWrapper>{children}</HeaderDataWrapper>
    </StyledHeader>
  )
}
DataSheet.Header = Header

const Body = (props) => <div>{props.children}</div>
DataSheet.Body = Body

import React from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

import DocumentTemplate from "../../utils/templates/DocumentTemplate"

const Title = styled.h1``

const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.event};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`

const Label = styled.label`
  margin: 0 1em;
`
const DateTimeField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  padding-left: 2em;
  display: flex;
  flex-direction: line;
  justify-content: flex-end;
  align-items: center;
`

const StyledDescription = styled.div`
  border: 2px solid ${colors.event};
  text-align: left;
  margin-left: 5px;
  padding: 5px;
  min-height: 100px;
`

const DataTemplate = ({ children }) => {
  let subComponentList = Object.keys(DataTemplate)
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
    <DocumentTemplate>
      <DocumentTemplate.Header entityType="event">
        <Title>{subComponents.Name}</Title>

        <DateTimeField>
          <Label htmlFor="diffusionDate">le</Label>
          <FieldValue>{subComponents.DiffusionDate}</FieldValue>

          <Label htmlFor="diffusionTime">à</Label>
          <FieldValue>{subComponents.DiffusionTime}</FieldValue>
        </DateTimeField>
      </DocumentTemplate.Header>

      <DocumentTemplate.Body>
        <StyledDescription>{subComponents.Content}</StyledDescription>
      </DocumentTemplate.Body>
    </DocumentTemplate>
  )
}
export default DataTemplate

const Name = (props) => <div>{props.children}</div>
DataTemplate.Name = Name

const DiffusionDate = (props) => <div>{props.children}</div>
DataTemplate.DiffusionDate = DiffusionDate
const DiffusionTime = (props) => <div>{props.children}</div>
DataTemplate.DiffusionTime = DiffusionTime

const Content = (props) => <div>{props.children}</div>
DataTemplate.Content = Content

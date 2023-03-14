import React from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

import DataSheet from "../../utils/templates/DataSheet"

const H3 = styled.h3`
  text-align: left;
  margin: 0;
  padding: 0;
`

const DataField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
`
const FieldLabel = styled.div`
  width: 150px;
  margin: 0;
  padding: 5px;
`
const FieldValue = styled.div`
  background-color: ${colors.lightPrimary};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`
export default function DataTemplate({ children }) {
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
    <DataSheet>
      <DataSheet.Header>
        <DataField>
          <FieldLabel>
            <label htmlFor="name">Nom&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.Name}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="startDate">date de début&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.StartDate}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="endDate">date de fin&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.EndDate}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="worldId">monde&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.World}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="keywords">mots-clefs&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.KeyWords}</FieldValue>
        </DataField>
      </DataSheet.Header>
      <DataSheet.Body>
        <H3>Résumé</H3>
        {subComponents.Description}
      </DataSheet.Body>
    </DataSheet>
  )
}

const Name = (props) => <div>{props.children}</div>
DataTemplate.Name = Name

const StartDate = (props) => <div>{props.children}</div>
DataTemplate.StartDate = StartDate

const EndDate = (props) => <div>{props.children}</div>
DataTemplate.EndDate = EndDate

const World = (props) => <div>{props.children}</div>
DataTemplate.World = World

const KeyWords = (props) => <div>{props.children}</div>
DataTemplate.KeyWords = KeyWords

const Description = (props) => <div>{props.children}</div>
DataTemplate.Description = Description

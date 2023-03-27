import React from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"

import DataSheet from "../../utils/templates/DataSheet"

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
  color: ${colors.divider};
  width: 150px;
  margin: 0;
  padding: 5px;
`
const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.event};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`

const DateGrid = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  padding-left: 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
`
const GridDataField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
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
    <DataSheet>
      <DataSheet.Header entityType="event">
        <DataField>
          <FieldLabel>
            <label htmlFor="name">Nom&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.Name}</FieldValue>
        </DataField>

        <DateGrid>
          <GridDataField>
            <FieldLabel>
              <label htmlFor="name">Date de début&nbsp;: </label>
            </FieldLabel>
            <FieldValue>{subComponents.StartDate}</FieldValue>
          </GridDataField>

          <GridDataField>
            <FieldLabel>
              <label htmlFor="name">Heure de début&nbsp;: </label>
            </FieldLabel>
            <FieldValue>{subComponents.StartTime}</FieldValue>
          </GridDataField>

          <GridDataField>
            <FieldLabel>
              <label htmlFor="name">Date de fin&nbsp;: </label>
            </FieldLabel>
            <FieldValue>{subComponents.EndDate}</FieldValue>
          </GridDataField>

          <GridDataField>
            <FieldLabel>
              <label htmlFor="name">Heure de fin&nbsp;: </label>
            </FieldLabel>
            <FieldValue>{subComponents.EndTime}</FieldValue>
          </GridDataField>
        </DateGrid>

        <DataField>
          <FieldLabel>
            <label htmlFor="keywords">mots-clefs&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.KeyWords}</FieldValue>
        </DataField>
      </DataSheet.Header>

      <DataSheet.Body>
        <FieldLabel>
          <label htmlFor="description">Description&nbsp;: </label>
        </FieldLabel>
        <StyledDescription>{subComponents.Description}</StyledDescription>
      </DataSheet.Body>
    </DataSheet>
  )
}
export default DataTemplate

const Name = (props) => <div>{props.children}</div>
DataTemplate.Name = Name

const StartDate = (props) => <div>{props.children}</div>
DataTemplate.StartDate = StartDate
const StartTime = (props) => <div>{props.children}</div>
DataTemplate.StartTime = StartTime

const EndDate = (props) => <div>{props.children}</div>
DataTemplate.EndDate = EndDate
const EndTime = (props) => <div>{props.children}</div>
DataTemplate.EndTime = EndTime

const KeyWords = (props) => <div>{props.children}</div>
DataTemplate.KeyWords = KeyWords

const Description = (props) => <div>{props.children}</div>
DataTemplate.Description = Description

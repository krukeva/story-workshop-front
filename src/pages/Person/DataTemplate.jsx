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
  width: 150px;
  margin: 0;
  padding: 5px;
`
const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.person};
  padding: 5px;
  margin: 0;
  min-width: 100px;
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: top;
  justify-items: center;
  gap: 25px;
  grid-auto-rows: minmax(300px, auto);
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
      <DataSheet.Header entityType="person">
        <DataField>
          <FieldLabel>
            <label htmlFor="name">Nom&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.Name}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="activity">Rôle principal&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.Activity}</FieldValue>
        </DataField>
        <DataField>
          <FieldLabel>
            <label htmlFor="keywords">mots-clefs&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.KeyWords}</FieldValue>
        </DataField>{" "}
      </DataSheet.Header>

      <DataSheet.Body>
        <GridLayout>{subComponents.DataBlock}</GridLayout>
      </DataSheet.Body>
    </DataSheet>
  )
}
export default DataTemplate

const Name = (props) => <div>{props.children}</div>
DataTemplate.Name = Name

const Activity = (props) => <div>{props.children}</div>
DataTemplate.Activity = Activity

const KeyWords = (props) => <div>{props.children}</div>
DataTemplate.KeyWords = KeyWords

const Wrapper = styled.div`
  border: solid;
  width: 100%;
`

const DataBlock = ({ title, children }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      {children.map((child) => {
        return child
      })}
    </Wrapper>
  )
}
DataTemplate.DataBlock = DataBlock

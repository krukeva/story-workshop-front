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
  border-bottom: 2px solid ${colors.organisation};
  padding: 5px;
  margin: 0;
  min-width: 100px;
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
      <DataSheet.Header entityType="organisation">
        <DataField>
          <FieldLabel>
            <label htmlFor="name">Nom&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.Name}</FieldValue>
        </DataField>

        <DataField>
          <FieldLabel>
            <label htmlFor="keywords">mots-clefs&nbsp;: </label>
          </FieldLabel>
          <FieldValue>{subComponents.KeyWords}</FieldValue>
        </DataField>
      </DataSheet.Header>

      {/*}
      <DataSheet.Body>
        <H3>Résumé</H3>
        
      </DataSheet.Body>
  */}
    </DataSheet>
  )
}
export default DataTemplate

const Name = (props) => <div>{props.children}</div>
DataTemplate.Name = Name

const KeyWords = (props) => <div>{props.children}</div>
DataTemplate.KeyWords = KeyWords

/*
const DataBlock = (props) => <div>{props.children}</div>
DataTemplate.DataBlock = DataBlock
*/

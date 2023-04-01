import React, { useState } from "react"
import styled from "styled-components"

import colors from "../styles/colors"

const StyledTabList = styled.div`
  margin: 0;
  pagging: 0;
  display: flex;
  flex-direction: line;
  align-items: center;
`

const StyledTab = styled.button`
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? colors.primary : "inherit")};
  color: ${(props) => (props.isActive ? colors.text : "inherit")};
  border: 1px solid ${colors.primary};
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  flex-grow: 1;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  &: hover {
    background-color: ${colors.lightPrimary};
  }
`

const TabContainer = styled.div`
  margin: 0;
  pagging: 0;
`

export default function HorizontalTabs({ children }) {
  const [activeTab, setActiveTab] = useState(0)

  let tabs = []
  React.Children.forEach(children, (child) => {
    const childType =
      child && child.type && (child.type.displayName || child.type.name)
    if (childType === "TabItem") {
      tabs.push(child)
    }
  })
  const tabButtonList = tabs.map((tabItem) => tabItem.props.buttonLabel)

  return (
    <div>
      <StyledTabList>
        {tabButtonList.map((buttonLabel, index) => (
          <StyledTab
            key={index}
            type="button"
            onClick={() => setActiveTab(index)}
            isActive={activeTab === index}
          >
            {buttonLabel}
          </StyledTab>
        ))}
      </StyledTabList>
      <TabContainer>
        {tabs.map((tab, index) => (
          <StyledTabContent key={index} isActive={activeTab === index}>
            {tab}
          </StyledTabContent>
        ))}
      </TabContainer>
    </div>
  )
}

const StyledTabContent = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  margin: 0;
  padding: 5px;
  border: 1px solid ${colors.primary};
  height: 400px;
  overflow: auto;
`
const TabItem = ({ buttonLabel, children }) => (
  <div key={buttonLabel}>{children}</div>
)
HorizontalTabs.TabItem = TabItem

import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

import colors from "../styles/colors"
import dimensions from "./dimensions"

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: ${dimensions.headerheight};
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalWrapper = styled.div`
  width: 500px;
  background-color: white;
`

const ModalHeader = styled.div`
  padding: 10px;
  background-color: ${(props) => props.background || colors.primary};
  color: ${colors.text};
`

const ModalBody = styled.div`
  padding: 10px;
  border-top: 1px solid ${colors.primary};
`

const ModalFooter = styled.div`
  border-top: 1px solid ${colors.primary};
  padding: 10px;
`

export default function Modal({ children, show, onClose, colorTheme }) {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) onClose()
    }
    document.body.addEventListener("keydown", closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
    }
  }, [onClose])

  if (!show) {
    return null
  }

  let subComponentList = Object.keys(Modal)
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
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader
          background={colorTheme === "danger" ? colors.danger : colors.primary}
        >
          {subComponents.Header}
        </ModalHeader>

        <ModalBody>{subComponents.Body}</ModalBody>

        {subComponents.Footer.length > 0 && (
          <ModalFooter>{subComponents.Footer}</ModalFooter>
        )}
      </ModalWrapper>
    </Overlay>,
    document.getElementById("root")
  )
}

const Header = (props) => <div>{props.children}</div>
Modal.Header = Header

const Body = (props) => <div>{props.children}</div>
Modal.Body = Body

const Footer = (props) => <div>{props.children}</div>
Modal.Footer = Footer

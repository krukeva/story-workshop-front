import { useState, useRef, useEffect } from "react"
import { useFetcher } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"

const StyledMenu = styled.div`
  position: relative;
  font-size: 14px;
  margin-right: 1em;
`

const StyledUl = styled.ul`
  position: absolute;
  left: 0;
  right: auto;
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  font-size: 0.875rem;
  z-index: 9999;
  min-width: 5rem;
  padding: 0.5rem 0;
  list-style: none;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  display: ${(props) => {
    return props.dropdown ? "block" : "none"
  }};
`

const StyledLi = styled.li`
  margin: 0.5rem;
`
const MenuButton = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  font-family: sans-serif; /* Use whatever font-family you want */
  font-size: 1rem;
  line-height: 1;
  background: transparent;
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    background-color: ${colors.lightPrimary};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

export default function DropDownMenuButton({ menus }) {
  const [dropdown, setDropdown] = useState(false)
  const fetcher = useFetcher()

  // To close the dropdown menu by clicking outside
  const refMenu = useRef()
  const refButton = useRef()
  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        refMenu.current &&
        !refMenu.current.contains(event.target) &&
        !refButton.current.contains(event.target)
      ) {
        event.stopPropagation()
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  return (
    <StyledMenu>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setDropdown(!dropdown)
        }}
        ref={refButton}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <StyledUl dropdown={dropdown} ref={refMenu}>
        {menus.map((menuItem, index) => {
          if (menuItem.type === "form") {
            return (
              <StyledLi key={index}>
                <fetcher.Form
                  method="post"
                  onSubmit={() => setDropdown(false)}
                  action={menuItem.action}
                >
                  <MenuButton type="submit">{menuItem.label}</MenuButton>
                </fetcher.Form>
              </StyledLi>
            )
          } else {
            return (
              <StyledLi key={index}>
                <MenuButton
                  onClick={() => {
                    menuItem.onClick()
                    setDropdown(false)
                  }}
                >
                  {menuItem.label}
                </MenuButton>
              </StyledLi>
            )
          }
        })}
      </StyledUl>
    </StyledMenu>
  )
}

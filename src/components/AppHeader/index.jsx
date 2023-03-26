import { useNavigate } from "react-router"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import Header, { TitleLink } from "../../utils/templates/Header"

import { importStory } from "../../database/stories"
import { readFile } from "../../utils/functions/files"

const LeftDiv = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  align-items: center;
`
const Button = styled.button`
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  margin: 0;
  margin-right: 1em;
  padding: 0;
  color: ${colors.lightPrimary};
  background-color: ${(props) => props.color || colors.primary};
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

function AppHeader({ collapsed }) {
  const navigate = useNavigate()
  const loadStory = async () => {
    const newStory = await readFile()
    const story = await importStory(newStory)
    if (story) {
      navigate(`/stories/${story.id}`)
    } else {
      alert("Cette histoire existe déjà.")
    }
  }

  return (
    <Header collapsed={collapsed}>
      <LeftDiv>
        <Button onClick={loadStory}>
          <FontAwesomeIcon icon={faFileArrowUp} />
        </Button>
        <TitleLink to="/">Catalogue des histoires</TitleLink>
      </LeftDiv>

      <TitleLink to="/Worlds">Catalogue des mondes</TitleLink>
    </Header>
  )
}

export default AppHeader

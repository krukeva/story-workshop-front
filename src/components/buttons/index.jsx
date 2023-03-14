import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPen,
  faCheck,
  faTrash,
  faFileExport,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import { RoundButton } from "../../utils/styles/Atoms"

const Button = styled(RoundButton)`
  font-size: 25px;
`

export function AddButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  )
}

export function ImportButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faFileArrowUp} />
    </Button>
  )
}

export function ExportButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faFileExport} />
    </Button>
  )
}

export function EditButton({ onClick, type }) {
  return (
    <Button onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faPen} />
    </Button>
  )
}

export function SubmitButton({ onClick, type }) {
  return (
    <RoundButton onClick={onClick} type={type}>
      <FontAwesomeIcon icon={faCheck} />
    </RoundButton>
  )
}

export function DeleteButton({ onClick, type }) {
  return (
    <RoundButton
      color={colors.danger}
      size="30px"
      onClick={onClick}
      type={type}
    >
      <FontAwesomeIcon icon={faTrash} />
    </RoundButton>
  )
}

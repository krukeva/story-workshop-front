import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPen,
  faCheck,
  faTrash,
  faFileExport,
  faFileArrowUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

import colors from "../../utils/styles/colors"
import { RoundButton } from "../../utils/styles/Atoms"

export function CancelButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faXmark} />
    </RoundButton>
  )
}

export function AddButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faPlus} />
    </RoundButton>
  )
}

export function ImportButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faFileArrowUp} />
    </RoundButton>
  )
}

export function ExportButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faFileExport} />
    </RoundButton>
  )
}

export function EditButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faPen} />
    </RoundButton>
  )
}

export function SubmitButton({ onClick, type, color, size, fontSize }) {
  return (
    <RoundButton
      onClick={onClick}
      type={type}
      color={color}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faCheck} />
    </RoundButton>
  )
}

export function DeleteButton({ onClick, type, size, fontSize }) {
  return (
    <RoundButton
      color={colors.danger}
      onClick={onClick}
      type={type}
      size={size}
      fontSize={fontSize}
    >
      <FontAwesomeIcon icon={faTrash} />
    </RoundButton>
  )
}

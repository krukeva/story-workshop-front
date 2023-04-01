import { useNavigate } from "react-router-dom"

import styled from "styled-components"

import colors from "../../utils/styles/colors"
import Modal from "../../utils/templates/Modal"

const Buttons = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: center;
`

const Button = styled.button`
  margin: 2em 1em;
  padding: 0.5em;
  min-width: 100px;
  background-color: ${colors.primary};
  color: ${colors.text};
`

const DangerButton = styled(Button)`
  background-color: ${colors.danger};
`

export default function ExitStoryEditor({ show, setShow }) {
  const navigate = useNavigate()

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Modal.Header>Sortie de l'éditeur d'histoires</Modal.Header>
      <Modal.Body>
        <p>
          Toutes les modifications depuis la dernière sauvegarde seront perdues
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Buttons>
          <DangerButton
            type="button"
            onClick={() => {
              setShow(false)
              navigate("/stories")
            }}
          >
            Quitter sans enregistrer
          </DangerButton>
          <Button
            type="button"
            onClick={() => {
              setShow(false)
            }}
          >
            Annuler
          </Button>
        </Buttons>
      </Modal.Footer>
    </Modal>
  )
}

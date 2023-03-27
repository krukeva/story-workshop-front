import { useOutletContext, Form, useNavigate } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import Modal from "../../utils/templates/Modal"

const Buttons = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: center;
`

const Button = styled.button`
  margin: 1em;
  padding: 0.5em;
  min-width: 100px;
  background-color: ${colors.primary};
  color: ${colors.text};
`

const DeleteButton = styled(Button)`
  background-color: ${colors.danger};
`

export default function DeleteEvent() {
  const [show, setShow] = useState(true)
  const event = useOutletContext()
  const navigate = useNavigate()

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Modal.Header>Suppression d'un événement</Modal.Header>
      <Modal.Body>
        <p>
          Merci de confirmer la suppression de l'événement{" "}
          <b>
            &laquo;&nbsp;{`${event.name}`}
            &nbsp;&raquo;.
          </b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Buttons>
          <Form method="post" onSubmit={() => setShow(false)}>
            <DeleteButton type="submit">OK</DeleteButton>
          </Form>
          <Button type="button" onClick={() => navigate(-1)}>
            Annuler
          </Button>
        </Buttons>
      </Modal.Footer>
    </Modal>
  )
}

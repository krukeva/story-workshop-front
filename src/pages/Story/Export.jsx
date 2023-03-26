import { useOutletContext, useSubmit, useNavigate } from "react-router-dom"
import { Formik, Field, Form } from "formik"

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
  margin: 2em 1em;
  padding: 0.5em;
  min-width: 100px;
  background-color: ${colors.primary};
  color: ${colors.text};
`

const Label = styled.label`
  display: block;
  margin-top: 1em;
`
export default function ExportStory() {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  const story = useOutletContext()
  const submit = useSubmit()

  setShow(true)

  let version
  if (typeof story.version === "undefined") {
    version = [0, 0, 0]
  } else {
    version = story.version.split(".").map((digit) => parseInt(digit))
  }

  return (
    <Modal show={show} onClose={() => navigate("..")}>
      <Modal.Header>
        Export de l'histoire{" "}
        <b>
          &laquo;&nbsp;{`${story.name}`}
          &nbsp;&raquo;
        </b>{" "}
      </Modal.Header>
      <Modal.Body>
        <p>
          {version[0] + version[1] + version[2] > 0 ? (
            <span>
              La dernière version enregistrée était la v{story.version}.
            </span>
          ) : (
            <span>Aucune version n'a été exportée.</span>
          )}
        </p>
        <p>La modification à enregistrer concerne&nbsp;:</p>
        <Formik
          initialValues={{
            version: `${version[0]}.${version[1]}.${version[2] + 1}`,
          }}
          onSubmit={async (values) => {
            submit(values, { method: "post" })
          }}
        >
          <Form>
            <Label>
              <Field
                type="radio"
                name="version"
                value={`${version[0] + 1}.0.0`}
              />
              un changement majeur vers la {`v${version[0] + 1}.0.0`}
            </Label>
            <Label>
              <Field
                type="radio"
                name="version"
                value={`${version[0]}.${version[1] + 1}.0`}
              />
              un changement mineur vers la{" "}
              {`v${version[0]}.${version[1] + 1}.0`}
            </Label>
            <Label>
              <Field
                type="radio"
                name="version"
                value={`${version[0]}.${version[1]}.${version[2] + 1}`}
              />
              une correction de détail vers la{" "}
              {`v${version[0]}.${version[1]}.${version[2] + 1}`}
            </Label>
            <Buttons>
              <Button type="submit">OK</Button>
            </Buttons>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

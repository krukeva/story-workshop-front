import { useLoaderData, useNavigate, useSubmit } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, Form } from "formik"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import DataTemplate from "./DataTemplate"
import QuillEditor from "../../components/QuillEditor"
import { SubmitButton, CancelButton } from "../../components/buttons"

import { getDateAndTime } from "../../utils/functions/dates"

const Wrapper = styled.div`
  position: relative;
`
export const FixedDiv = styled.div`
  position: absolute;
  right: ${(props) => props.right || "auto"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
`

function getInitialValues(situation) {
  const diffusionDateTime = getDateAndTime(situation.diffusionDateTime)

  let initialValue = {
    name: situation.name || "",
    diffusionDate: diffusionDateTime.date || "1960-01-01",
    diffusionTime: diffusionDateTime.time || "12:00",
    content: situation.content || "",
  }
  return initialValue
}

export default function EditSituation() {
  const { situation } = useLoaderData()
  const [content, setContent] = useState(situation.content)

  const submit = useSubmit()

  const navigate = useNavigate()
  return (
    <Wrapper>
      <Formik
        initialValues={getInitialValues(situation)}
        onSubmit={async (values) => {
          const diffusionDateTime = new Date(
            values.diffusionDate.concat("T" + values.diffusionTime)
          )
          const newData = { ...values }
          newData.diffusionDateTime = diffusionDateTime
          newData.content = content
          newData.name = values.diffusionDate.concat(
            " à " + values.diffusionTime
          )

          submit(newData, {
            method: "post",
          })
        }}
      >
        <Form>
          <DataTemplate>
            <DataTemplate.Name>Point de situation</DataTemplate.Name>

            <DataTemplate.DiffusionDate>
              <Field type="date" name="diffusionDate" />
            </DataTemplate.DiffusionDate>

            <DataTemplate.DiffusionTime>
              <Field type="time" name="diffusionTime" />
            </DataTemplate.DiffusionTime>

            <DataTemplate.Content>
              <QuillEditor value={content} setValue={setContent} />
            </DataTemplate.Content>
          </DataTemplate>

          <FixedDiv bottom="15px" right="50px">
            <SubmitButton type="submit" color={colors.event} />
          </FixedDiv>
          <FixedDiv top="45px" right="50px">
            <CancelButton
              type="button"
              onClick={() => {
                navigate(-1)
              }}
              color="light-grey"
            />
          </FixedDiv>
        </Form>
      </Formik>
    </Wrapper>
  )
}

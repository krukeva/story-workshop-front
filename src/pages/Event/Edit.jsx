import { useLoaderData, useNavigate, useSubmit } from "react-router-dom"
import { Formik, Field, Form, FieldArray } from "formik"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import DataTemplate from "./DataTemplate"
import {
  SubmitButton,
  CancelButton,
  DeleteButton,
} from "../../components/buttons"

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

const StyledKeyword = styled.span`
  display: inline-flex;
  padding: 0 0.5em;
  margin: 0 0.5em;
`

const KeywordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
`

const Button = styled.button``

function getInitialValues(event) {
  const startDateTime = getDateAndTime(event.startDateTime)
  const endDateTime = getDateAndTime(event.endDateTime)

  let initialValue = {
    name: event.name || "",
    startDate: startDateTime.date || "1960-01-01",
    startTime: startDateTime.time || "12:00",
    endDate: endDateTime.date || "1960-01-01",
    endTime: endDateTime.time || "12:00",
    keywords: event.keywords
      ? event.keywords.map((word) => {
          return { word: word }
        })
      : [{ word: "" }],
    description: event.description || "",
  }
  return initialValue
}

export default function EditEvent() {
  const { event } = useLoaderData()
  const submit = useSubmit()

  const navigate = useNavigate()
  return (
    <Wrapper>
      <Formik
        initialValues={getInitialValues(event)}
        onSubmit={async (values) => {
          const startDateTime = new Date(
            values.startDate.concat("T" + values.startTime)
          )
          const endDateTime = new Date(
            values.endDate.concat("T" + values.endTime)
          )
          let keywords = []
          for (let i = 0; i < values.keywords.length; i++) {
            if (values.keywords[i].word.length > 0) {
              keywords.push(values.keywords[i].word)
            }
          }
          const newData = { ...values }
          newData.keywords = keywords.join("|")
          newData.startDateTime = startDateTime
          newData.endDateTime = endDateTime

          submit(newData, {
            method: "post",
          })
        }}
      >
        {({ values }) => (
          <Form>
            <DataTemplate>
              <DataTemplate.Name>
                <Field type="text" name="name" />
              </DataTemplate.Name>

              <DataTemplate.StartDate>
                <Field type="date" name="startDate" />
              </DataTemplate.StartDate>

              <DataTemplate.StartTime>
                <Field type="time" name="startTime" />
              </DataTemplate.StartTime>

              <DataTemplate.EndDate>
                <Field type="date" name="endDate" />
              </DataTemplate.EndDate>

              <DataTemplate.EndTime>
                <Field type="time" name="endTime" />
              </DataTemplate.EndTime>

              <DataTemplate.KeyWords>
                <FieldArray name="keywords">
                  {({ insert, remove, push }) => (
                    <KeywordGrid>
                      {values.keywords.length > 0 &&
                        values.keywords.map((word, index) => (
                          <StyledKeyword key={index}>
                            <Field
                              name={`keywords.${index}.word`}
                              placeholder="attentat, manifestation, interview,..."
                              type="text"
                            />
                            <DeleteButton
                              type="button"
                              size="25px"
                              fontSize="12px"
                              onClick={() => remove(index)}
                            />
                          </StyledKeyword>
                        ))}
                      <Button type="button" onClick={() => push({ word: "" })}>
                        Ajouter un mot-clef
                      </Button>
                    </KeywordGrid>
                  )}
                </FieldArray>
              </DataTemplate.KeyWords>

              <DataTemplate.Description>
                <Field
                  as="textarea"
                  name="description"
                  style={{ width: "100%", minHeight: "90px" }}
                />
              </DataTemplate.Description>
            </DataTemplate>

            <FixedDiv bottom="15px" right="50px">
              <SubmitButton type="submit" color={colors.organisation} />
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
        )}
      </Formik>
    </Wrapper>
  )
}

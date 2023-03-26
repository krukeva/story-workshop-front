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

function getInitialValues(situation) {
  let initialValue = {
    name: situation.name || "",
    keywords: situation.keywords
      ? situation.keywords.map((word) => {
          return { word: word }
        })
      : [{ word: "" }],
  }
  return initialValue
}

export default function EditSituation() {
  const { situation } = useLoaderData()
  const submit = useSubmit()

  const navigate = useNavigate()
  return (
    <Wrapper>
      <Formik
        initialValues={getInitialValues(situation)}
        onSubmit={async (values) => {
          let keywords = []
          for (let i = 0; i < values.keywords.length; i++) {
            if (values.keywords[i].word.length > 0) {
              keywords.push(values.keywords[i].word)
            }
          }
          const newData = { ...values }
          newData.keywords = keywords.join("|")
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
              <DataTemplate.KeyWords>
                <FieldArray name="keywords">
                  {({ insert, remove, push }) => (
                    <KeywordGrid>
                      {values.keywords.length > 0 &&
                        values.keywords.map((word, index) => (
                          <StyledKeyword key={index}>
                            <Field
                              name={`keywords.${index}.word`}
                              placeholder="Mistery Inc."
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
            </DataTemplate>

            <FixedDiv bottom="15px" right="50px">
              <SubmitButton type="submit" color={colors.situation} />
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

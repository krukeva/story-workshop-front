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

function getInitialValues(person) {
  let initialValue = {
    name: person.name || "",
    activity: person.activity || "",
    keywords: person.keywords
      ? person.keywords.map((word) => {
          return { word: word }
        })
      : [{ word: "" }],
  }
  return initialValue
}

export default function EditPerson() {
  const { person } = useLoaderData()
  const submit = useSubmit()

  const navigate = useNavigate()
  return (
    <Wrapper>
      <Formik
        initialValues={getInitialValues(person)}
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
              <DataTemplate.Activity>
                <Field type="text" name="activity" />
              </DataTemplate.Activity>
              <DataTemplate.KeyWords>
                <FieldArray name="keywords">
                  {({ insert, remove, push }) => (
                    <KeywordGrid>
                      {values.keywords.length > 0 &&
                        values.keywords.map((word, index) => (
                          <StyledKeyword key={index}>
                            <Field
                              name={`keywords.${index}.word`}
                              placeholder="Jane Doe"
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
              <SubmitButton type="submit" color={colors.person} />
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

/*
{[...person.keywords, ...newKeywords].map((keyWord, index) => {
                return (
                  <StyledKeyword key={index}>
                    <label>
                      <Field type="checkbox" name="keywords" value={keyWord} />
                      {keyWord}
                    </label>
                  </StyledKeyword>
                )
              })}
              <p>
                <label>Ajouter un mot-clef&nbsp;: </label>
                <input
                  type="text"
                  name="newWord"
                  value={newKeyword}
                  onChange={(e) => {
                    setNewKeyword(e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    if (newKeyword.length) {
                      setNewKeywords([...newKeywords, newKeyword])
                      setNewKeyword("")
                    }
                  }}
                >
                  OK
                </button>
              </p>
            */

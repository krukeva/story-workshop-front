import { useLoaderData, useSubmit, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Formik, Field, FieldArray, Form } from "formik"

import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import {
  SubmitButton,
  DeleteButton,
  CancelButton,
} from "../../components/buttons"
import QuillEditor from "../../components/QuillEditor"

import { createOneWorld } from "../../services/worldService"

const labelTranslator = {
  world: "le monde entier",
  contient: "un continent",
  region: "quelques pays",
  country: "un pays",
  subcountry: "une zone à l'intérieur d'un pays",
  city: "une ville",
  farPast: "passé éloigné",
  nearPast: "passé récent",
  current: "contemporaine",
  nearFuture: "futur proche",
  farFuture: "future lointain",
  unknown: "indéterminé",
  real: "réel",
  alternate: "alternative",
  fictional: "fictionnelle",
}

const Wrapper = styled.div`
  width: 75%;
  margin: auto;
`

const Title = styled.div`
  text-align: center;
  margin: 1em auto;
  padding: 0;
  font-size: 24px;
`
const TitleField = styled(Field)`
  text-align: left;
  margin: 1em auto;
  padding: 5px;
  font-size: 24px;
`

const WorldField = styled.div`
  width: 100%;
  margin: auto;
`

const StyledKeyword = styled.span`
  display: inline-flex;
  padding: 0 0.5em;
  margin: 0 0.5em;
`

const FieldLabel = styled.div`
  color: ${colors.primary};
  margin: 0;
  padding: 5px;
  margin-right: 1em;
`
const FieldValue = styled.div`
  border-bottom: 2px solid ${colors.primary};
  padding: 5px 0;
  margin: 0;
  min-width: 100px;
  text-align: center;
`

const DateGrid = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  padding-left: 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
`
const GridDataField = styled.div`
  margin: 0;
  margin-bottom: 1em;
  padding: 0;
  display: flex;
  flex-direction: line;
  justify-content: flex-start;
  text-align: left;
`

const Description = styled.div`
  width:100%
  margin: 0;
  padding: 0;
  border: 2px solid ${colors.primary};
  border-radius: 5px;
  min-height: 200px;
  text-align: left;
  padding: 1%;
  margin : 1.5em auto;
`

const Button = styled.button``

export default function EditStory() {
  const { story, worlds } = useLoaderData()
  const [description, setDescription] = useState(story.description) || ""
  const submit = useSubmit()
  const navigate = useNavigate()

  // Necessary for the mapping in case story.keywords is undefined
  story.keywords = (Array.isArray(story.keywords) && story.keywords) || []

  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: story.name || "",
          startDate: story.startDate,
          endDate: story.endDate,
          worldId: story.worldId,
          keywords: story.keywords
            ? story.keywords.map((word) => {
                return { word: word }
              })
            : [{ word: "" }],
        }}
        onSubmit={async (values) => {
          const newStory = { ...values } //necessary to avoid changing the value in the Form

          // If the world must fist be created
          if (!values.worldId) {
            const newWorld = {
              name: `Monde à concevoir pour l'histoire ${
                "\u00AB\u00A0" + values.name + "\u00A0\u00BB"
              }`,
              description: `<p>L'histoire &#171;&#160;${values.name}&#160;&#187; se déroule dans un monde qui n'a pas encore été défini.<p>`,
            }

            if (typeof values.startDate === "string") {
              const situation = {
                date: values.startDate,
                time: "00:00",
                document: "<p>Il faudra définir une situation initiale.</p>",
              }
              newWorld.situation = situation
            }
            const world = await createOneWorld(newWorld)
            newStory.worldId = world.id
          }

          // Dealing with keywords
          let keywords = []
          for (let i = 0; i < values.keywords.length; i++) {
            if (values.keywords[i].word.length > 0) {
              keywords.push(values.keywords[i].word)
            }
          }
          newStory.keywords = keywords.join("|")

          // Getting the description from the Quill writer
          newStory.description = description

          console.log(newStory)

          submit(newStory, {
            method: "post",
          })
        }}
      >
        {({ values }) => (
          <Form>
            <Title>
              <FieldLabel>
                <label htmlFor="name">Titre&nbsp;: </label>
                <TitleField type="text" name="name" />
              </FieldLabel>
            </Title>

            <FieldLabel>
              <label htmlFor="worldId">Monde&nbsp;: </label>
            </FieldLabel>
            <WorldField name="worldId" as="select">
              <option value={null}>Un monde à créer</option>
              {worlds.map((world) => (
                <option key={world.id} value={world.id}>
                  {world.name} ( échelle&nbsp;:{" "}
                  {typeof world.scale === "string" && world.scale.length > 2
                    ? labelTranslator[world.scale] || world.scale
                    : "non déterminée"}
                  , période&nbsp;:{" "}
                  {typeof world.era === "string" && world.era.length > 2
                    ? labelTranslator[world.era] || world.era
                    : "non déterminée"}
                  , géopolitique&nbsp;:{" "}
                  {typeof world.geopolitics === "string" &&
                  world.geopolitics.length > 2
                    ? labelTranslator[world.geopolitics] || world.geopolitics
                    : "non déterminée"}
                  )
                </option>
              ))}
            </WorldField>
            <Description>
              <DateGrid>
                <GridDataField>
                  <FieldLabel>
                    <label htmlFor="startDate">Date de début&nbsp;: </label>
                  </FieldLabel>
                  <FieldValue>
                    <Field type="date" name="startDate" />
                  </FieldValue>
                </GridDataField>

                <GridDataField>
                  <FieldLabel>
                    <label htmlFor="name">Date de fin&nbsp;: </label>
                  </FieldLabel>
                  <FieldValue>
                    <Field type="date" name="endDate" />
                  </FieldValue>
                </GridDataField>
              </DateGrid>

              <FieldLabel>Description</FieldLabel>
              <QuillEditor value={description} setValue={setDescription} />
            </Description>

            <FieldLabel>Mots-clefs</FieldLabel>
            <FieldArray name="keywords">
              {({ insert, remove, push }) => (
                <>
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
                </>
              )}
            </FieldArray>

            <FixedDiv top="80px" right="80px">
              <SubmitButton type="submit" />
            </FixedDiv>
            <FixedDiv top="80px" left="50px">
              <CancelButton
                type="button"
                color="light-grey"
                onClick={() => {
                  navigate(-1)
                }}
              />
            </FixedDiv>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

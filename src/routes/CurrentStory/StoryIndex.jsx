import { useOutletContext, useFetcher, useSubmit } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import QuillReader from "../../components/QuillReader"
import QuillEditor from "../../components/QuillEditor"
import { ButtonStyledAsDiv } from "../../utils/styles/Atoms"

//import { EditButton } from "../../components/buttons"

const Wrapper = styled.div`
  width: 50%;
  margin: auto;
`
const Title = styled.div`
  text-align: center;
  margin: 1em auto;
  padding: 0;
  font-size: 24px;
`
const Subtitle = styled.p`
  margin: 1em 0;
  padding: 0;
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
`
const ChangeButton = styled(ButtonStyledAsDiv)`
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`
const TitleChangeButton = styled(ChangeButton)`
  font-size: 24px;
`

const WideChangeButton = styled(ChangeButton)`
  width: 100%;
`

export default function StoryIndex() {
  const story = useOutletContext()
  const fetcher = useFetcher()
  const submit = useSubmit()

  const [editTitle, setEditTitle] = useState(false)

  const [editStartDate, setEditStartDate] = useState(false)
  const [editEndDate, setEditEndDate] = useState(false)

  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState(story.description)

  return (
    <Wrapper>
      <Title>
        {editTitle ? (
          <fetcher.Form method="post" onSubmit={() => setEditTitle(false)}>
            <input type="text" name="name" defaultValue={story.name} />
            <button type="submit">OK</button>
            <button
              type="button"
              onClick={() => {
                setEditTitle(false)
              }}
            >
              Annuler
            </button>
          </fetcher.Form>
        ) : (
          <TitleChangeButton type="button" onClick={() => setEditTitle(true)}>
            {story.name || "no name"}
          </TitleChangeButton>
        )}
      </Title>

      <DateGrid>
        <GridDataField>
          <FieldLabel>
            <label htmlFor="name">Date de début&nbsp;: </label>
          </FieldLabel>
          <FieldValue>
            {editStartDate ? (
              <fetcher.Form
                method="post"
                onSubmit={() => setEditStartDate(false)}
              >
                <input
                  type="date"
                  name="startDate"
                  defaultValue={story.startDate || "1960-01-01"}
                />
                <button type="submit">OK</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditStartDate(false)
                  }}
                >
                  Annuler
                </button>
              </fetcher.Form>
            ) : (
              <ChangeButton
                type="button"
                onClick={() => setEditStartDate(true)}
              >
                {new Date(story.startDate).toLocaleDateString("fr-FR") || "???"}
              </ChangeButton>
            )}
          </FieldValue>
        </GridDataField>

        <GridDataField>
          <FieldLabel>
            <label htmlFor="name">Date de fin&nbsp;: </label>
          </FieldLabel>
          <FieldValue>
            {editEndDate ? (
              <fetcher.Form
                method="post"
                onSubmit={() => setEditEndDate(false)}
              >
                <input
                  type="date"
                  name="endDate"
                  defaultValue={story.endDate || "1960-01-01"}
                />
                <button type="submit">OK</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditEndDate(false)
                  }}
                >
                  Annuler
                </button>
              </fetcher.Form>
            ) : (
              <ChangeButton type="button" onClick={() => setEditEndDate(true)}>
                {new Date(story.endDate).toLocaleDateString("fr-FR") || "???"}
              </ChangeButton>
            )}
          </FieldValue>
        </GridDataField>
      </DateGrid>

      <Subtitle>Description</Subtitle>

      {editDescription ? (
        <Description>
          <QuillEditor value={description} setValue={setDescription} />
          <button
            type="button"
            onClick={() => {
              setEditDescription(false)
              submit(
                {
                  description: description,
                },
                {
                  method: "post",
                }
              )
            }}
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => {
              setEditDescription(false)
              setDescription(story.description)
            }}
          >
            Annuler
          </button>
        </Description>
      ) : (
        <WideChangeButton
          type="button"
          onClick={() => setEditDescription(true)}
        >
          <Description>
            {story.description && story.description.length > 0 ? (
              <>
                <QuillReader value={story.description} />
              </>
            ) : (
              <>
                <em>aucune description...</em>
              </>
            )}
          </Description>
        </WideChangeButton>
      )}
    </Wrapper>
  )
}

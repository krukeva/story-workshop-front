import { useLoaderData, useSubmit, Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"

import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import DataTemplate from "./DataTemplate"
import {
  EditButton,
  SubmitButton,
  ExportButton,
} from "../../components/buttons"
import QuillEditor from "../../components/QuillEditor"
import QuillReader from "../../components/QuillReader"

import { getStory } from "../../database/stories"
import { getWorld, getWorlds } from "../../database/worlds"

const StyledKeyword = styled.span`
  display: inline-block;
  background-color: ${colors.lightPrimary};
  padding: 0 0.5em;
  margin: 0 0.5em;
`

export async function loader({ params }) {
  const story = await getStory(params.storyId)
  if (!story) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  const world = story.worldId ? await getWorld(story.worldId) : null
  const worlds = await getWorlds()
  return { story, world, worlds }
}

export default function Story() {
  const { story, world, worlds } = useLoaderData()
  const [editData, setEditData] = useState(false)
  const [description, setDescription] = useState(story.description) || ""
  const [newKeyword, setNewKeyword] = useState("")
  const [newKeywords, setNewKeywords] = useState([])
  const submit = useSubmit()
  const navigate = useNavigate()

  // Necessary for the mapping in case story.keywords is undefined
  story.keywords = (Array.isArray(story.keywords) && story.keywords) || []

  useEffect(() => {
    if (!story.name || story.name === "") {
      setEditData(true)
    }
  }, [story.name])

  return (
    <div className="pageContainer withBackground">
      {editData ? (
        <Formik
          initialValues={{
            name: story.name || "",
            startDate: story.startDate,
            endDate: story.endDate,
            worldId: story.worldId,
            keywords: [...story.keywords],
          }}
          onSubmit={async (newData) => {
            console.log(newData.startDate)
            newData.description = description
            newData.keywords = newData.keywords.join("|")
            submit(newData, {
              method: "post",
              action: `/stories/${story.id}/update`,
            })
            setEditData(false)
          }}
        >
          <Form>
            <DataTemplate>
              <DataTemplate.Name>
                <Field type="text" name="name" />
              </DataTemplate.Name>

              <DataTemplate.StartDate>
                <Field type="date" name="startDate" />
              </DataTemplate.StartDate>

              <DataTemplate.EndDate>
                <Field type="date" name="endDate" />
              </DataTemplate.EndDate>

              <DataTemplate.World>
                <Field name="worldId" as="select">
                  <option value={null}>--</option>
                  {worlds.map((world) => (
                    <option key={world.id} value={world.id}>
                      {world.name}
                    </option>
                  ))}
                </Field>
              </DataTemplate.World>

              <DataTemplate.KeyWords>
                {[...story.keywords, ...newKeywords].map((keyWord, index) => {
                  return (
                    <StyledKeyword key={index}>
                      <label>
                        <Field
                          type="checkbox"
                          name="keywords"
                          value={keyWord}
                        />
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
              </DataTemplate.KeyWords>

              <DataTemplate.Description>
                <QuillEditor value={description} setValue={setDescription} />
              </DataTemplate.Description>
            </DataTemplate>

            <FixedDiv top="80px" right="80px">
              <SubmitButton type="submit" />
            </FixedDiv>
          </Form>
        </Formik>
      ) : (
        <>
          <FixedDiv top="80px" right="80px">
            <EditButton onClick={() => setEditData(true)} />
          </FixedDiv>
          <FixedDiv top="80px" left="80px">
            <ExportButton onClick={() => navigate("export")} />
          </FixedDiv>

          <DataTemplate>
            <DataTemplate.Name>
              <span>{story.name || ""}</span>
            </DataTemplate.Name>

            <DataTemplate.StartDate>
              <span>
                {(typeof myVar === "string" && story.startDate) || ""}
              </span>
            </DataTemplate.StartDate>

            <DataTemplate.EndDate>
              <span>{(typeof myVar === "string" && story.endDate) || ""}</span>
            </DataTemplate.EndDate>

            <DataTemplate.World>
              <span>{(world && world.name) || ""}</span>
            </DataTemplate.World>

            <DataTemplate.KeyWords>
              {story.keywords &&
                story.keywords.map((keyword, index) => (
                  <span key={index}>
                    {keyword}
                    {index < story.keywords.length - 1 && ", "}
                  </span>
                ))}
            </DataTemplate.KeyWords>

            <DataTemplate.Description>
              <QuillReader value={story.description} />
            </DataTemplate.Description>
          </DataTemplate>
        </>
      )}
      <Outlet context={story} />
    </div>
  )
}

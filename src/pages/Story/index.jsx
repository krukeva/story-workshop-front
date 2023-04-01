import { useLoaderData, Outlet, useNavigate, NavLink } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import { FixedDiv } from "../../utils/styles/Atoms"
import { ExportButton } from "../../components/buttons"
import QuillReader from "../../components/QuillReader"
import { KeywordData } from "../../utils/templates/KeywordsData"

import { getStory } from "../../database/stories"
import { getWorld, getWorlds } from "../../database/worlds"
import { loadStory } from "../../services/currentStoryService"

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
const H2 = styled.h2`
  margin: 1em 0;
  padding: 0;
  color: ${colors.lightPrimary};
  display: flex;
  flex-direction: line;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${colors.primary};
  padding-bottom: 1em;
`
const StoryName = styled.span`
  color: ${colors.primary};
`

const LoadButton = styled.button`
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 10px;
  margin: 0;
  padding: 10px;
  background-color: ${colors.primary};
  color: ${colors.text};
  font-size: 20px;
  font-family: sans-serif; /* Use whatever font-family you want */
  line-height: 1;
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

const FieldValue = styled.span`
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
  min-width: 100px;
  text-align: center;
  display: inline-block;
`

const DateSpan = styled.span`
  display: inline-block;
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

const Metadata = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-around;
`

const Block = styled.div`
  width: 33%;
`

const BlockTitle = styled.p`
  margin: 1em 0;
  padding: 0;
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
  const { story, world } = useLoaderData()
  const navigate = useNavigate()
  return (
    <div>
      <FixedDiv top="80px" left="80px">
        <ExportButton onClick={() => navigate("export")} />
      </FixedDiv>

      <Wrapper>
        <H2>
          <div>
            Histoire&nbsp;:{" "}
            <StoryName>
              &laquo;&nbsp;{story.name || "no name"}&nbsp;&raquo;
            </StoryName>
          </div>
          <LoadButton
            onClick={async () => {
              await loadStory(story.id)
              navigate(`/story`)
            }}
          >
            Charger cette histoire
          </LoadButton>
        </H2>

        <p>
          Cette histoire se déroule dans le monde &laquo;&nbsp;
          <NavLink to={`/worlds/${world.id}`}>{world.name}</NavLink>
          &nbsp;&raquo;{" "}
          <DateSpan>
            entre le
            <FieldValue>
              {new Date(story.startDate).toLocaleDateString("fr-FR") || "???"}
            </FieldValue>
            et le
            <FieldValue>
              {new Date(story.endDate).toLocaleDateString("fr-FR") || "???"}.
            </FieldValue>
          </DateSpan>
        </p>

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
        <Metadata>
          <Block>
            <BlockTitle>Mots-clefs</BlockTitle>
            <ul>
              <li>
                <KeywordData keywords={story.keywords} label="de l'histoire" />
              </li>
              <li>
                <KeywordData keywords={world.keywords} label="du monde" />
              </li>
            </ul>
          </Block>
          <Block>
            <BlockTitle>Métadonnées du monde</BlockTitle>
            <ul>
              <li>
                Echelle&nbsp;:{" "}
                {typeof world.scale === "string" && world.scale.length > 2 ? (
                  <span>{labelTranslator[world.scale] || world.scale}</span>
                ) : (
                  <em>inconnue</em>
                )}
              </li>
              <li>
                Période&nbsp;:{" "}
                {typeof world.era === "string" && world.era.length > 2 ? (
                  <span>{labelTranslator[world.era] || world.era}</span>
                ) : (
                  <em>inconnue</em>
                )}
              </li>
              <li>
                Géopolitique&nbsp;:{" "}
                {typeof world.geopolitics === "string" &&
                world.geopolitics.length > 2 ? (
                  <span>
                    {labelTranslator[world.geopolitics] || world.geopolitics}
                  </span>
                ) : (
                  <em>inconnue</em>
                )}
              </li>
            </ul>
          </Block>
        </Metadata>
      </Wrapper>
      <Outlet context={story} />
    </div>
  )
}

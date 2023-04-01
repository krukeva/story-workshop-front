import { useLoaderData, Outlet } from "react-router-dom"
import styled from "styled-components"

import colors from "../../utils/styles/colors"
import QuillReader from "../../components/QuillReader"
import { KeywordData } from "../../utils/templates/KeywordsData"
import HorizontalTabs from "../../utils/templates/HorizontalTabs"

import { getWorld } from "../../database/worlds"

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
  text-align: left;
  width: 75%;
  margin: auto;
`
const H2 = styled.h2`
  margin: 1em 0;
  padding: 0;
  color: ${colors.lightPrimary};
`
const WorldName = styled.span`
  color: ${colors.primary};
`

const H4 = styled.h4`
  margin: 1em 0;
  padding: 0;
`
const Metadata = styled.div`
  margin: 0;
  padding: 0 2em;
  display: flex;
  flex-direction: line;
  justify-content: space-between;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`
const KeyWords = styled.div`
  margin: 0;
  padding: 0 2em;
  display: block;
  & p {
    margin: 0;
    padding: 1em 0;
  }
`

const Description = styled.div`
  margin: 0;
  padding: 0;
  min-height: 200px;
  text-align: left;
  padding: 1%;
`

export async function loader({ params }) {
  const world = await getWorld(params.worldId)
  if (!world) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { world }
}

export default function World() {
  const { world } = useLoaderData()

  return (
    <div>
      <Wrapper>
        <H2>
          Monde&nbsp;:{" "}
          <WorldName>&laquo;&nbsp;{world.name}&nbsp;&raquo;</WorldName>
        </H2>

        <HorizontalTabs>
          <HorizontalTabs.TabItem buttonLabel={"Description"}>
            <h4>Description</h4>
            <Description>
              {world.description && world.description.length > 0 ? (
                <>
                  <QuillReader value={world.description} />
                </>
              ) : (
                <>
                  <em>aucune description...</em>
                </>
              )}
            </Description>
            <h4>Métadonnées</h4>
            <Metadata>
              <p>
                Echelle&nbsp;:{" "}
                {world.scale !== "undefined" ? (
                  <span>{labelTranslator[world.scale] || world.scale}</span>
                ) : (
                  <em>non déterminée</em>
                )}
              </p>
              <p>
                Période&nbsp;:{" "}
                {world.era !== "undefined" ? (
                  <span>{labelTranslator[world.era] || world.era}</span>
                ) : (
                  <em>non déterminée</em>
                )}
              </p>
              <p>
                Géopolitique&nbsp;:{" "}
                {world.geopolitics !== "undefined" ? (
                  <span>
                    {labelTranslator[world.geopolitics] || world.geopolitics}
                  </span>
                ) : (
                  <em>non déterminée</em>
                )}
              </p>
            </Metadata>
            <KeyWords>
              <KeywordData keywords={world.keywords} />
            </KeyWords>
          </HorizontalTabs.TabItem>

          <HorizontalTabs.TabItem buttonLabel={"Situation intiale"}>
            {world.situation && typeof world.situation === "object" ? (
              <>
                <H4>
                  Situation{" "}
                  {typeof world.situation.date === "string"
                    ? ` au ${new Date(
                        world.situation.date
                      ).toLocaleDateString()}`
                    : " initiale"}
                </H4>
                <QuillReader value={world.situation.document} />
              </>
            ) : (
              <H4>Situation non renseignée</H4>
            )}
          </HorizontalTabs.TabItem>

          <HorizontalTabs.TabItem buttonLabel={"Données"}>
            {typeof world.data === "object" ? (
              <div>
                <p>
                  Personnes&nbsp;({world.data.people.length.toString()})&nbsp;:{" "}
                  {world.data.people.map((item, index) => (
                    <span key={item.id}>
                      {`${item.name} (${item.activity})` +
                        (index < world.data.people.length - 1 ? ", " : ".")}
                    </span>
                  ))}{" "}
                </p>

                <p>
                  Organisations&nbsp;(
                  {world.data.organisations.length.toString()}
                  )&nbsp;:{" "}
                  {world.data.organisations.map((item, index) => (
                    <span key={item.id}>
                      {item.name +
                        (index < world.data.organisations.length - 1
                          ? ", "
                          : ".")}
                    </span>
                  ))}{" "}
                </p>

                <p>
                  Equipements&nbsp;({world.data.equipments.length.toString()}
                  )&nbsp;:{" "}
                  {world.data.equipments.map((item, index) => (
                    <span key={item.id}>
                      {item.name +
                        (index < world.data.equipments.length - 1 ? ", " : ".")}
                    </span>
                  ))}{" "}
                </p>

                <p>
                  Lieux&nbsp;({world.data.sites.length.toString()})&nbsp;:{" "}
                  {world.data.sites.map((item, index) => (
                    <span key={item.id}>
                      {item.name +
                        (index < world.data.sites.length - 1 ? ", " : ".")}
                    </span>
                  ))}{" "}
                </p>
              </div>
            ) : (
              <p>Ce monde n'a pas encore de données.</p>
            )}
          </HorizontalTabs.TabItem>
        </HorizontalTabs>
      </Wrapper>

      <Outlet context={world} />
    </div>
  )
}

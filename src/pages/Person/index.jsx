import { Form, useLoaderData, useFetcher, Outlet } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { getOnePerson } from "../../services/personService"
import colors from "../../utils/styles/colors"
import { RoundButton } from "../../utils/styles/Atoms"
import DataTemplate from "./DataTemplate"
import { EditButton, DeleteButton } from "../../components/buttons"

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

const StarredName = styled.div`
  display: flex;
  flex-direction: line;
  justify-content: space-between;
`
const StarDiv = styled.span`
  color: ${(prop) => (prop.state !== "true" ? "yellow" : "grey")};
`
function StarButton({ name, value, size, fontSize }) {
  return (
    <RoundButton
      name={name}
      value={value}
      color={value !== "true" ? colors.person : "none"}
      size={size}
      fontSize={fontSize}
    >
      <StarDiv state={value}>
        <FontAwesomeIcon icon={faStar} />
      </StarDiv>
    </RoundButton>
  )
}

export async function loader({ params }) {
  const person = await getOnePerson(params.personId)
  if (!person) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { person }
}

export default function Person() {
  const { person } = useLoaderData()

  return (
    <Wrapper>
      <FixedDiv top="15px" right="50px">
        <Form action="edit">
          <EditButton type="submit" color={colors.person} />
        </Form>
      </FixedDiv>
      <FixedDiv top="15px" left="50px">
        <Form action="delete">
          <DeleteButton type="submit" />
        </Form>
      </FixedDiv>
      <DataTemplate>
        <DataTemplate.Name>
          <StarredName>
            <span>{person.name || ""}</span>
            {typeof person.worldId === "string" ? (
              <span>
                <FontAwesomeIcon icon={faGlobe} />
              </span>
            ) : (
              <Favorite person={person} />
            )}
          </StarredName>
        </DataTemplate.Name>
        <DataTemplate.Activity>
          <span>{person.activity || ""}</span>
        </DataTemplate.Activity>
        <DataTemplate.KeyWords>
          {person.keywords &&
            person.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < person.keywords.length - 1 && ", "}
              </span>
            ))}
        </DataTemplate.KeyWords>
      </DataTemplate>
      <Outlet context={person} />
    </Wrapper>
  )
}

function Favorite({ person }) {
  const fetcher = useFetcher()

  let favorite = person.favorite
  //Optimistic UI : the change of value value is anticipated
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true"
  }

  return (
    <fetcher.Form method="post">
      <StarButton
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        size="25px"
        fontSize="12px"
      />
    </fetcher.Form>
  )
}

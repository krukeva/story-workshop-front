import { Form, useLoaderData, Outlet } from "react-router-dom"
import styled from "styled-components"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import colors from "../../utils/styles/colors"
import DataTemplate from "./DataTemplate"
import { EditButton, DeleteButton } from "../../components/buttons"

import { getOneSequence } from "../../services/sequenceService"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const FixedDiv = styled.div`
  position: absolute;
  right: ${(props) => props.right || "auto"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
`

export async function loader({ params }) {
  const sequence = await getOneSequence(params.sequenceId)
  if (!sequence) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { sequence }
}

export default function Sequence() {
  const { sequence } = useLoaderData()

  return (
    <Wrapper>
      {sequence.name}
      {/*<FixedDiv top="15px" right="50px">
        <Form action="edit">
          <EditButton type="submit" color={colors.event} />
        </Form>
      </FixedDiv>
      <FixedDiv top="15px" left="50px">
        <Form action="delete">
          <DeleteButton type="submit" />
        </Form>
      </FixedDiv>
      <DataTemplate>
        <DataTemplate.Name>
          <span>{event.name || ""}</span>
        </DataTemplate.Name>

        <DataTemplate.StartDate>
          <span>
            {format(new Date(event.startDateTime), "E dd MMM yyyy", {
              locale: fr,
            })}
          </span>
        </DataTemplate.StartDate>

        <DataTemplate.StartTime>
          <span>
            {format(new Date(event.startDateTime), "HH:mm", {
              locale: fr,
            })}
          </span>
        </DataTemplate.StartTime>

        <DataTemplate.EndDate>
          <span>
            {format(new Date(event.endDateTime), "E dd MMM yyyy", {
              locale: fr,
            })}
          </span>
        </DataTemplate.EndDate>

        <DataTemplate.EndTime>
          <span>
            {format(new Date(event.endDateTime), "HH:mm", {
              locale: fr,
            })}
          </span>
        </DataTemplate.EndTime>

        <DataTemplate.KeyWords>
          {event.keywords &&
            event.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword}
                {index < event.keywords.length - 1 && ", "}
              </span>
            ))}
        </DataTemplate.KeyWords>

        <DataTemplate.Description>
          <span>
            {event.description || <i>Aucune description disponible.</i>}
          </span>
        </DataTemplate.Description>
            </DataTemplate>*/}

      {/*<Outlet context={situatii} />*/}
    </Wrapper>
  )
}

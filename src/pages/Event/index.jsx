import { Form, useLoaderData, Outlet } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import DataTemplate from "./DataTemplate"
import { EditButton, DeleteButton } from "../../components/buttons"

import { getOneEvent } from "../../services/eventService"

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
  const event = await getOneEvent(params.eventId)
  if (!event) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { event }
}

export default function Event() {
  const { event } = useLoaderData()

  return (
    <Wrapper>
      <FixedDiv top="15px" right="50px">
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
            {new Date(event.startDateTime).toLocaleDateString("fr-FR")}
          </span>
        </DataTemplate.StartDate>

        <DataTemplate.StartTime>
          <span>
            {new Date(event.startDateTime).toLocaleTimeString("fr-FR")}
          </span>
        </DataTemplate.StartTime>

        <DataTemplate.EndDate>
          <span>{new Date(event.endDateTime).toLocaleDateString("fr-FR")}</span>
        </DataTemplate.EndDate>

        <DataTemplate.EndTime>
          <span>{new Date(event.endDateTime).toLocaleTimeString("fr-FR")}</span>
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
      </DataTemplate>

      <Outlet context={event} />
    </Wrapper>
  )
}

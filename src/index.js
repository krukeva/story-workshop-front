import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom"

import GlobalStyle from "./utils/styles/GlobalStyle"

import Root from "./routes/root"
import ErrorPage from "./routes/Error"

import CurrentStoryWorkspace, {
  loader as storyRootLoader,
} from "./routes/CurrentStory"
import StoryIndex from "./routes/CurrentStory/StoryIndex"
import {
  actionUpdateCurrentStory,
  actionSaveCurrentStory,
} from "./controllers/currentStoryController"

import People, { loader as peopleLoader } from "./routes/People"
import PeopleIndex from "./routes/People/PeopleIndex"
import Person, { loader as personLoader } from "./pages/Person"
import EditPerson from "./pages/Person/Edit"
import DeletePerson from "./pages/Person/Delete"
import {
  actionCreatePerson,
  actionUpdatePerson,
  actionUpdateWithoutMutation,
  actionDeletePerson,
} from "./controllers/personController"

import Organisations, {
  loader as organisationListLoader,
} from "./routes/Organisations"
import OrganisationIndex from "./routes/Organisations/OrganisationIndex"
import Organisation, {
  loader as organisationLoader,
} from "./pages/Organisation"
import EditOrganisation from "./pages/Organisation/Edit"
import DeleteOrganisation from "./pages/Organisation/Delete"
import {
  actionCreateOrganisation,
  actionUpdateOrganisation,
  actionUpdateOrganisationWithoutMutation,
  actionDeleteOrganisation,
} from "./controllers/organisationController"

import Equipments, { loader as equipmentListLoader } from "./routes/Equipments"
import EquipmentIndex from "./routes/Equipments/EquipmentIndex"
import Equipment, { loader as equipmentLoader } from "./pages/Equipment"
import EditEquipment from "./pages/Equipment/Edit"
import DeleteEquipment from "./pages/Equipment/Delete"
import {
  actionCreateEquipment,
  actionUpdateEquipment,
  actionUpdateEquipmentWithoutMutation,
  actionDeleteEquipment,
} from "./controllers/equipmentController"

import Sites, { loader as siteListLoader } from "./routes/Sites"
import SiteIndex from "./routes/Sites/SiteIndex"
import Site, { loader as siteLoader } from "./pages/Site"
import EditSite from "./pages/Site/Edit"
import DeleteSite from "./pages/Site/Delete"
import {
  actionCreateSite,
  actionUpdateSite,
  actionUpdateSiteWithoutMutation,
  actionDeleteSite,
} from "./controllers/siteController"

import Events, { loader as eventListLoader } from "./routes/Events"
import EventIndex from "./routes/Events/EventIndex"
import Event, { loader as eventLoader } from "./pages/Event"
import EditEvent from "./pages/Event/Edit"
import DeleteEvent from "./pages/Event/Delete"
import {
  actionCreateEvent,
  actionUpdateEvent,
  actionUpdateEventWithoutMutation,
  actionDeleteEvent,
} from "./controllers/eventController"

import Situations, { loader as situationListLoader } from "./routes/Situations"
import SituationIndex from "./routes/Situations/SituationIndex"
import Situation, { loader as situationLoader } from "./pages/Situation"
import EditSituation from "./pages/Situation/Edit"
import DeleteSituation from "./pages/Situation/Delete"
import {
  actionCreateSituation,
  actionUpdateSituation,
  actionUpdateSituationWithoutMutation,
  actionDeleteSituation,
} from "./controllers/situationController"

/////////////////////////////////////////////////
// Story catalogue
/////////////////////////////////////////////////
import StoryManager from "./routes/StoryManager"
import Stories, { loader as storyListLoader } from "./pages/Stories"
import Story, { loader as storyLoader } from "./pages/Story"
import EditStory from "./pages/Story/Edit"
import DeleteStory from "./pages/Story/Delete"
import ExportStory from "./pages/Story/Export"
import {
  actionCreateStory,
  actionUpdateStory,
  actionDeleteStory,
  actionExportStory,
} from "./controllers/storyController"

/////////////////////////////////////////////////
// World catalogue
/////////////////////////////////////////////////
import WorldManager from "./routes/WorldManager"
import Worlds, { loader as worldListLoader } from "./pages/Worlds"
import World, { loader as worldLoader } from "./pages/World"
import DeleteWorld from "./pages/World/Delete"
import {
  actionDeleteWorld,
  actionLoadWorlds,
} from "./controllers/worldController"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: () => redirect("story"),
    errorElement: <ErrorPage />,
  },
  {
    path: "story",
    element: <CurrentStoryWorkspace />,
    loader: storyRootLoader,
    action: actionSaveCurrentStory,
    children: [
      {
        index: true,
        element: <StoryIndex />,
        action: actionUpdateCurrentStory,
        errorElement: <div>Oops! There was a problem with loading.</div>,
      },
      {
        path: "people",
        element: <People />,
        loader: peopleLoader,
        action: actionCreatePerson,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <PeopleIndex />,
              },
              {
                path: ":personId",
                element: <Person />,
                loader: personLoader,
                action: actionUpdateWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeletePerson />,
                    action: actionDeletePerson,
                    errorElement: (
                      <div>Oops! There was an error deleting the person!</div>
                    ),
                  },
                ],
              },
              {
                path: ":personId/edit",
                element: <EditPerson />,
                loader: personLoader,
                action: actionUpdatePerson,
              },
            ],
          },
        ],
      },
      {
        path: "organisations",
        element: <Organisations />,
        loader: organisationListLoader,
        action: actionCreateOrganisation,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <OrganisationIndex />,
              },
              {
                path: ":organisationId",
                element: <Organisation />,
                loader: organisationLoader,
                action: actionUpdateOrganisationWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeleteOrganisation />,
                    action: actionDeleteOrganisation,
                    errorElement: (
                      <div>
                        Oops! There was an error deleting the organisation!
                      </div>
                    ),
                  },
                ],
              },
              {
                path: ":organisationId/edit",
                element: <EditOrganisation />,
                loader: organisationLoader,
                action: actionUpdateOrganisation,
              },
            ],
          },
        ],
      },
      {
        path: "equipments",
        element: <Equipments />,
        loader: equipmentListLoader,
        action: actionCreateEquipment,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <EquipmentIndex />,
              },
              {
                path: ":equipmentId",
                element: <Equipment />,
                loader: equipmentLoader,
                action: actionUpdateEquipmentWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeleteEquipment />,
                    action: actionDeleteEquipment,
                    errorElement: (
                      <div>
                        Oops! There was an error deleting the organisation!
                      </div>
                    ),
                  },
                ],
              },
              {
                path: ":equipmentId/edit",
                element: <EditEquipment />,
                loader: equipmentLoader,
                action: actionUpdateEquipment,
              },
            ],
          },
        ],
      },
      {
        path: "sites",
        element: <Sites />,
        loader: siteListLoader,
        action: actionCreateSite,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <SiteIndex />,
              },
              {
                path: ":siteId",
                element: <Site />,
                loader: siteLoader,
                action: actionUpdateSiteWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeleteSite />,
                    action: actionDeleteSite,
                    errorElement: (
                      <div>Oops! There was an error deleting the site!</div>
                    ),
                  },
                ],
              },
              {
                path: ":siteId/edit",
                element: <EditSite />,
                loader: siteLoader,
                action: actionUpdateSite,
              },
            ],
          },
        ],
      },
      {
        path: "events",
        element: <Events />,
        loader: eventListLoader,
        action: actionCreateEvent,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <EventIndex />,
              },
              {
                path: ":eventId",
                element: <Event />,
                loader: eventLoader,
                action: actionUpdateEventWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeleteEvent />,
                    action: actionDeleteEvent,
                    errorElement: (
                      <div>Oops! There was an error deleting the event!</div>
                    ),
                  },
                ],
              },
              {
                path: ":eventId/edit",
                element: <EditEvent />,
                loader: eventLoader,
                action: actionUpdateEvent,
              },
            ],
          },
        ],
      },
      {
        path: "situations",
        element: <Situations />,
        loader: situationListLoader,
        action: actionCreateSituation,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <SituationIndex />,
              },
              {
                path: ":situationId",
                element: <Situation />,
                loader: situationLoader,
                action: actionUpdateSituationWithoutMutation,
                children: [
                  {
                    path: "delete",
                    element: <DeleteSituation />,
                    action: actionDeleteSituation,
                    errorElement: (
                      <div>
                        Oops! There was an error deleting the situation!
                      </div>
                    ),
                  },
                ],
              },
              {
                path: ":situationId/edit",
                element: <EditSituation />,
                loader: situationLoader,
                action: actionUpdateSituation,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/stories",
    element: <StoryManager />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Stories />,
        loader: storyListLoader,
        action: actionCreateStory,
      },
      {
        path: ":storyId",
        element: <Story />,
        loader: storyLoader,
        children: [
          {
            path: "export",
            element: <ExportStory />,
            action: actionExportStory,
          },
          {
            path: "delete",
            element: <DeleteStory />,
            action: actionDeleteStory,
          },
        ],
      },
      {
        path: ":storyId/edit",
        element: <EditStory />,
        loader: storyLoader,
        action: actionUpdateStory,
      },
    ],
  },
  {
    path: "worlds",
    element: <WorldManager />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Worlds />,
        loader: worldListLoader,
        action: actionLoadWorlds,
      },
      {
        path: ":worldId",
        element: <World />,
        loader: worldLoader,
        children: [
          {
            path: "delete",
            element: <DeleteWorld />,
            action: actionDeleteWorld,
          },
        ],
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
)

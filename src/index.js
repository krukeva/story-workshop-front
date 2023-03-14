import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import GlobalStyle from './utils/styles/GlobalStyle'

import Root from "./routes/root"
import ErrorPage from './pages/Error'

import Stories, {loader as storyListLoader} from './pages/Stories'
import { actionCreateStory, actionUpdateStory, actionDeleteStory } from "./pages/Story/actions.js"
import DeleteStory from './pages/Story/Delete'
import Story, { loader as storyLoader } from "./pages/Story"

import Worlds, {loader as worldListLoader, action as worldUpload} from './pages/Worlds'
import { actionDeleteWorld } from './pages/Worlds/actions';
import DeleteWorld from './pages/World/Delete';
import World, {loader as worldLoader} from './pages/World';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
          {
            index: true,
            element: <Stories />,
            loader: storyListLoader,
          },
          {
            path: "stories",
            element: <Stories />,
            loader: storyListLoader,
          },
          {
            path: "stories/create",
            action: actionCreateStory,
          },
          {
            path: "stories/:storyId",
            element: <Story />,
            loader: storyLoader,
            children: [
              {
                path: "update",
                action: actionUpdateStory,
              },
              {
                path: "delete",
                element: <DeleteStory />,
                action: actionDeleteStory,
              },
            ]
          },
          {
            path: "worlds",
            element: <Worlds />,
            loader: worldListLoader,
            action: worldUpload,
          },
          {
            path: "worlds/:worldId",
            element: <World />,
            loader: worldLoader,
            children: [
              {
                path: "delete",
                element: <DeleteWorld />,
                action: actionDeleteWorld,
              },
            ]
          },
      ]
  }
]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
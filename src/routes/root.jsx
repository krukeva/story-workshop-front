import { Outlet, useNavigate } from "react-router-dom"

import AppHeader from "../components/AppHeader"

export default function Root() {
  const navigate = useNavigate()
  return (
    <>
      <AppHeader
        onClick={() => {
          navigate("/")
        }}
      />
      <Outlet />
    </>
  )
}

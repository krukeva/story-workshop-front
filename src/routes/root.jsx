import { Outlet, useNavigate } from "react-router-dom"
import { useState } from "react"
import AppHeader from "../components/AppHeader"

export default function Root() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <AppHeader
        collapsed={collapsed}
        onClick={() => {
          navigate("/")
        }}
      />
      <Outlet context={[collapsed, setCollapsed]} />
    </>
  )
}

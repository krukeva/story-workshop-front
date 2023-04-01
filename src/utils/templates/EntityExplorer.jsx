import { NavLink, Form, useNavigation, useSubmit } from "react-router-dom"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

import colors from "../styles/colors"
import PageWithNav from "../../utils/templates/PageWithNav"
import { AddButton } from "../../components/buttons"
const LoadingDiv = styled.div`
  ${(props) =>
    props.loading === "loading" &&
    `
        opacity: 0.25;
        transition: opacity 200ms;
        transition-delay: 200ms;
      `};
`

const BottomTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 1rem 2rem 0 2rem;
  border-top: 1px solid #e3e3e3;
  order: 1;
  line-height: 1;
`

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e3e3e3;
`

const SearchForm = styled(Form)`
  position: relative;
`

const SearchInput = styled.input`
  font-size: 1rem;
  font-family: inherit;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  background-color: white;
  line-height: 1.5;
  margin: 0;
  width: 100%;
  padding-left: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 0.625rem 0.75rem;
  background-size: 1rem;
  position: relative;
  ${(props) => props.searching && `background-image: none;`}
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
  `
const SearchSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");
  animation: ${spin} 1s infinite linear;
  position: absolute;
  left: 0.625rem;
  top: 0.75rem;
`

const Nav = styled.nav`
  flex: 1;
  overflow: auto;
  padding-top: 1rem;
  & a span {
    float: right;
    color: #eeb004;
  }
  & a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    white-space: pre;
    padding: 0.5rem;
    border-radius: 8px;
    color: inherit;
    text-decoration: none;
    gap: 1rem;

    &:hover {
      background: ${colors.divider};
    }

    &.active {
      background: ${colors.primary};
      color: white;
    }

    &.pending {
      color: ${colors.lightPrimary};
    }
  }
`

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  & li {
    margin: 0.25rem 0;
  }
`

export default function EntityExplorer({
  title,
  list,
  q,
  color,
  starrable,
  children,
}) {
  const [query, setQuery] = useState(q || "")
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q")

  useEffect(() => {
    setQuery(q || "")
  }, [q])

  return (
    <PageWithNav color={color}>
      <PageWithNav.NavBar>
        <BottomTitle>
          {title}
          <Form method="post">
            <AddButton
              type="submit"
              color={colors.primary}
              size="30px"
              fontSize="18px"
            />
          </Form>
        </BottomTitle>
        <TopDiv>
          <SearchForm>
            <SearchInput
              id="q"
              searching={searching}
              placeholder="Rechercher"
              type="search"
              name="q"
              value={query}
              onChange={(e) => {
                const isFirstSearch = q == null
                setQuery(e.target.value)
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch, //to remove the history in the navigator
                })
              }}
            />
            <SearchSpinner
              id="search-spinner"
              hidden={!searching}
              color="red"
            />
          </SearchForm>
        </TopDiv>
        <Nav>
          {list.length ? (
            <Ul>
              {list.map((item) => (
                <li key={item.id}>
                  <NavLink to={item.id}>
                    {item.name ? <>{item.name}</> : <i>Nom inconnu</i>}{" "}
                    {typeof item.worldId === "string" && (
                      <span>
                        <FontAwesomeIcon icon={faGlobe} />
                      </span>
                    )}
                    {typeof item.worldId !== "string" &&
                      starrable &&
                      item.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </Ul>
          ) : (
            <p>
              <i>La liste est vide</i>
            </p>
          )}
        </Nav>
      </PageWithNav.NavBar>

      <PageWithNav.Main>
        <LoadingDiv loading={navigation.state}>{children}</LoadingDiv>
      </PageWithNav.Main>
    </PageWithNav>
  )
}

import { useRouteError } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/styles/colors"

import errorIllustration from "../../assets/404.svg"

const ErrorTitle = styled.h1`
  font-weight: 300;
`

const ErrorSubtitle = styled.h2`
  font-weight: 300;
  color: ${colors.primaryText};
`

const ImageWrapper = styled.img`
  margin: auto;
  max-width: 800px;
`

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page" class="pageContainer withBackground">
      <ErrorTitle>Oups...</ErrorTitle>
      <ErrorSubtitle>Il semble qu'il y ait un problème...</ErrorSubtitle>
      {error.status === 404 ? (
        <ImageWrapper src={errorIllustration} alt="Illustration" />
      ) : (
        <>
          <h2>Une erreur</h2>
          <p>
            Message d'erreur&nbsp;: <i>{error.statusText || error.message}</i>
          </p>
        </>
      )}
    </div>
  )
}

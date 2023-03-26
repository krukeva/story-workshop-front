import { createGlobalStyle } from "styled-components"

import colors from "./colors"

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }

    body {
        background-color: white;
        margin: 0;
        line-height: 1.5;
        min-height: 100vh;
    }

    div.root {
      margin: 0;
      height: 100vh;
      overflow: auto;
    }

    div.pageContainer {
        margin: 0 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }
    div.withBackground {
        background-color: ${colors.lightPrimary};
    }
`
function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle

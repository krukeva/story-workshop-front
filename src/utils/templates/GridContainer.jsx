import styled from "styled-components"

const StyledContainer = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 25px;
  grid-auto-rows: minmax(300px, auto);
`

export default function GridContainer({ children }) {
  return (
    <div className="pageContainer">
      {children && children.length ? (
        <StyledContainer>{children}</StyledContainer>
      ) : (
        <p>
          <i>Il n'y a aucun élément à afficher.</i>
        </p>
      )}
    </div>
  )
}

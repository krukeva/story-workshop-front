import { Link, NavLink } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import colors from "./colors"

/************************************************************************/
/*                           Boutons                                    */
/************************************************************************/
// Ce style retire tous les éléments d'apparence d'un bouton classique.
export const ButtonStyledAsDiv = styled.button`
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  font-family: sans-serif; /* Use whatever font-family you want */
  font-size: 1rem;
  line-height: 1;
  background: transparent;
  -webkit-appearance: none;
`

export const RoundButton = styled.button`
  display: inline-grid;
  place-items: center;
  height: ${(props) => props.size || "60px"};
  width: ${(props) => props.size || "60px"};
  border: none;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.color || colors.primary};
  font-family: sans-serif; /* Use whatever font-family you want */
  font-size: 1rem;
  line-height: 1;
  -webkit-appearance: none;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`

/************************************************************************/
/*                             Liens                                    */
/************************************************************************/
export const StyledLink = styled(Link)`
  padding: 10px 15px;
  color: ${colors.lightPrimary};
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    `color: white; 
        border-radius: 30px; 
        background-color: ${colors.primary};`}
`

export const StyledNavLink = styled(NavLink)`
  color: "#8186a0";
  text-decoration: none;
`

/************************************************************************/
/*                Indicateurs de chargement                             */
/************************************************************************/
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

/************************************************************************/
/*                            DIV                                       */
/************************************************************************/

export const FixedDiv = styled.div`
  position: fixed;
  right: ${(props) => props.right || "auto"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
`

import styled, { createGlobalStyle } from "styled-components";
// import MyFonts from "./fonts.ttf";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
 } 
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  border-radius: 0px;
  background: black;
  white-space: nowrap;
  /* padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")}; */

  padding: 10px 20px;
  font-size: 16px;

  color: #fff;
  /* font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")}; */
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: black;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export default GlobalStyle;

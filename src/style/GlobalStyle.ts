import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

/* Apply the font to the entire project */
body {
  font-family: 'Noto Sans', sans-serif; /* Use the imported font or fallback to a system font */
  /* Other global styles */
}

  /* You can add more global styles here */
`;

export default GlobalStyles;

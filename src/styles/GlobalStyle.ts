import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    min-height: 100%;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  body {
    width: 100%;
    min-width: 0;
    min-height: 100svh;
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.body};
  }

  #root {
    width: 100%;
    min-width: 0;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  @media (max-width: 1024px) {
    html {
      font-size: 16px;
    }
  }
`

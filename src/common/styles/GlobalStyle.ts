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
    color: ${({ theme }) => theme.colors.darkColor};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-style: ${({ theme }) => theme.typography.body.fontStyle};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
  }

  h1,
  h2,
  h3,
  p {
    margin-block: 0;
  }

  h1 {
    font-family: ${({ theme }) => theme.typography.header1.fontFamily};
    font-size: ${({ theme }) => theme.typography.header1.fontSize};
    font-style: ${({ theme }) => theme.typography.header1.fontStyle};
    font-weight: ${({ theme }) => theme.typography.header1.fontWeight};
    line-height: ${({ theme }) => theme.typography.header1.lineHeight};
  }

  h2 {
    font-family: ${({ theme }) => theme.typography.header2.fontFamily};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-style: ${({ theme }) => theme.typography.header2.fontStyle};
    font-weight: ${({ theme }) => theme.typography.header2.fontWeight};
    line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  }

  h3 {
    font-family: ${({ theme }) => theme.typography.header3.fontFamily};
    font-size: ${({ theme }) => theme.typography.header3.fontSize};
    font-style: ${({ theme }) => theme.typography.header3.fontStyle};
    font-weight: ${({ theme }) => theme.typography.header3.fontWeight};
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  }

  small {
    font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
    font-style: ${({ theme }) => theme.typography.descriptive.fontStyle};
    font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
    line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
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

    input,
    textarea,
    select {
      font-size: 16px !important;
    }
  }
`

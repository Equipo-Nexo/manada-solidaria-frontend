import styled from 'styled-components'

export const Section = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  align-self: stretch;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
`

export const Title = styled.h2`
  min-width: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.header2.fontFamily};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-style: ${({ theme }) => theme.typography.header2.fontStyle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`

export const SeeAllButton = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 14px;
  padding: 8px 2px;
  border: 0;
  color: ${({ theme }) => theme.colors.black};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  cursor: pointer;

  span { text-decoration: underline; text-underline-offset: 3px; }
  svg { width: 8px; height: 14px; flex-shrink: 0; }

  &:focus-visible {
    border-radius: 4px;
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 2px 14px;
  scroll-padding-inline: 2px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  & > * { flex: 0 0 auto; scroll-snap-align: start; }
    min-height:110px;
`

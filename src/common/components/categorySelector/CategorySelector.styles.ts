import styled from 'styled-components'

export const Filters = styled.div`
  display: flex;
  width: fit-content;
  max-width: 100%;
  gap: 20px;
  padding: 0 16px;
  margin: 0 auto 16px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    gap: 32px;
    padding-inline: 24px;
    margin-bottom: 24px;
  }
`

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0 0 8px;
  border: 0;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.black : 'transparent')};
  color: ${({ theme }) => theme.colors.black};
  background: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  white-space: nowrap;
  cursor: pointer;

  &:focus-visible {
    border-radius: 4px 4px 0 0;
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    min-height: 44px;
    padding: 8px 4px 10px;
    border-bottom-width: 3px;
    font-size: ${({ theme }) => theme.typography.header3.fontSize};
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  }
`

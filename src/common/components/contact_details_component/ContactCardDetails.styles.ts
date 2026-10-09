import styled from "styled-components"


export const ContactCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 20px 0 rgba(75, 63, 53, 0.08);

  @media (max-width: 359px) {
    padding: 16px;
  }
`

export const ContactRow = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  align-self: stretch;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  @media (max-width: 359px) {
    gap: 8px;
    padding: 12px;
  }
`

export const ContactNumber = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  overflow-wrap: anywhere;
  text-align: left;
`

export const ContactButton = styled.button`
  flex: 0 0 auto;
  margin-left: auto;
  min-width: 90px;
  height: 40px;
  padding: 6px 8px;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.brand};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const SectionTitle = styled.h2`
  display: flex; 
  align-items: center; 
  gap: 8px; 
  margin: 0; 
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px; font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 28px;
  svg { width: 22px; height: 22px; flex: 0 0 auto; }
`

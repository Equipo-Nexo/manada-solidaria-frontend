import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 24px;
  border: 1px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`

export const Message = styled.p`
  max-width: 460px;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  text-align: center;
`

export const Icon = styled.span`
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 12px rgb(89 65 55 / 12%);

  svg {
    width: 18px;
    height: 18px;
  }
`


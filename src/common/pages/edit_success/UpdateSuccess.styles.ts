import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  background: ${({ theme }) => `${theme.colors.neutral}40`};
  @media (max-height: 650px) {
    padding-top: 36px;
  }
`

export const Content = styled.div`
  width: min(100%, 440px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 136px;
  height: 136px;
`

export const AnimalImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border: 4px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 28px ${({ theme }) => `${theme.colors.darkColor}24`};
`

export const SuccessBadge = styled.span`
  position: absolute;
  right: -2px;
  bottom: 8px;
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 4px solid ${({ theme }) => `${theme.colors.neutral}40`};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.background};

  svg {
    width: 22px;
    height: 22px;
  }
`

export const Copy = styled.div`
  margin-top: 48px;
  text-align: center;

  @media (max-height: 650px) {
    margin-top: 30px;
  }
`

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.header1};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`

export const Description = styled.p`
  max-width: 340px;
  margin: 6px auto 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  ${({ theme }) => theme.typography.body};
`

export const AnimalName = styled.strong`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 56px;

  @media (max-height: 650px) {
    margin-top: 36px;
  }
`

const ActionButton = styled.button`
  width: 100%;
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 12px 22px;
  cursor: pointer;
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  svg {
    width: 19px;
    height: 19px;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const PrimaryButton = styled(ActionButton)`
  border: 2px solid ${({ theme }) => theme.colors.brand};
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
    border-color: ${({ theme }) => theme.colors.brandHover};
  }
`

export const SecondaryButton = styled(ActionButton)`
  border: 2px solid transparent;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.brand};

  &:hover {
    border-color: ${({ theme }) => theme.colors.stroke};
  }
`

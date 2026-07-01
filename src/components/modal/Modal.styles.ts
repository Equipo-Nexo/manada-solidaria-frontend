import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 5vw, 56px);
  background: rgb(25 18 15 / 48%);
`

export const Card = styled.section`
  width: min(100%, clamp(340px, 42vw, 560px));
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 34px);
  padding: clamp(24px, 4vw, 40px);
  border: 1px solid rgb(169 92 40 / 22%);
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 18px 42px rgb(25 18 15 / 28%);
  text-align: left;

  @media (max-width: 360px) {
    padding: 20px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.6vw, 16px);
`

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 800;
  line-height: 1.25;
`

export const Body = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(14px, 1.25vw, 18px);
  font-weight: 500;
  line-height: 1.55;

  p {
    margin: 0;
  }
`

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(10px, 1.5vw, 16px);

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`

export const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  min-width: 0;
  min-height: clamp(44px, 4vw, 54px);
  padding: 10px clamp(12px, 2vw, 20px);
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === 'secondary' ? 'rgb(89 65 55 / 28%)' : theme.colors.error};
  border-radius: 10px;
  background: ${({ $variant, theme }) =>
    $variant === 'secondary' ? 'transparent' : theme.colors.error};
  color: ${({ $variant, theme }) => ($variant === 'secondary' ? theme.colors.text : '#FFFFFF')};
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 700;
  line-height: 1.25;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;

  &:hover {
    background: ${({ $variant }) => ($variant === 'secondary' ? 'rgb(89 65 55 / 8%)' : '#9f1515')};
  }

  &:focus-visible {
    outline: 3px solid rgb(234 95 9 / 28%);
    outline-offset: 2px;
  }
`

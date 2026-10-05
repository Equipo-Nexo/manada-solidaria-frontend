import styled from 'styled-components';
import { focusVisible } from '@styles/interactions';

export const Container = styled.section`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100svh;
  padding: 48px 24px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 340px);
  text-align: center;
`;

export const Logo = styled.img`
  display: block;
  width: clamp(120px, 40vw, 180px);
  max-width: 100%;
  height: auto;
  margin-bottom: 24px;
`;

export const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 76vw, 284px);
`;

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Thanks = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
`;

export const AnimalName = styled.strong`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const HomeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 72vw, 284px);
  min-height: clamp(44px, 14vw, 56px);
  margin-top: clamp(64px, 12svh, 112px);
  padding: 12px 24px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 10px ${({ theme }) => `${theme.colors.darkColor}26`};
  ${({ theme }) => theme.typography.action};
  cursor: pointer;
  ${focusVisible}

  &:focus-visible {
    outline-offset: 4px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
  }
`;

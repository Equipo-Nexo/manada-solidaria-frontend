import styled from "styled-components";

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Container = styled.aside`
  display: flex;
  gap: 8px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.neutral};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 24px 1fr;
    align-items: start;
  }
`;

export const Icon = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 18px;
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 17px;
`;

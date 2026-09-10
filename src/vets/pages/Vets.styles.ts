import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 8px;

  @media (min-width: 768px) {
    max-width: 800px;
    padding: 0 20px;
  }

  @media (min-width: 1238px) {
    max-width: 1200px;
    padding: 0 24px;
  }
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const BackButton = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 24px;

  @media (min-width: 1024px) {
    font-size: 28px;
    line-height: 36px;
  }
`;
export const VetsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: 20px;
  }

  @media (min-width: 1238px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

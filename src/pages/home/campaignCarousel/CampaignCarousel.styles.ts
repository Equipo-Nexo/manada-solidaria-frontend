import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const SeeAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

export const Carousel = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 16px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.div`
  flex: 0 0 320px;
  scroll-snap-align: start;
`;

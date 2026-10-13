import { focusVisible } from "@/common/styles/interactions";
import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    @media (min-width: 1024px) {
      max-width: 1280px;
      margin: 0 auto;
    }
`
export const QueryState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: min(100%, 380px);
  margin: 0 auto;
  padding: 24px 0;
`;

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
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
  svg {
    width: 48px;
    height: 48px;
  }
  ${focusVisible}
`;

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  overflow-wrap: anywhere;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`;

export const FiltersContainer = styled.div`
  margin: 0px 0px 16px 0px;
  padding: 0 16px;
`

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 10px;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-content: start;
        gap: 20px;
    }

    @media (min-width: 1238px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`

export const Card = styled.div`
    position: relative;
    display: flex;
    align-items: center; 
    flex-shrink: 0;
    gap: 8px;
    width: 100%;
    min-width: 0;
    min-height: 130px;
    box-sizing: border-box;
    padding: 20px 36px 8px 8px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 4px 8px ${({ theme }) => `${theme.colors.black}26`};
    cursor: pointer;
    transition:
        transform 180ms ease,
        border-color 180ms ease,
        box-shadow 180ms ease;

    @media (hover: hover) {
        &:hover {
            transform: translateY(-3px);
            border-color: ${({ theme }) => theme.colors.stroke};
            box-shadow: 0 12px 28px -6px ${({ theme }) => `${theme.colors.darkColor}33`};
        }
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    > svg {
        position: absolute;
        top: 50%;
        right: 16px;
        width: 8px;
        height: 14px;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.colors.black};
    }

    @media (min-width: 768px) {
        min-height: 144px;

        &:only-child {
            width: calc((100% - 20px) / 2);
            grid-column: 1 / -1;
            justify-self: center;
        }
    }

    @media (min-width: 1238px) {
        &:only-child {
            width: calc((100% - 40px) / 3);
        }
    }

`

export const Photo = styled.img`
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;

`

export const Info = styled.div`
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
    text-align: left;
`

export const FirstLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-right: -20px;
`

export const Name = styled.p`
    flex: 1;
    min-width: 0;
    margin: 0;
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.typography.header3};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

interface StatusInterface {
  $isRead: boolean;
}

export const Status = styled.span<StatusInterface>`
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 2px 10px;
    border-radius: 999px;
    background: ${({ theme, $isRead }) => $isRead ? theme.colors.statusFoundBackground : theme.colors.neutral};
    color: ${({ theme, $isRead }) => $isRead ? theme.colors.success : theme.colors.brand};
    ${({ theme }) => theme.typography.body};
    font-weight: ${({ theme }) => theme.fontWeights.bold};

`

export const CreationDate = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    color: ${({ theme }) => theme.colors.darkColor};
    ${({ theme }) => theme.typography.descriptive};

    svg {
        flex-shrink: 0;
        width: 12px;
        height: 14px;
    }

`

export const Description = styled.p`
    margin: 0;
    padding-right: 8px;
    color: ${({ theme }) => theme.colors.darkColor};
    ${({ theme }) => theme.typography.descriptive};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const LastLine = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
`

export const AnimalName = styled.p`
    display: inline-flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    gap: 6px;
    margin: 0;
    color: ${({ theme }) => theme.colors.secondary};
    ${({ theme }) => theme.typography.header3};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    overflow-wrap: anywhere;

    svg {
        flex-shrink: 0;
        width: 18px;
        height: 18px;
    }

`

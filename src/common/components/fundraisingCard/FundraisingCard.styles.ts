import styled from "styled-components";

type ProgressValueProps = {
  $progress: number;
};
type CardProps = {
  $showAlias: boolean;
};
type DescriptionProps = {
  $hasGoal: boolean;
};
export const Card = styled.article<CardProps>`
  width: 329px;
  max-width: 100%;
  height: ${({ $showAlias }) => ($showAlias ? "337px" : "240px")};
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  padding: 27px 20px 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex: 0 0 34px;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const GoalText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 20px;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 9px;
  overflow: hidden;
  border-radius: 10px;
  background: rgb(234 95 9 / 35%);
`;

export const ProgressValue = styled.div<ProgressValueProps>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const CaseCard = styled.div`
  display: flex;
  flex: 1 1 0;
  width: calc(100% + 20px);
  min-height: 0;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgb(225 191 178 / 20%);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  margin-inline: -10px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 8%);
`;
export const ImageContainer = styled.div`
  flex: 0 0 120px;
  width: 120px;
  height: 100%;
  overflow: hidden;
`;

export const CaseImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CaseContent = styled.div`
  min-width: 0;
  height: 100%;
  display: grid;
  flex: 1;
  grid-template-rows: auto minmax(0, 1fr) auto;
  align-items: start;
  padding: 4px 8px 16px;
  gap: 3px;
`;

export const Title = styled.h3`
  min-width: 0;
  min-height: 20px;
  margin: 0;
  overflow: hidden;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.typography.header2.fontFamily};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p<DescriptionProps>`
  display: -webkit-box;
  min-width: 0;
  min-height: 0;
  width: 100%;
  margin: 4px 0 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 18px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $hasGoal }) => ($hasGoal ? 2 : 4)};
`;

export const StoryButton = styled.button`
  flex-shrink: 0;
  width: fit-content;
  margin-top: 1px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 20px;
  text-decoration: underline;
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const AliasBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 58px;
  padding: 9px 15px;
  border: 1px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.neutral};
`;

export const AliasContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const AliasLabel = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 20px;
`;

export const AliasValue = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.descriptive.fontFamily};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CopyButton = styled.button`
  width: 100%;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 19.5px;
  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

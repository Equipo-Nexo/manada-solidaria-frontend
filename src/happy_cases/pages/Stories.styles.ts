import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.45) 0%,
    transparent 30%,
    transparent 55%,
    rgba(0, 0, 0, 0.75) 100%
  );
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 28px;
  box-sizing: border-box;
`;
export const StoryFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    width: min(460px, 90vw);
    height: min(92vh, calc(90vw * 16 / 9));
    border-radius: 14px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;
export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ProgressContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 3px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
`;

export const ProgressFill = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "100%" : "0%")};
  height: 100%;
  border-radius: inherit;
  background: white;
  transition: width 0.2s ease;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserImage = styled.img`
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.8);
`;

export const Username = styled.p`
  color: white;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const CloseButton = styled.button`
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-left: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  margin-bottom: 5rem;
  gap: 16px;
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  margin-left: 21px;
  color: white;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Description = styled.p`
  margin-left: 21px;
  margin-right: 16px;
  color: white;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 22px;
  text-align: left;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 16px;
  margin-left: 21px;
  border-radius: 999px;
  background: ${({ $status, theme }) =>
    $status === "FOUND" ? "#ccf59b" : theme.colors.neutral};
  color: ${({ $status, theme }) =>
    $status === "FOUND" ? theme.colors.success : theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

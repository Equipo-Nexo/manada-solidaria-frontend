import styled, { css } from "styled-components";

export const MainContainer = styled.div`
    width: min(100%, 390px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (min-width: 700px) {
        width: min(100%, 500px);
        gap: 24px;
    }

`
export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
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
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
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
  white-space: nowrap;
`;


export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    text-align: left;
    @media (min-width: 768px) {
        gap: 24px;
    }
`
export const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

export const ProfileImageWrapper = styled.div`
    position: relative;
    width: 152px;
    height: 152px;
`

export const ProfileImage = styled.img`
    width: 152px;
    height: 152px;
    border-radius: 50%;
    object-fit: cover;
`

export const EditProfileImageButton = styled.button`
    position: absolute;
    right: -4px;
    bottom: -4px;
    display: inline-flex;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.brand};
    color: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    transition: background 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    svg {
        width: 20px;
        height: 20px;
    }

    svg path {
        fill: ${({ theme }) => theme.colors.background};
    }

    @media (hover: hover) {
        &:hover {
            background: ${({ theme }) => theme.colors.brandHover};
            box-shadow: 0 5px 12px rgb(234 95 9 / 28%);
            transform: translateY(-1px);
        }
    }

    &:active {
        box-shadow: none;
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }
`

export const ProfileName = styled.h2`
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.black};
`

export const ProfileEmail = styled.p`
    margin: 0;
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.darkColor};
`

export const RolesContainer = styled.div`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
`

export const Label = styled.span`
    ${({ theme }) => theme.typography.header2};
    ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.darkColor};
`

export const RolesList = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 4px 10px rgb(0 0 0 / 18%);
`

export const ItemsMainContainer = styled.div`
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
`

export const ItemsList = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 4px 10px rgb(0 0 0 / 18%);
   
`

export const Description = styled.p`
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.darkColor};
`

export const LogoutButton = styled.button`
    margin-top: 16px;
    width: 100%;
    padding: 16px;
    background: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    border-radius: 12px;
    cursor: pointer;
    ${({ theme }) => theme.typography.header3};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;

    @media (min-width: 768px) {
        min-height: 56px;
        align-self: center;
        margin-top: 0;
    }

    transition:
        background 160ms ease,
        color 160ms ease,
        box-shadow 160ms ease,
        transform 160ms ease;

    @media (hover: hover) {
        &:hover {
            background: ${({ theme }) => theme.colors.error};
            color: ${({ theme }) => theme.colors.background};
            box-shadow: 0 6px 14px rgb(186 26 26 / 22%);
            transform: translateY(-1px);
        }
    }

    &:active {
        background: ${({ theme }) => theme.colors.error};
        color: ${({ theme }) => theme.colors.background};
        box-shadow: none;
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 3px;
    }
`


const TRANSITION_DURATION = '160ms'



export const SwitchGroup = styled.div`
  width: 100%;
  padding:16px;
  background: ${({ theme }) => theme.colors.background};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};
  }

  @media (max-width: 420px) {
    padding: 0 16px;
  }
`

export const SwitchRow = styled.div`
  display: flex;
  height:48px;
  
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  color: ${({ theme }) => theme.colors.black};

  @media (max-width: 420px) {
    min-height: 76px;
    gap: 10px;
  }
`

export const SwitchToggle = styled.label`
  display: inline-flex;
  flex: 0 0 auto;
  cursor: pointer;
`

export const SwitchLabelContent = styled.span`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  gap: 10px;

  @media (max-width: 420px) {
    gap: 8px;
  }
`

export const RoleIcon = styled.span<{ $size?: 'default' | 'large' }>`
  display: inline-flex;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.neutral};

  svg {
    width: ${({ $size }) => $size === 'large' ? '24px' : '20px'};
    height: ${({ $size }) => $size === 'large' ? '24px' : '20px'};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: 420px) {
    width: 38px;
    height: 38px;
    flex-basis: 38px;

    svg {
      width: ${({ $size }) => $size === 'large' ? '24px' : '23px'};
      height: ${({ $size }) => $size === 'large' ? '24px' : '23px'};
    }
  }
`

export const RoleName = styled.span`
  min-width: 0;
  flex: 1;
  font-size:${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  @media (max-width: 420px) {
    ${({ theme }) => theme.typography.header3};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`

export const InfoIcon = styled.button`

  width: 24px;
  height: 24px;
  cursor: pointer;

  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.brand};
  cursor: pointer;

  svg {
    width: 21px;
    height: 21px;
  }

  svg path {
    fill: currentColor;
  }

  @media (max-width: 420px) {
    width: 24px;
    height: 24px;
    flex-basis: 24px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`
export const SwitchInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`

export const SwitchControl = styled.span`
  position: relative;
  width: 56px;
  height: 30px;
  flex: 0 0 56px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.stroke};
  transition: background ${TRANSITION_DURATION} ease;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    transition: transform ${TRANSITION_DURATION} ease;
  }

  ${SwitchInput}:checked + & {
    background: ${({ theme }) => theme.colors.brand};
  }

  ${SwitchInput}:checked + &::after {
    transform: translateX(26px);
  }

  ${SwitchInput}:focus-visible + & {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (max-width: 420px) {
    width: 52px;
    flex-basis: 52px;

    ${SwitchInput}:checked + &::after { transform: translateX(22px); }
  }
`

export const Item = styled.div<{ $interactive: boolean }>`
    width:100%;
    height:80px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row;
    padding: 16px;
    background: ${({ theme }) => theme.colors.background};
    cursor: ${({ $interactive }) => $interactive ? 'pointer' : 'default'};
    transition: background 120ms ease, transform 120ms ease;
    font-size:  ${({ theme }) => theme.typography.body};

    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};
    }

    ${({ $interactive }) => $interactive && css`
        @media (hover: hover) {
            &:hover {
                background: rgb(234 95 9 / 8%);
            }
        }

        &:active {
            background: rgb(234 95 9 / 14%);
            transform: scale(0.985);
        }

        &:focus-visible {
            outline: 3px solid ${({ theme }) => theme.colors.focus};
            outline-offset: -3px;
        }

        @media (prefers-reduced-motion: reduce) {
            transition: none;

            &:active {
                transform: none;
            }
        }
    `}
`
export const ItemInfo = styled.div`
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    height: 40px;
    justify-content: center;
    
`
export const ItemLabel = styled.span`
    ${({ theme }) => theme.typography.body};
    color: ${({ theme }) => theme.colors.black};
`
export const ItemDescription = styled.span`
    ${({ theme }) => theme.typography.descriptive};
    color: ${({ theme }) => theme.colors.black};
`

export const ItemChevron = styled.span`
    display: inline-flex;
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.darkColor};

    svg {
        width: 9px;
        height: 15px;
    }
`


export const BottomSheetContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

`

export const BottomSheetTitle = styled.h2`
    color: ${({ theme }) => theme.colors.black};
`

export const BottomSheetDescription = styled.p`
    color: ${({ theme }) => theme.colors.black};
    text-align: center;
`

export const BottomSheetRoleIcon = styled.span`
    display: inline-flex;
    width: 56px;
    height: 56px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.neutral};

    svg {
        width: 32px;
        height: 32px;
    }

    svg path {
        fill: currentColor;
    }
`

export const PhotoSheetHeader = styled.header`
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
    margin-top: 42px;
    margin-bottom: 24px;
`

export const PhotoSheetTitle = styled.h2`
    color: ${({ theme }) => theme.colors.darkColor};
    font-size: ${({ theme }) => theme.typography.header2.fontSize};
    font-weight: ${({ theme }) => theme.typography.header2.fontWeight};
    line-height: ${({ theme }) => theme.typography.header2.lineHeight};
`

export const PhotoSheetDescription = styled.p`
    color: ${({ theme }) => theme.colors.darkColorMuted};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const PhotoSheetActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const PhotoSheetAction = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.colors.stroke};
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.neutral};
    cursor: pointer;
    transition: all 0.2s ease;

    > svg {
        width: 8px;
        height: 14px;
        flex: 0 0 auto;
    }

    &:hover {
        border-color: ${({ theme }) => theme.colors.brand};
        background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    }

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 2px;
    }

    &:disabled {
        cursor: wait;
        opacity: 0.65;
    }
`

export const PhotoSheetActionIcon = styled.span`
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};

    svg {
        width: 20px;
        height: 20px;
    }
`

export const PhotoSheetActionCopy = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
`

export const PhotoSheetActionTitle = styled.span`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.typography.header3.fontSize};
    font-weight: ${({ theme }) => theme.typography.header3.fontWeight};
    line-height: ${({ theme }) => theme.typography.header3.lineHeight};
`

export const PhotoSheetActionDescription = styled.span`
    color: ${({ theme }) => theme.colors.darkColorMuted};
    font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
    font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
    line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`

export const PasskeyButton = styled.button`
  width: min(100%, 284px);
  height: 56px;
  padding: 0 24px;
  border: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

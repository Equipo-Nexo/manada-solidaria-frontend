import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    max-width: 350px;
    min-height: 140px;
    height: auto;
    display: grid;
    grid-template-columns: 70px minmax(0, 1fr) 18px;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    cursor: pointer;
    box-shadow: 0 4px 8px ${({ theme }) => `${theme.colors.black}26`};
    transition:
        transform 180ms ease,
        box-shadow 180ms ease;

    > svg {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        color: ${({ theme }) => theme.colors.black};
        transition: transform 180ms ease;
    }

    @media (hover: hover) {
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px -6px rgb(89 65 55 / 20%);
        }

        &:hover > svg {
            transform: translateX(4px) scale(1.08);
        }
    }

    @media (min-width: 950px) {
        grid-template-columns: 86px minmax(0, 1fr) 18px;
    }

    &:active {
        transform: translateY(-1px) scale(0.99);
        box-shadow: 0 8px 20px -6px rgb(89 65 55 / 20%);
    }

    &:active > svg {
        transform: translateX(3px);
    }

    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 380px) {
        grid-template-columns: 60px minmax(0, 1fr) 14px;
        gap:12px;
        padding: 12px;

        > svg {
            width: 12px;
            height: 12px;
        }
    }

    @media (min-width: 720px) {
        max-width: none;
        height: auto;
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

    @media (prefers-reduced-motion: reduce) {
        transition: none;

        > svg {
            transition: none;
        }

        &:hover,
        &:hover > svg,
        &:active,
        &:active > svg {
            transform: none;
        }
    }
`
export const ProfilePhotoContainer = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 380px) {
        width: 60px;
        height: 60px;
    }
    `

export const ProfilePhoto = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 380px) {
        width: 60px;
        height: 60px;
    }
`

export const MemberInfo = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 8px;
`

export const MemberName = styled.h2`
    width: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 24px;
    overflow-wrap: anywhere;
`

export const MemberRoles = styled.ul`
    width: 100%;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0;
    list-style: none;
`

export const MemberRole = styled.li<{
    $backgroundColor: string
    $textColor: string
}>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 28px;
    box-sizing: border-box;
    border-radius: 999px;
    padding: 1px 6px 1px 6px;
    background: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $textColor }) => $textColor};
    ${({ theme }) => theme.typography.descriptive};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    @media (min-width: 950px) {
        min-height: 32px;
        padding: 4px 10px;
        ${({ theme }) => theme.typography.body};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
    }
`

export const MemberPhoneNumber = styled.p`
    margin: 0;
    color:${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.body};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 19.5px; /* 139.286% */
    display: flex;
    align-items: center;
    svg{
        margin-right: 8px;
        width: 16px;
        height: 16px;
    }
`
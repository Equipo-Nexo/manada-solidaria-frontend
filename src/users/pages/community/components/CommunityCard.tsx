import { Phone, ChevronRight } from "@/common/icons"
import { normalizeImageUrl, NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils"
import * as S from "./CommunityCard.styles"
import { roleConfig } from "@/users/utils/CommunityUtils"
import type { Role } from "@/users/app/types/User.types"

interface CardInterface {
    id: string,
    profileImageURL: string | null,
    username: string,
    roles: Role[],
    areaCode?: string,
    number?: string
}

function CommunityCard({ id, profileImageURL, username, roles, areaCode, number }: CardInterface) {
    return (
        <S.Card key={id}>
            <S.ProfilePhotoContainer>
                <S.ProfilePhoto src={normalizeImageUrl(profileImageURL) || NOT_FOUND_IMAGE_URL} alt="Foto de perfil del usuario" />
            </S.ProfilePhotoContainer>
            <S.MemberInfo>
                <S.MemberName>{username}</S.MemberName>
                <S.MemberRoles>
                    {roles.map((role) => {
                        const config = roleConfig[role]

                        return (
                            <S.MemberRole
                                key={role}
                                $backgroundColor={config.backgroundColor}
                                $textColor={config.textColor}
                            >
                                {config.label}
                            </S.MemberRole>
                        )
                    })}
                </S.MemberRoles>
                {number && (
                    <S.MemberPhoneNumber><Phone />{areaCode} - {number}</S.MemberPhoneNumber>
                )}
            </S.MemberInfo>
            <ChevronRight />
        </S.Card>
    )
}

export default CommunityCard;

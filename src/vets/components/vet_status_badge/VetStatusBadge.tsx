import * as S from './VetStatusBadge.styles'

export default function VetStatusBadge(
    { status }: { status: string }
) {

    const isOpen = status.toLocaleLowerCase() === 'open'

    return (
        <S.Badge isOpen={isOpen}>
            <S.BadgeText isOpen={isOpen}>
                {isOpen ? 'Abierto' : 'Cerrado'}
            </S.BadgeText>
        </S.Badge>
    )
}
  
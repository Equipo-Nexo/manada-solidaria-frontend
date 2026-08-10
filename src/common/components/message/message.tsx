import * as S from './message.styles';
import PawPrintIcon from '../../icons/PawPrint';
import type { FC, SVGProps } from 'react';


type IconName = 'pawPrint'

type IconComponent = FC<SVGProps<SVGSVGElement>>



interface MessageProps {
    message: string,
    iconName: IconName
}


const iconMap: Record<IconName, IconComponent> = {
    pawPrint: PawPrintIcon
}



function Message({ message, iconName }: MessageProps) {
    const Icon = iconMap[iconName]
    return (
        <S.MainContainer>
            <S.Icon>
                <Icon aria-hidden="true" />
            </S.Icon>
            <S.Message>{message}</S.Message>
        </S.MainContainer>
    )
}
export default Message;

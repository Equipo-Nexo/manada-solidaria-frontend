import { openWhatsApp } from '@/common/utils/Whatsapp';
import * as S from './ContactCardDetails.styles';
import { Phone } from '@/common/icons';

interface ContactCardComponent {
    phoneNumber: string,
    areaCode: string,
    number: string,
    name: string;
}
function ContactCardComponent({ phoneNumber, areaCode, number, name }: ContactCardComponent) {

    return (
        <S.ContactCard>
            <S.SectionTitle><Phone aria-hidden="true" />Contacto</S.SectionTitle>
            <S.ContactRow>
                <S.ContactNumber>{phoneNumber}</S.ContactNumber>
                <S.ContactButton
                    type="button"
                    onClick={() => openWhatsApp(
                        `${areaCode}${number}`,
                        `¡Hola! Me gustaría consultar por la publicación de ${name}`,
                    )}
                >
                    Contactar
                </S.ContactButton>
            </S.ContactRow>
        </S.ContactCard>

    )
}
export default ContactCardComponent;
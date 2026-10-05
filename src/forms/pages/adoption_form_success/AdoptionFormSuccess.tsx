import { useNavigate, useParams } from 'react-router-dom';
import { useGetAnimalPostQuery } from '@/animals/app/api/animalPostsApi';
import { getAnimalName } from '@/animals/app/types/AnimalPost.types';
import { PagePaws } from '@/common/components';
import * as S from './AdoptionFormSuccess.styles';

function AdoptionFormSuccess() {
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>();
    const { data: post } = useGetAnimalPostQuery(postId ?? '', { skip: !postId });
    const animalName = post ? getAnimalName(post.name, post.animal.type) : undefined;

    return (
        <S.Container>
            <PagePaws edgesOnly opacityMultiplier={6} />
            <S.Content>
                <S.Logo src="/logo.svg" alt="Manada Solidaria" />
                <S.Copy role="status">
                    <S.Title>¡Solicitud enviada!</S.Title>
                    <S.Thanks>Gracias por dar este gran paso.</S.Thanks>
                    <S.Description>
                        La persona responsable de <S.AnimalName>{animalName ?? 'este animal'}</S.AnimalName> recibió tu
                        solicitud y se pondrá en contacto con vos para continuar el proceso.
                    </S.Description>
                </S.Copy>
                <S.HomeButton type="button" onClick={() => navigate('/home', { replace: true })}>
                    Volver al inicio
                </S.HomeButton>
            </S.Content>
        </S.Container>
    );
}

export default AdoptionFormSuccess;

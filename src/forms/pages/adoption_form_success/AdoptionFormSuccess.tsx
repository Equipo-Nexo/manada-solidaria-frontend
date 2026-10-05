import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAnimalPostQuery } from '@/animals/app/api/animalPostsApi';
import { getAnimalName } from '@/animals/app/types/AnimalPost.types';
import { createPagePaws } from '@/common/utils/PagePawUtils';
import * as S from './AdoptionFormSuccess.styles';

function AdoptionFormSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = useParams<{ postId: string }>();
    const { data: post } = useGetAnimalPostQuery(postId ?? '', { skip: !postId });
    const animalName = post ? getAnimalName(post.name, post.animal.type) : undefined;
    const pagePaws = useMemo(
        () => createPagePaws(location.key).filter(({ left }) => left < 25 || left > 75),
        [location.key],
    );

    return (
        <S.Container>
            <S.PagePaws aria-hidden="true">
                {pagePaws.map((paw, index) => (
                    <S.PagePaw
                        key={index}
                        $left={paw.left}
                        $top={paw.top}
                        $size={paw.size}
                        $rotation={paw.rotation}
                        $opacity={paw.opacity * 6}
                    />
                ))}
            </S.PagePaws>
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

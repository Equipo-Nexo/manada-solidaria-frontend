import { NOT_FOUND_IMAGE_URL } from '@/common/utils/CommonUtils';
import * as S from './ImagePreview.styles'

interface ImagePreviewProps {
    imageId?: string;
    alt?: string;
    onError?: () => void;
    variant?: 'rectangle' | 'round' | 'square';
}

export default function ImagePreview({ 
    imageId, 
    alt, 
    onError,
    variant = 'rectangle'
}: ImagePreviewProps) {
    return (
        <S.ImageContainer $variant={variant}>
            <S.Photo
                $variant={variant}
                src={`${import.meta.env.VITE_CLOUDFLARE_URL}${imageId}`}
                alt={alt}
                onError={({ currentTarget }) => {
                    onError?.();
                    currentTarget.onerror = null;
                    currentTarget.src = NOT_FOUND_IMAGE_URL;
                }}
            />
        </S.ImageContainer>
    )
}

import { NOT_FOUND_IMAGE_URL } from '@/common/utils/CommonUtils';
import * as S from './ImagePreview.styles'

interface ImagePreviewProps {
    imageId?: string;
    alt?: string;
    onError?: () => void;
}

export default function ImagePreview({ imageId, alt, onError}: ImagePreviewProps) {
    return (
        <S.ImageContainer>
            <S.Photo 
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
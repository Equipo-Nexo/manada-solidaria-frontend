import { useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import { Camera as CameraIcon, ChevronRight } from "../icons";
import Gallery from "../icons/Gallery";
import { useCamera } from "../../hooks/camera/useCamera";
import * as S from "./ImageUpload.styles";
import { useGetPresignedUrlMutation } from "../../app/services/apis/imagesApi";
import { useUploadImageMutation } from "../../app/services/apis/cloudflareApi";
import { useToast } from "../../hooks/toast/useToast";
import PawLoader from "../pawLoader/PawLoader";

type ImageUploadProps = {
  imageUrl?: string;
  label?: string;
  onImageSelected?: (savedImageId: string) => void;
  ariaDescribedBy?: string;
  hasError?: boolean;
};

function ImageUpload({
  imageUrl,
  label = "Seleccionar foto",
  onImageSelected,
  ariaDescribedBy,
  hasError = false,
}: ImageUploadProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { capturedPhoto, takePhoto, chooseFromGallery } = useCamera();
  const [ getPresignedUrl, { isLoading: isLoadingPresignedUrl, isError: errorGetPresignedUrl } ] = useGetPresignedUrlMutation();
  const [ uploadImage, { isLoading: isLoadingUploadImage, isError: errorUploadImage } ] = useUploadImageMutation();
  const closeSheet = () => setIsSheetOpen(false);
  const toaster = useToast()

  const preview = imageUrl ?? capturedPhoto?.url;
  const isLoading: boolean = isLoadingPresignedUrl || isLoadingUploadImage
  const isError: boolean = errorUploadImage || errorGetPresignedUrl

  const handleTakePhoto = async () => {
    const photo = await takePhoto();
    if (!photo || !photo.file) return null;
    uploadPhoto({ file: photo.file })
  };

  const handleChooseGallery = async () => {
    const photo = await chooseFromGallery();
    if (!photo || !photo.file) return null;
    uploadPhoto({ file: photo.file })
  };

  const uploadPhoto = async (photo: {
    file: File
  }) => {
    const request = { contentType: photo.file.type, fileSize: photo.file.size}
    getPresignedUrl(request)
      .unwrap()
      .then((response) => {
        uploadImage({ url: response.uploadUrl, image: photo.file, contentType: photo.file.type })
          .unwrap()
          .catch(() => {
            toaster.error("Hubo un error cargando la imagen")          
          })
        onImageSelected?.(response.imageId);
      })
      .catch(() => {
        toaster.error("Hubo un error cargando la imagen")          
      })
      .finally(() => closeSheet())
  }

  if (isLoading) {
    return (
      <S.ImageUploadLoadingState aria-busy="true">
        <PawLoader label="Cargando imagen..." />
      </S.ImageUploadLoadingState>
    )
  }

  return (
    <>
      <S.ImageUploadButton
        type="button"
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError}
        onClick={() => setIsSheetOpen(true)}
      >
        {preview && !isError ? (
          <S.ImageUploadPreview src={preview} alt="" />
        ) : (
          <>
            <S.ImageUploadIcon>
              <CameraIcon aria-hidden="true" />
            </S.ImageUploadIcon>

            <S.ImageUploadLabel>{label}</S.ImageUploadLabel>
          </>
        )}
      </S.ImageUploadButton>

      <BottomSheet
        isOpen={isSheetOpen}
        ariaLabel="Seleccionar origen de foto"
        onClose={closeSheet}
      >
        <S.PhotoSheetHeader>
          <S.PhotoSheetTitle>Seleccionar origen</S.PhotoSheetTitle>

          <S.PhotoSheetDescription>
            ¿Desde dónde quieres subir la foto?
          </S.PhotoSheetDescription>
        </S.PhotoSheetHeader>

        <S.PhotoSheetActions>
          <S.PhotoSheetAction type="button" onClick={handleTakePhoto}>
            <S.PhotoSheetActionIcon>
              <CameraIcon />
            </S.PhotoSheetActionIcon>

            <S.PhotoSheetActionCopy>
              <S.PhotoSheetActionTitle>Tomar foto</S.PhotoSheetActionTitle>

              <S.PhotoSheetActionDescription>
                Usa la cámara de tu celular
              </S.PhotoSheetActionDescription>
            </S.PhotoSheetActionCopy>

            <ChevronRight />
          </S.PhotoSheetAction>

          <S.PhotoSheetAction type="button" onClick={handleChooseGallery}>
            <S.PhotoSheetActionIcon>
              <Gallery />
            </S.PhotoSheetActionIcon>

            <S.PhotoSheetActionCopy>
              <S.PhotoSheetActionTitle>
                Elegir de la galería
              </S.PhotoSheetActionTitle>

              <S.PhotoSheetActionDescription>
                Busca en tus fotos guardadas
              </S.PhotoSheetActionDescription>
            </S.PhotoSheetActionCopy>

            <ChevronRight />
          </S.PhotoSheetAction>
        </S.PhotoSheetActions>
      </BottomSheet>
    </>
  );
}

export default ImageUpload;

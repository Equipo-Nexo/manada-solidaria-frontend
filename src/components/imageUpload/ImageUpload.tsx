import { useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import { Camera as CameraIcon, ChevronRight } from "../icons";
import Gallery from "../icons/Gallery";
import { useCamera, type CapturedPhoto } from "../../hooks/camera/useCamera";
import * as S from "./ImageUpload.styles";

type ImageUploadProps = {
  imageUrl?: string;
  label?: string;
  onImageSelected?: (photo: CapturedPhoto) => void;
};

function ImageUpload({
  imageUrl,
  label = "Seleccionar foto",
  onImageSelected,
}: ImageUploadProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { capturedPhoto, takePhoto, chooseFromGallery } = useCamera();

  const closeSheet = () => setIsSheetOpen(false);

  const preview = imageUrl ?? capturedPhoto?.url;

  const handleTakePhoto = async () => {
    const photo = await takePhoto();

    if (photo) {
      onImageSelected?.(photo);
      closeSheet();
    }
  };

  const handleChooseGallery = async () => {
    const photo = await chooseFromGallery();

    if (photo) {
      onImageSelected?.(photo);
      closeSheet();
    }
  };

  return (
    <>
      <S.ImageUploadButton type="button" onClick={() => setIsSheetOpen(true)}>
        {preview ? (
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

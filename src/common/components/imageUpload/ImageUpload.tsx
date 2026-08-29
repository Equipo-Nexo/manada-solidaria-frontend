import { useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import { Camera as CameraIcon, ChevronRight, Pencil, Trash } from "../../icons";
import Gallery from "../../icons/Gallery";
import { useCamera } from "@hooks/camera/useCamera";
import * as S from "./ImageUpload.styles";
import { useGetPresignedUrlMutation } from "@services/apis/imagesApi";
import { useUploadImageMutation } from "@services/apis/cloudflareApi";
import { useToast } from "@hooks/toast/useToast";
import PawLoader from "../pawLoader/PawLoader";
import ImagePreview from "../image_preview/ImagePreview";
import CameraCapture from "../cameraCapture/CameraCapture";

type ImageUploadProps = {
  imageUrl?: string;
  label?: string;
  onImageSelected?: (savedImageId: string) => void;
};

function ImageUpload({
  imageUrl,
  label = "Seleccionar foto",
  onImageSelected
}: ImageUploadProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { capturedPhoto, takePhoto, chooseFromGallery, capturePhoto, cameraDevices, setZoom,
    stopCamera, stream, switchCamera, zoom, zoomRange } = useCamera();
  const [ getPresignedUrl, { isLoading: isLoadingPresignedUrl, isError: errorGetPresignedUrl } ] = useGetPresignedUrlMutation();
  const [ uploadImage, { isLoading: isLoadingUploadImage, isError: errorUploadImage } ] = useUploadImageMutation();
  const closeSheet = () => setIsSheetOpen(false);
  const [updated, setUpdated] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const toaster = useToast()


  const preview = isImageRemoved
    ? undefined
    : updated
      ? capturedPhoto?.url
      : imageUrl ?? capturedPhoto?.url;
  const isLoading: boolean = isLoadingPresignedUrl || isLoadingUploadImage
  const isError: boolean = errorUploadImage || errorGetPresignedUrl

  const handleTakePhoto = async () => {
    closeSheet();
    await takePhoto();
  };

  const handleCapturePhoto = async (video: HTMLVideoElement) => {
    const photo = await capturePhoto(video);
    if (!photo || !photo.file) return null;
    setIsImageRemoved(false);
    setUpdated(true);
    uploadPhoto({ file: photo.file })
  };

  const handleChooseGallery = async () => {
    const photo = await chooseFromGallery();
    if (!photo || !photo.file) return null;
    setIsImageRemoved(false);
    setUpdated(true);
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
            toaster.error("Hubo un error subiendo la imagen")          
          })
        onImageSelected?.(response.imageId);
      })
      .catch(() => {
        toaster.error("Hubo un error al obtener el ID de la imagen")          
      })
      .finally(() => closeSheet())
  }

  const handleRemoveImage = () => {
    setIsImageRemoved(true);
    onImageSelected?.("");
  };

  if (isLoading) {
    return (
      <S.ImageUploadLoadingState aria-busy="true">
        <PawLoader label="Cargando imagen..." />
      </S.ImageUploadLoadingState>
    )
  }

  return (
    <>
      <S.ImageUploadContainer>
        <S.ImageUploadButton
          type="button"
          onClick={() => setIsSheetOpen(true)}
          $hasPreview={Boolean(preview && !isError)}
        >
          {preview && !isError ? (
            <>
              <ImagePreview imageId={preview} alt="Imagen seleccionada" />
              <S.EditImageIndicator aria-hidden="true">
                <Pencil />
              </S.EditImageIndicator>
            </>
          ) : (
            <>
              <S.ImageUploadIcon>
                <CameraIcon aria-hidden="true" />
              </S.ImageUploadIcon>

                <S.ImageUploadLabel>{label}</S.ImageUploadLabel>
              </>
            )}
        </S.ImageUploadButton>

        {preview && !isError && (
          <S.RemoveImageButton
            type="button"
            aria-label="Eliminar foto"
            onClick={handleRemoveImage}
          >
            <Trash aria-hidden="true" />
          </S.RemoveImageButton>
        )}
      </S.ImageUploadContainer>

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
      {stream && (
        <CameraCapture
          stream={stream}
          canSwitchCamera={cameraDevices.length > 1}
          zoom={zoom}
          zoomRange={zoomRange}
          onCapture={handleCapturePhoto}
          onClose={stopCamera}
          onSwitchCamera={switchCamera}
          onZoomChange={setZoom}
        />
      )}
    </>
  );
}

export default ImageUpload;

import { Camera, ChevronRight } from "../icons";
import Gallery from "../icons/Gallery";
import * as S from "./ImageSourceSheet.styles";

type ImageSourceSheetProps = {
  onCamera: () => void;
  onGallery: () => void;
};

function ImageSourceSheet({ onCamera, onGallery }: ImageSourceSheetProps) {
  return (
    <>
      <S.PhotoSheetHeader>
        <S.PhotoSheetTitle>Seleccionar origen</S.PhotoSheetTitle>

        <S.PhotoSheetDescription>
          ¿Desde dónde quieres subir la foto?
        </S.PhotoSheetDescription>
      </S.PhotoSheetHeader>

      <S.PhotoSheetActions>
        <S.PhotoSheetAction type="button" onClick={onCamera}>
          <S.PhotoSheetActionIcon>
            <Camera aria-hidden="true" />
          </S.PhotoSheetActionIcon>

          <S.PhotoSheetActionCopy>
            <S.PhotoSheetActionTitle>Tomar foto</S.PhotoSheetActionTitle>

            <S.PhotoSheetActionDescription>
              Usa la cámara de tu celular
            </S.PhotoSheetActionDescription>
          </S.PhotoSheetActionCopy>

          <ChevronRight aria-hidden="true" />
        </S.PhotoSheetAction>

        <S.PhotoSheetAction type="button" onClick={onGallery}>
          <S.PhotoSheetActionIcon>
            <Gallery aria-hidden="true" />
          </S.PhotoSheetActionIcon>

          <S.PhotoSheetActionCopy>
            <S.PhotoSheetActionTitle>
              Elegir de la galería
            </S.PhotoSheetActionTitle>

            <S.PhotoSheetActionDescription>
              Busca en tus fotos guardadas
            </S.PhotoSheetActionDescription>
          </S.PhotoSheetActionCopy>

          <ChevronRight aria-hidden="true" />
        </S.PhotoSheetAction>
      </S.PhotoSheetActions>
    </>
  );
}

export default ImageSourceSheet;

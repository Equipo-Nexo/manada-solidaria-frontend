import { ChevronRight, Camera, ImagePlus } from '../../components/icons'
import ImageUpload from '../../components/imageUpload/ImageUpload'
import { useCamera } from '../../hooks/camera/useCamera'
import {
  PhotoSheetAction,
  PhotoSheetActionCopy,
  PhotoSheetActionDescription,
  PhotoSheetActionIcon,
  PhotoSheetActionTitle,
  PhotoSheetDescription,
  PhotoSheetHeader,
  PhotoSheetTitle,
  PublishField,
  PublishForm,
  PublishFormDescription,
  PublishFormHeader,
  PublishFormPage,
  PublishFormTitle,
  PublishInput,
  PublishSubmitButton,
  PublishTextarea,
} from './PublishForm.styles'

function PublishAnimal() {
  const { capturedPhoto, chooseFromGallery, takePhoto } = useCamera()

  return (
    <PublishFormPage>
      <PublishFormHeader>
        <PublishFormTitle>Publicar un animal</PublishFormTitle>
        <PublishFormDescription>Perdidos, encontrados, en adopción o en la calle.</PublishFormDescription>
      </PublishFormHeader>
      <PublishForm onSubmit={(event) => event.preventDefault()}>
        <ImageUpload imageUrl={capturedPhoto?.url}>
          {({ close }) => (
            <>
              <PhotoSheetHeader>
                <PhotoSheetTitle>Seleccionar origen</PhotoSheetTitle>
                <PhotoSheetDescription>¿Desde dónde quieres subir la foto?</PhotoSheetDescription>
              </PhotoSheetHeader>
              <PhotoSheetAction
                type="button"
                onClick={() => {
                  close()
                  void takePhoto()
                }}
              >
                <PhotoSheetActionIcon>
                  <Camera aria-hidden="true" />
                </PhotoSheetActionIcon>
                <PhotoSheetActionCopy>
                  <PhotoSheetActionTitle>Tomar foto</PhotoSheetActionTitle>
                  <PhotoSheetActionDescription>Usa la cámara de tu celular</PhotoSheetActionDescription>
                </PhotoSheetActionCopy>
                <ChevronRight aria-hidden="true" />
              </PhotoSheetAction>
              <PhotoSheetAction
                type="button"
                onClick={() => {
                  close()
                  void chooseFromGallery()
                }}
              >
                <PhotoSheetActionIcon>
                  <ImagePlus aria-hidden="true" />
                </PhotoSheetActionIcon>
                <PhotoSheetActionCopy>
                  <PhotoSheetActionTitle>Elegir de la galería</PhotoSheetActionTitle>
                  <PhotoSheetActionDescription>Busca en tus fotos guardadas</PhotoSheetActionDescription>
                </PhotoSheetActionCopy>
                <ChevronRight aria-hidden="true" />
              </PhotoSheetAction>
            </>
          )}
        </ImageUpload>
        <PublishField>
          Nombre o referencia
          <PublishInput type="text" name="name" />
        </PublishField>
        <PublishField>
          Ubicación
          <PublishInput type="text" name="location" />
        </PublishField>
        <PublishField>
          Descripción
          <PublishTextarea name="description" />
        </PublishField>
        <PublishSubmitButton type="submit">Publicar</PublishSubmitButton>
      </PublishForm>
    </PublishFormPage>
  )
}

export default PublishAnimal

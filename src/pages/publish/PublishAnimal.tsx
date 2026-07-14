import ImageSourceSheet from "../../components/imageUpload/ImageSourceSheet";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import { useCamera } from "../../hooks/camera/useCamera";
import {
  PublishField,
  PublishForm,
  PublishFormHeader,
  PublishFormPage,
  PublishFormTitle,
  PublishInput,
  PublishSubmitButton,
  PublishTextarea,
} from "./PublishForm.styles";

function PublishAnimal() {
  const { capturedPhoto, chooseFromGallery, takePhoto } = useCamera();

  return (
    <PublishFormPage>
      <PublishFormHeader>
        <PublishFormTitle>Publicar un animal</PublishFormTitle>
      </PublishFormHeader>
      <PublishForm onSubmit={(event) => event.preventDefault()}>
        <ImageUpload imageUrl={capturedPhoto?.url}>
          {({ close }) => (
            <ImageSourceSheet
              onCamera={() => {
                close();
                void takePhoto();
              }}
              onGallery={() => {
                close();
                void chooseFromGallery();
              }}
            />
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
  );
}

export default PublishAnimal;

import ImageUpload from "../../components/imageUpload/ImageUpload";
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
  return (
    <PublishFormPage>
      <PublishFormHeader>
        <PublishFormTitle>Publicar un animal</PublishFormTitle>
      </PublishFormHeader>
      <PublishForm onSubmit={(event) => event.preventDefault()}>
        <ImageUpload />
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

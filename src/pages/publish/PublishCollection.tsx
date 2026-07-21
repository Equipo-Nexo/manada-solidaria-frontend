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

function PublishCollection() {
  return (
    <PublishFormPage>
      <PublishFormHeader>
        <PublishFormTitle>Publicar colecta de dinero</PublishFormTitle>
      </PublishFormHeader>
      <PublishForm onSubmit={(event) => event.preventDefault()}>
        <PublishField>
          Título de la colecta
          <PublishInput type="text" name="title" />
        </PublishField>
        <PublishField>
          Monto objetivo
          <PublishInput type="number" name="goalAmount" min="0" />
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

export default PublishCollection;

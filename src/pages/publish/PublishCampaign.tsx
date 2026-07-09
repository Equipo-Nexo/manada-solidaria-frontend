import {
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

function PublishCampaign() {
  return (
    <PublishFormPage>
      <PublishFormHeader>
        <PublishFormTitle>Publicar una campaña</PublishFormTitle>
        <PublishFormDescription>
          Castraciones, vacunaciones, donaciones o eventos solidarios.
        </PublishFormDescription>
      </PublishFormHeader>
      <PublishForm onSubmit={(event) => event.preventDefault()}>
        <PublishField>
          Nombre de la campaña
          <PublishInput type="text" name="title" />
        </PublishField>
        <PublishField>
          Fecha
          <PublishInput type="date" name="date" />
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

export default PublishCampaign

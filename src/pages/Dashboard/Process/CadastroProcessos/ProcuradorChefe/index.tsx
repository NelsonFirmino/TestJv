import * as S from "../styled";

const CPPC = () => {
  return (
    <>
      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Dados Gerais</S.TitleSection>
        </S.TitleSectionContainer>
        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Sistema Processual:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Tribunal:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Instância:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Número do Processo:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Relevância:</S.FieldTitle>
          </S.ContainerField>
        </S.ContentSection>

        <S.ContentSection>
          <S.ContainerField>
            <S.FieldTitle>Processo Relacionado:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Assuntos:</S.FieldTitle>
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Valor do Processo (R$):</S.FieldTitle>
          </S.ContainerField>
          <S.ContainerField>
            <S.FieldTitle>Físico: *</S.FieldTitle>
          </S.ContainerField>
        </S.ContentSection>
      </S.Section>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Partes</S.TitleSection>
          <S.AddPartButton>Adicionar Parte</S.AddPartButton>
        </S.TitleSectionContainer>
        <S.ContentSection></S.ContentSection>
        <S.ContainerSubmitObservation>
          <S.SubmitObservationForm type="button">
            Editar Processo
          </S.SubmitObservationForm>
        </S.ContainerSubmitObservation>
      </S.Section>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Consulta e adição de observação</S.TitleSection>
        </S.TitleSectionContainer>
      </S.Section>
    </>
  );
};

export default CPPC;

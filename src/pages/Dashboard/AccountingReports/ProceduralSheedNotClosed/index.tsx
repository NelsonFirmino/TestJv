import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitProceduralSheedNotClosed } from "./interfaces/procedural-sheed-not-closed.interface";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useMutation } from "react-query";
import { getProceduralSheedNotClosed } from "../../../../api/services/accountingReports/proceduralSheedNotClosed/proceduralSheedNotClosed";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import * as S from "./styled";

const ProceduralSheedNotClosed = () => {
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<SubmitProceduralSheedNotClosed>({ mode: "onChange" });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getProceduralSheedNotClosed, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitProceduralSheedNotClosed> = (params) => {
    mutate({
      ...params,
      idProcurador: params.idProcurador.value,
      isSemReposta: params.isSemReposta,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE FICHA PROCESSUAIS NÃO ENCERRADAS - DCJE" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Procurador(a) responsável: *</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idProcurador"
                control={control}
                rules={{
                  required: "É obrigatório selecionar um(a) procurador(a)",
                }}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingAttorneysList}
                    placeholder="Selecione o(a) procurador(a)"
                    {...field}
                    options={attorneysList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Apenas Fichas Sem Resposta:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="isSemReposta"
                control={control}
                render={({ field }) => (
                  <S.Section>
                    <S.RadioButtonContainer htmlFor="isSemReposta">
                      <S.RadioButtonLabel value={field.value}>
                        {field.value ? "SIM" : "NÃO"}
                      </S.RadioButtonLabel>
                      <S.ToggleButton {...register("isSemReposta")} />
                    </S.RadioButtonContainer>
                  </S.Section>
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.WarningMessage>{response?.message}</S.WarningMessage>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                idProcurador: {
                  label: undefined,
                  value: undefined,
                },
                isSemReposta: false,
              })
            }
          >
            Limpar
          </S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default ProceduralSheedNotClosed;

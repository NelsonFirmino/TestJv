import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { GetProcessesQuantityByDeadline } from "../../../../api/services/reports";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useSpecialsAll } from "../../../../hooks/useSpecialsAll";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitProcessesQuantityByDeadline } from "./interfaces/processesQuantityByDeadline.interface";
import * as S from "./styled";

const ProcessesQuantityByDeadline = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { specialsList, loadingSpecialsList } = useSpecialsAll();
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitProcessesQuantityByDeadline>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(GetProcessesQuantityByDeadline, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitProcessesQuantityByDeadline> = (
    params
  ) => {
    mutate({
      ...params,
      dtInicio: params.dtInicio,
      dtFim: params.dtFim,
      idProcurador: params.idProcurador?.value,
      idEspecializada: params.idEspecializada?.value,
      idSecretaria: params.idSecretaria?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="QUANTITATIVOS DE PROCESSOS POR PRAZO DE ATUAÇÃO, POR ESPECIALIZADA, NÚCLEOS E OUTRAS UNIDADES E POR PROCURADORES/AS" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Período: *</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.dtInicio?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={defaultDate}
                  {...register("dtInicio", {
                    required: "Data de início de período é obrigatória.",
                  })}
                />
              </S.DateContent>

              <S.DateContent error={errors.dtFim?.message}>
                <S.DateDescription>Fim</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Fim"
                  defaultValue={defaultDate}
                  {...register("dtFim", {
                    required: "Data de fim de período é obrigatória.",
                    validate: (dtFim) => {
                      if (watch("dtInicio") > dtFim) {
                        return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                      }
                    },
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
          </S.FieldDateContainer>

          <S.ErrorMessage>{errors.dtInicio?.message}</S.ErrorMessage>
          <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
        </S.Section>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Setor:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idEspecializada"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a especializa desejada"
                    {...field}
                    isLoading={loadingSpecialsList}
                    options={specialsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Procurador:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="idProcurador"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o(a) procurador(a)"
                    {...field}
                    isLoading={loadingAttorneysList}
                    options={attorneysList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Secretaria:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idSecretaria" //trocar para idSecretaria
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a secretaria"
                    {...field}
                    options={secretariesList}
                    isLoading={loadingSecretariesist}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.WarningMessage>{response?.message}</S.WarningMessage>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid || isLoading} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() => {
              reset({
                idEspecializada: null,
                idProcurador: null,
                idSecretaria: null,
              });
            }}
          >
            Limpar
          </S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default ProcessesQuantityByDeadline;

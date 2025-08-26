import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getDistributions } from "../../../../api/services/distributions/distributions";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useSpecials } from "../../../../hooks/useSpecials";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitDISTREPO } from "./interfaces/distributions.interface";
import * as S from "./styled";

const DistributionsReport = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
    reset,
  } = useForm<SubmitDISTREPO>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    error,
    isLoading,
  } = useMutation(getDistributions, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitDISTREPO> = (params) => {
    mutate({
      ...params,
      idProcurador: params.idProcurador?.value,
      idEspecializada: params.idEspecializada?.value,
      idSecretaria: params.idSecretaria?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE DISTRIBUIÇÃO" />
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
                    placeholder="Selecione o setor"
                    {...field}
                    options={specialsList}
                    isLoading={loadingSpecialsList}
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
                    placeholder="= Selecione o(a) procurador(a) ="
                    {...field}
                    options={attorneysList}
                    isLoading={loadingAttorneysList}
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
                name="idSecretaria"
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

export default DistributionsReport;

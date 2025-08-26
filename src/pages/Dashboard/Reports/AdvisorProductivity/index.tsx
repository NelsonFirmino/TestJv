import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  HandleAdvisorAttorneysListProps,
  SubmitDCJE,
} from "./interfaces/advisorproductivity.interfaces";
import { PageTitle } from "../../../../components/TitlePage";
import { useMutation } from "react-query";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useAdvisorAttorneys } from "../../../../hooks/useAdvisorAttorneys";
import { useState } from "react";
import * as S from "./styled";
import { GetAdvisorProductivity } from "../../../../api/services/reports";

const AdvisorProductivity = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { advisorAttorneysList, loadingAdvisorAttorneysList } =
    useAdvisorAttorneys();
  const [advisorAttorneysState, setAdvisorAttorneysState] =
    useState(advisorAttorneysList);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitDCJE>({
    mode: "onChange",
  });

  function handleAdvisorAttorneysList({
    value,
  }: HandleAdvisorAttorneysListProps) {
    const array = advisorAttorneysList?.filter(
      (at) => at.idProcurador === value
    );
    setAdvisorAttorneysState(array);
  }

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(GetAdvisorProductivity, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitDCJE> = async (params) => {
    mutate({
      ...params,
      idProcurador: params.idProcurador?.value,
      idAssessor: params.idAssessor?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PRODUTIVIDADE DOS ASSESSORES" />
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
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("dtFim", {
                    required: "Data de fim de período é obrigatória.",
                    validate: (dtFim: string) => {
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
            <S.SectionTitle>Procurador:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idProcurador"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingAttorneysList}
                    placeholder="Selecione o(a) procurador(a)"
                    {...field}
                    options={attorneysList}
                    onChange={(value) => {
                      handleAdvisorAttorneysList(value as any);
                      //field.onChange(value as any);
                      reset({
                        idProcurador: value,
                        idAssessor: null,
                      });
                    }}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Assessor:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idAssessor"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingAdvisorAttorneysList}
                    placeholder="Selecione o(a) acessor(a)"
                    {...field}
                    options={advisorAttorneysState}
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
            onClick={() =>
              reset({
                idAssessor: null,
                idProcurador: null,
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

export default AdvisorProductivity;

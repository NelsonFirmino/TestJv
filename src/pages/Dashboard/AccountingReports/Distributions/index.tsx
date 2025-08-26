import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitDCJE } from "./interfaces/distributions.inteface";
import { PageTitle } from "../../../../components/TitlePage";
import { getDistributions } from "../../../../api/services/accountingReports/distributions/distributions";
import { useMutation } from "react-query";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useSpecials } from "../../../../hooks/useSpecials";
import { useAccountants } from "../../../../hooks/useAccountants";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import * as S from "./styled";

const Distributions = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const { accountantsList, loadingAccountantsList } = useAccountants();
  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitDCJE>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getDistributions, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitDCJE> = async (params) => {
    mutate({
      ...params,
      idContador: params.idContador?.value,
      idEspecializada: params.idEspecializada?.value,
      idProcurador: params.idProcurador?.value,
      idRazao: params.idRazao?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE DISTRIBUIÇÃO - DCJE" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Período</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.dtInicio?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={defaultDate}
                  max={defaultDate}
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
                  max={defaultDate}
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
            <S.SectionTitle>Contador(a) Responsável:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idContador"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingAccountantsList}
                    placeholder="Selecione o(a) contador(a) responsável"
                    {...field}
                    options={accountantsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializada:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idEspecializada"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingSpecialsList}
                    placeholder="Selecione a especializada"
                    {...field}
                    options={specialsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

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
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Razão do Pedido:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idRazao"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingReasonsRequestsList}
                    placeholder="Selecione a razão social"
                    {...field}
                    options={reasonsRequestsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>
        <S.WarningMessage>{response?.message}</S.WarningMessage>
        <S.SubmitButton disabled={!isValid} type="submit">
          Gerar Relatório
          {isLoading && <S.LoadingSpinner />}
        </S.SubmitButton>
      </S.Form>
    </>
  );
};

export default Distributions;

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitDCJE } from "./interfaces/management.interface";
import { PageTitle } from "../../../../components/TitlePage";
import { useAccountants } from "../../../../hooks/useAccountants";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { useMutation } from "react-query";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { getReportsManagement } from "../../../../api/services/accountingReports/management/management";
import * as S from "./styled";

const Management = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { accountantsList, loadingAccountantsList } = useAccountants();
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  const reportOptions = [
    { label: "Estatística Excesso de Cálculo", value: 0 },
    {
      label: "Quantitativo de Distribuições",
      value: 1,
    },
    { label: "Movimentação de Processos", value: 2 },
    { label: "Quantitativo de Resposta", value: 3 },
  ];
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

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getReportsManagement, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitDCJE> = (params) => {
    mutate({
      ...params,
      idContador: params.idContador?.value,
      idProcurador: params.idProcurador?.value,
      idRazao: params.idRazao?.value,
      resource: params.report.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIOS GERENCIAIS - DCJE" />
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
            <S.SectionTitle>Relatório: *</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="report"
                control={control}
                rules={{
                  required: "É obrigatório selecionar um relatório",
                }}
                render={({ field }) => (
                  <S.CustomSelect
                    error={errors.report?.message}
                    placeholder="Selecione o relatório desejado"
                    {...field}
                    options={reportOptions}
                  />
                )}
              />
            </S.FieldContainer>
            <S.ErrorMessage>{errors.report?.message}</S.ErrorMessage>
          </S.Section>

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
                    placeholder="Selecione a razão do pedido"
                    {...field}
                    options={reasonsRequestsList}
                  />
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
                report: {
                  label: "",
                  value: 0,
                },
                idContador: {
                  label: "",
                  value: "0",
                },
                idProcurador: {
                  label: "",
                  value: "0",
                },
                idRazao: {
                  label: "",
                  value: "0",
                },
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

export default Management;

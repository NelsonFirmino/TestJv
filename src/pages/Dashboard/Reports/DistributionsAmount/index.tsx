import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getDistributionsAmount } from "../../../../api/services/distributionsAmount/distributionsAmount";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useSpecials } from "../../../../hooks/useSpecials";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitDISAMOUNT } from "./interfaces/distributionsamount.interface";
import * as MockData from "./mockData";
import * as S from "./styled";

const DistributionsAmount = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const defaultReport = {
    value: 0,
    label: "Quantitativo de Distribuições",
  };
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const [currentReport, setCurrentReport] = useState(MockData.reportOptions[0]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitDISAMOUNT>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getDistributionsAmount, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitDISAMOUNT> = (params) => {
    mutate({
      ...params,
      idProcurador: params.idProcurador?.value,
      isSimplified: Boolean(currentReport.value),
      idEspecializada: params.idEspecializada?.value,
      isEspecializadasFilhas: params.isEspecializadasFilhas,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE QUANTITATIVO DE DISTRIBUIÇÕES" />
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
            <S.SectionTitle>Relatório: *</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="report"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    error={errors.report?.message}
                    placeholder="Selecione o relatório desejado"
                    {...field}
                    options={MockData.reportOptions}
                    defaultValue={defaultReport}
                    onChange={(e: any) => {
                      setCurrentReport(e as (typeof MockData.reportOptions)[0]);
                      field.onChange(e as any);
                    }}
                  />
                )}
              />
            </S.FieldContainer>
            <S.ErrorMessage>{errors.report?.message}</S.ErrorMessage>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializadas:</S.SectionTitle>

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
        </S.Row>

        <S.Section>
          {currentReport.value === 0 ? (
            <>
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
            </>
          ) : (
            <>
              <S.SectionTitle>Especializadas filhas:</S.SectionTitle>
              <S.FieldContainer>
                <Controller
                  name="isEspecializadasFilhas"
                  control={control}
                  render={({ field }) => (
                    <S.Section>
                      <S.RadioButtonContainer>
                        <S.RadioButtonLabel value={field.value}>
                          {field.value ? "SIM" : "NÃO"}
                        </S.RadioButtonLabel>
                        <S.ToggleButton
                          {...register("isEspecializadasFilhas")}
                        />
                      </S.RadioButtonContainer>
                    </S.Section>
                  )}
                />
              </S.FieldContainer>
            </>
          )}
        </S.Section>

        <S.WarningMessage>{response?.message}</S.WarningMessage>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid || isLoading} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() => {
              setCurrentReport(MockData.reportOptions[0]),
                reset({
                  report: defaultReport,
                  idEspecializada: null,
                  idProcurador: null,
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

export default DistributionsAmount;

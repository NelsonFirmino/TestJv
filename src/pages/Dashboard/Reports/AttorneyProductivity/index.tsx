import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  GetAttorneyProductivity,
  GetAttorneyProductivityMonth,
  GetAttorneyProductivityYear,
} from "../../../../api/services/reports";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitAttorneyProductivity } from "./interfaces/attorneyproductivity.interface";
import * as MockData from "./mockData";
import * as S from "./styled";

const AttorneyProductivity = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const [reportType, setReportType] = useState<any>("0");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const defaultMonthYear = `${year}-${month}`;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAttorneyProductivity>({
    mode: "onChange",
  });

  const {
    mutate: mutate,
    data: response,
    isLoading: isLoading,
  } = useMutation(GetAttorneyProductivity, {
    onSuccess: ({ data, status }) => {
      if (status === "OK") {
        openPDFInNewTab(data.file_stream);
      }
    },
  });

  const {
    mutate: mutateMonth,
    data: responseMonth,
    isLoading: isLoadingMonth,
  } = useMutation(GetAttorneyProductivityMonth, {
    onSuccess: ({ data, status }) => {
      if (status === "OK") {
        openPDFInNewTab(data.file_stream);
      }
    },
  });

  const {
    mutate: mutateYear,
    data: responseYear,
    isLoading: isLoadingYear,
  } = useMutation(GetAttorneyProductivityYear, {
    onSuccess: ({ data, status }) => {
      if (status === "OK") {
        openPDFInNewTab(data.file_stream);
      }
    },
  });

  const handleSelectChange = (event: any) => {
    setReportType(event.value);
  };

  const onSubmit: SubmitHandler<SubmitAttorneyProductivity> = async (
    params
  ) => {
    if (reportType == "0") {
      mutate({
        ...params,
        dtInicio: params.dtInicio,
        dtFim: params.dtFim,
        idProcurador: params.idProcurador?.value,
      });
    } else if (reportType == "1") {
      const dateValue = params.nuMes;
      const [year, month] = dateValue.split("-");
      mutateMonth({
        ...params,
        nuMes: month,
        nuAno: year,
        idProcurador: params.idProcurador?.value,
      });
    } else if (reportType == "2") {
      mutateYear({
        ...params,
        nuAno: params.nuAno,
        idProcurador: params.idProcurador?.value,
      });
    }
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PRODUTIVIDADE DOS PROCURADORES" />

      <S.ReportSelectContainer>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Tipo de relatório:</S.SectionTitle>
            <S.FieldContainer>
              <S.CustomSelect
                defaultValue={MockData.reportType[0]}
                required={true}
                onChange={handleSelectChange}
                placeholder="Selecione o tipo de relatório"
                options={MockData.reportType} // mock necessário para escolha de relatório
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>
      </S.ReportSelectContainer>

      {/* // ---------------------------------------------------------------- */}

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {reportType == 0 ? (
          <S.Row>
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
                      max={defaultDate}
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
          </S.Row>
        ) : reportType == 1 ? (
          <S.Row>
            <S.Section>
              <S.SectionTitle>Período: *</S.SectionTitle>
              <S.FieldDateContainer>
                <S.DateContainer>
                  <S.DateContent error={errors.nuMes?.message}>
                    <S.DateDescription>Início</S.DateDescription>
                    <S.DateInput
                      type="month"
                      placeholder="Mês e Ano"
                      max={defaultMonthYear}
                      defaultValue={defaultMonthYear}
                      {...register("nuMes", {
                        required: "Data é obrigatória.",
                      })}
                    />
                  </S.DateContent>
                </S.DateContainer>
              </S.FieldDateContainer>
            </S.Section>
          </S.Row>
        ) : reportType == 2 ? (
          <S.Row>
            <S.Section>
              <S.SectionTitle>Período: *</S.SectionTitle>
              <S.FieldDateContainer>
                <S.DateContainer>
                  <S.DateContent error={errors.dtInicio?.message}>
                    <S.DateDescription>Início</S.DateDescription>
                    <S.DateInput
                      type="number"
                      placeholder="Ano"
                      defaultValue={new Date().getFullYear()}
                      min="2010"
                      max="2100"
                      step="1"
                      {...register("nuAno", {
                        required: "Data é obrigatória.",
                      })}
                    />
                  </S.DateContent>
                </S.DateContainer>
              </S.FieldDateContainer>
            </S.Section>
          </S.Row>
        ) : (
          <S.Row>
            <S.Section>
              <S.SectionTitle>Período: *</S.SectionTitle>
              <S.FieldDateContainer>
                <S.DateContainer>
                  <S.DateContent error={errors.dtInicio?.message}>
                    <S.DateDescription>Início</S.DateDescription>
                    <S.DateInput
                      type="date"
                      placeholder="Início"
                      max={defaultDate}
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
                      max={defaultDate}
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
          </S.Row>
        )}

        {reportType == 0 ? (
          <>
            <S.Row>
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
            <S.WarningMessage>{response?.message}</S.WarningMessage>
          </>
        ) : reportType == 1 ? (
          <>
            <S.Row>
              <S.Section>
                <S.SectionTitle>Procurador: *</S.SectionTitle>
                <S.FieldContainer>
                  <Controller
                    name="idProcurador"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        required={true}
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
            <S.WarningMessage>{responseMonth?.message}</S.WarningMessage>
          </>
        ) : (
          <>
            <S.Row>
              <S.Section>
                <S.SectionTitle>Procurador: *</S.SectionTitle>
                <S.FieldContainer>
                  <Controller
                    name="idProcurador"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        required={true}
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
            <S.WarningMessage>{responseYear?.message}</S.WarningMessage>
          </>
        )}

        <S.ContainerButtons>
          <S.SubmitButton
            disabled={!isValid || isLoading || isLoadingMonth || isLoadingYear}
            type="submit"
          >
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                idProcurador: null,
              })
            }
          >
            Limpar
          </S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
          {isLoadingMonth && <S.LoadingSpinner />}
          {isLoadingYear && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default AttorneyProductivity;

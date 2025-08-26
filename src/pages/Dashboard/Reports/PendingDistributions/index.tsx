import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  getPendingDistributions,
  getPendingDistributionsQuantitative,
} from "../../../../api/services/pendingDistributions/pendingDistributions";
import { PageTitle } from "../../../../components/TitlePage";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useSecretariesSpecials } from "../../../../hooks/useSecretariesSpecials";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitPendingDistribuitions } from "./interfaces/pendingDistributions.interface";
import * as MockData from "./mockData";
import * as S from "./styled";

const PendingDistributions = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  // const { secretariesList, loadingSecretariesist } = useSecretaries();
  const [reportType, setReportType] = useState<any>("");
  const [newSecretariesList, setNewSecretariesList] = useState<any>();
  const [newSpecialList, setNewSpecialList] = useState<any>();
  // const { newFormatedSpecialsList, isloadingSecretariesSpecialList } =
  //   useSecretariesSpecials(newSecretariesList);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitPendingDistribuitions>({
    mode: "onChange",
  });

  const {
    mutate: mutate,
    data: response,
    isLoading: isLoading,
  } = useMutation(getPendingDistributions, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const {
    mutate: mutateQuantitative,
    data: responseQuantitative,
    isLoading: isLoadingQuantitative,
  } = useMutation(getPendingDistributionsQuantitative, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const { secretariesList, loadingSecretariesist } = useSecretaries();

  const [secretariaSelectedOption, setSecretariaSelectedOption] =
    useState(null);

  const [especializadaSelectedOption, setEspecializadaSelectedOption] =
    useState(null);

  const { newFormatedSpecialsList, isloadingSecretariesSpecialList } =
    useSecretariesSpecials(
      secretariaSelectedOption?.value &&
      secretariaSelectedOption?.value.toString()
    );

  const resetFields = () => {
    setEspecializadaSelectedOption(null);
    setSecretariaSelectedOption(null);
  };

  const handleSelectChange = (event: any) => {
    setReportType(event.value);
  };

  const onSubmit: SubmitHandler<SubmitPendingDistribuitions> = async (
    params
  ) => {
    if (reportType != "1") {
      mutate({
        ...params,
        dtPrazo: params.dtPrazo,
        idEspecializada: especializadaSelectedOption
          ? especializadaSelectedOption?.value
          : null,
        idSecretaria: secretariaSelectedOption
          ? secretariaSelectedOption?.value
          : null,
        isCiente: params.isCiente,
        isEspecializadasFilhas: params.isEspecializadasFilhas,
      });
    } else {
      mutateQuantitative({
        ...params,
        dtPrazo: params.dtPrazo,
        idEspecializada: especializadaSelectedOption
          ? especializadaSelectedOption?.value
          : null,
        idSecretaria: secretariaSelectedOption
          ? secretariaSelectedOption?.value
          : null,
        isCiente: params.isCiente,
        isEspecializadasFilhas: params.isEspecializadasFilhas,
      });
    }
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PROCESSOS PENDENTES DE DISTRIBUIÇÃO" />
      <S.Row>
        <S.ReportSelectContainer>
          <S.Section>
            <S.SectionTitle>Tipo de relatório:</S.SectionTitle>
            <S.FieldContainer>
              <S.CustomSelect
                defaultValue={MockData.reportTypeOptions[0]}
                required={true}
                onChange={handleSelectChange}
                placeholder="Selecione o tipo de relatório"
                options={MockData.reportTypeOptions} // mock necessário para escolha de relatório
              />
            </S.FieldContainer>
          </S.Section>
        </S.ReportSelectContainer>
      </S.Row>

      {/* // ---------------------------------------------------------------- */}

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Data Prazo:</S.SectionTitle>
            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtPrazo?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultDate}
                    {...register("dtPrazo", {
                      required: "Data de prazo de período é obrigatória.",
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>
          </S.Section>
        </S.Row>

        <S.Row style={{ marginTop: "2.3rem" }}>
          <S.Section>
            <S.SectionTitle>Secretaria:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="idSecretaria"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    {...field}
                    placeholder="Selecione a secretaria"
                    isClearable={false}
                    options={secretariesList}
                    isLoading={loadingSecretariesist}
                    value={secretariaSelectedOption}
                    onChange={(value: any) => {
                      setSecretariaSelectedOption(value);
                      setEspecializadaSelectedOption(null);
                    }}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializadas:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="idEspecializada"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    {...field}
                    isClearable={false}
                    options={newFormatedSpecialsList}
                    isLoading={isloadingSecretariesSpecialList}
                    placeholder="Selecione a especializada"
                    value={especializadaSelectedOption}
                    onChange={(value: any) => {
                      setEspecializadaSelectedOption(value);
                    }}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.LabelField>
                <S.CheckboxInput type="checkbox" {...register("isCiente")} />
                <S.CheckboxTitle>Trazer processos cientes</S.CheckboxTitle>
              </S.LabelField>
            </S.FieldContainer>
          </S.Section>
        </S.Row>
        <br />
        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.LabelField>
                <S.CheckboxInput
                  type="checkbox"
                  {...register("isEspecializadasFilhas")}
                />
                <S.CheckboxTitle>Trazer especializadas filhas</S.CheckboxTitle>
              </S.LabelField>
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        {reportType != "1" ? (
          <S.WarningMessage>{response?.message}</S.WarningMessage>
        ) : (
          <S.WarningMessage>{responseQuantitative?.message}</S.WarningMessage>
        )}

        <S.ContainerButtons>
          <S.SubmitButton
            disabled={!isValid || isLoading || isLoadingQuantitative}
            type="submit"
          >
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton type="reset" onClick={resetFields}>
            Limpar
          </S.ClearButton>
          {isLoading || (isLoadingQuantitative && <S.LoadingSpinner />)}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default PendingDistributions;

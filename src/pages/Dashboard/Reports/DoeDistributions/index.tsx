import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { getDOEDistributions } from "../../../../api/services/doeDistributions/doeDistributions";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneyBySpecialId } from "../../../../hooks/useAttorneyBySpecialId";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { useSecretariesSpecials } from "../../../../hooks/useSecretariesSpecials";
import { generateDOEReportInDocx } from "../../../../utils/generateDOEReportInDocx.util";
import { SubmitDCJE } from "./interfaces/doedistributions.interface";
import * as S from "./styled";

const DoeDistributions = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    setValue,
    control,
  } = useForm<SubmitDCJE>({
    mode: "onChange",
  });
  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getDOEDistributions, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        generateDOEReportInDocx(data);
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

  const { attorneysBySpecial, isLoadingAttorneysBySpecial } =
    useAttorneyBySpecialId(especializadaSelectedOption?.value);

  const handleToast = (msg: string, error?: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  const onSubmit: SubmitHandler<SubmitDCJE> = (params) => {
    mutate(
      {
        dtInicio: params.dtInicio,
        dtFim: params.dtFim,
        idSecretaria: secretariaSelectedOption?.value,
        idEspecializada: especializadaSelectedOption?.value,
        idProcurador: params.idProcurador?.value,
        isEspecializadasFilhas: params.isEspecializadasFilhas || false,
      },
      {
        onSuccess: (response) => {
          if (response?.status === "OK") {
            handleToast("Relatório gerado com sucesso!", false);
          } else {
            handleToast(response?.message || "Erro ao gerar relatório", true);
          }
        },
        onError: () => {
          handleToast(response?.message || "Erro ao gerar relatório", true);
        },
      }
    );
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE DISTRIBUIÇÃO - DOE" />
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
                  max={defaultDate}
                  defaultValue={new Date().toISOString().substring(0, 10)}
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
                  max={defaultDate}
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

        <S.SectionSelect style={{ display: "flex", gap: "3rem" }}>
          <S.ContainerField>
            <S.SectionTitle>Secretaria:</S.SectionTitle>
            <Controller
              name="idSecretaria"
              control={control}
              render={({ field }) => (
                <S.CustomSelect
                  {...field}
                  isClearable={false}
                  placeholder="Selecione a secretaria"
                  options={secretariesList}
                  isLoading={loadingSecretariesist}
                  value={secretariaSelectedOption}
                  onChange={(value: any) => {
                    setSecretariaSelectedOption(value);
                    setEspecializadaSelectedOption(null);
                    setValue("idProcurador", null);
                  }}
                />
              )}
            />
          </S.ContainerField>

          <S.ContainerField>
            <S.SectionTitle>Especializada: *</S.SectionTitle>
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
                    setValue("idProcurador", null);
                  }}
                />
              )}
            />
          </S.ContainerField>
        </S.SectionSelect>

        <S.SectionSelect>
          <S.ContainerField>
            <S.SectionTitle>Procurador</S.SectionTitle>
            <Controller
              name="idProcurador"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione o procurador"
                  isLoading={isLoadingAttorneysBySpecial}
                  options={attorneysBySpecial}
                  {...field}
                  isDisabled={!Boolean(attorneysBySpecial?.length)}
                  onChange={(data) => {
                    setValue("idProcurador", data as any);
                  }}
                />
              )}
            />
            <S.LabelField>
              <S.CheckboxInput
                type="checkbox"
                {...register("isEspecializadasFilhas")}
              />
              <S.CheckboxTitle>Trazer especializadas filhas</S.CheckboxTitle>
            </S.LabelField>
          </S.ContainerField>
        </S.SectionSelect>

        <S.WarningMessage>{response?.message}</S.WarningMessage>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid || isLoading} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton type="reset">Limpar</S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default DoeDistributions;

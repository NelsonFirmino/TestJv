import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { GetOperatorProductivity } from "../../../../api/services/reports";
import { PageTitle } from "../../../../components/TitlePage";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { SubmitOperatorProductivity } from "./interfaces/operatorproductivity.interfaces";
import * as S from "./styled";

const OperatorProductivity = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitOperatorProductivity>({
    mode: "onChange",
  });

  const { secretariesList, loadingSecretariesist } = useSecretaries();

  const { mutate, isLoading } = useMutation(GetOperatorProductivity, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitOperatorProductivity> = (params) => {
    mutate({
      ...params,
      dtInicio: params.dtInicio,
      dtFim: params.dtFim,
      idSetor: params.idSetor?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PRODUTIVIDADE DOS OPERADORES" />
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
            <S.SectionTitle>Secretarias:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idSetor"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a secretaria desejada"
                    {...field}
                    options={secretariesList}
                    isLoading={loadingSecretariesist}
                  />
                )}
              />
            </S.FieldContainer>
            <S.ErrorMessage>{errors.idSetor?.message}</S.ErrorMessage>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid || isLoading} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                idSetor: null,
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

export default OperatorProductivity;

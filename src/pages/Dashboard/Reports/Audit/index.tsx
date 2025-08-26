import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitAudit } from "./interfaces/audit.interface";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useMutation } from "react-query";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { GetAudit } from "../../../../api/services/reports";

const Audit = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAudit>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(GetAudit, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitAudit> = (params) => {
    mutate({
      ...params,
      dtInicioCadastro: params.dtInicioCadastro,
      dtFimCadastro: params.dtFimCadastro,
      dtInicioCiencia: params.dtInicioCiencia,
      dtFimCiencia: params.dtFimCiencia,
      isAssuntosDistribuidos: params.isAssuntosDistribuidos,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIOS DE AUDITORIA" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Período do cadastro automático: *</S.SectionTitle>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtInicioCadastro?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultDate}
                    {...register("dtInicioCadastro", {
                      required: "Data de início de período é obrigatória.",
                    })}
                  />
                </S.DateContent>

                <S.DateContent error={errors.dtFimCadastro?.message}>
                  <S.DateDescription>Fim</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Fim"
                    defaultValue={defaultDate}
                    {...register("dtFimCadastro", {
                      required: "Data de fim de período é obrigatória.",
                      validate: (dtFimCadastro) => {
                        if (watch("dtInicioCadastro") > dtFimCadastro) {
                          return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                        }
                      },
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>

            <S.ErrorMessage>{errors.dtInicioCadastro?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors.dtFimCadastro?.message}</S.ErrorMessage>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Período da ciência automático: *</S.SectionTitle>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtInicioCiencia?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultDate}
                    {...register("dtInicioCiencia", {
                      required: "Data de início de período é obrigatória.",
                    })}
                  />
                </S.DateContent>

                <S.DateContent error={errors.dtFimCiencia?.message}>
                  <S.DateDescription>Fim</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Fim"
                    defaultValue={defaultDate}
                    {...register("dtFimCiencia", {
                      required: "Data de fim de período é obrigatória.",
                      validate: (dtFimCiencia) => {
                        if (watch("dtInicioCiencia") > dtFimCiencia) {
                          return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                        }
                      },
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>

            <S.ErrorMessage>{errors.dtInicioCiencia?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors.dtFimCiencia?.message}</S.ErrorMessage>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.FieldContainer>
              <S.LabelField>
                <S.CheckboxInput
                  type="checkbox"
                  {...register("isAssuntosDistribuidos")}
                />
                <S.CheckboxTitle>Assuntos Distribuídos</S.CheckboxTitle>
              </S.LabelField>
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
            onClick={() => {
              reset({});
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

export default Audit;

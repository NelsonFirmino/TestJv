import { SubmitHandler, useForm } from "react-hook-form";
import { PageTitle } from "../../../../components/TitlePage";
import { useMutation } from "react-query";
import * as S from "./styled";
import { CustomTable } from "../../../../components/CustomTable";
import { SubmitSearchErgon } from "./interfaces/search-ergon.interface";
import { SharedState } from "../../../../context/SharedContext";
import { GetErgonFinanceiro } from "../../../../api/services/reports";

const Ergon = () => {
  const { user } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<SubmitSearchErgon>({
    mode: "onChange",
  });

  const { mutate, data: response, isLoading } = useMutation(GetErgonFinanceiro);

  const onSubmit: SubmitHandler<SubmitSearchErgon> = (params) => {
    mutate({
      nuVinculo: params.vinculo,
      nuMatricula: params.matricula,
      idUsuario: user["Jvris.User.Id"],
      dtInicio: params.dtIni,
      dtFim: params.dtFim,
    });
  };

  return (
    <>
      <PageTitle
        pageTitle="CONSULTAR FINANCEIRO - ERGON"
        pageIcon={<S.PageIcon />}
      />

      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>Período da Consulta:</S.SectionTitle>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtIni?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultDate}
                    max={defaultDate}
                    {...register("dtIni", {
                      required: "Data de início de período é obrigatória.",
                      validate: (dtIni) => {
                        if (watch("dtFim") < dtIni) {
                          return "Intervalo de data inválido. Data de inicio deve ser antes da data de final.";
                        }
                      },
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
                      validate: (dtFim) => {
                        if (watch("dtIni") > dtFim) {
                          return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                        }
                      },
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>

            <S.ErrorMessage>{errors.dtIni?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
          </S.Section>

          <S.Row>
            <S.Section>
              <S.SectionTitle>Matrícula:</S.SectionTitle>
              <S.FieldContainer>
                <S.TextInput
                  type="number"
                  step="0.01"
                  placeholder="Digite a solicitação"
                  {...register("matricula", {
                    pattern: /^[0-9]*$/,
                  })}
                />
              </S.FieldContainer>
            </S.Section>

            <S.Section>
              <S.SectionTitle>Vínculo:</S.SectionTitle>
              <S.FieldContainer>
                <S.TextInput
                  type="number"
                  step="0.01"
                  placeholder="Digite a solicitação"
                  {...register("vinculo", {
                    pattern: /^[0-9]*$/,
                    onChange: (e) => {
                      if (e.target.value.length > 2) {
                        e.target.value = e.target.value.slice(0, 2);
                      }
                    },
                  })}
                />
              </S.FieldContainer>
            </S.Section>

            <S.Section></S.Section>
          </S.Row>

          {response?.data && response.data.length === 0 && (
            <S.WarningMessage>{"Não foram encontrados dados"}</S.WarningMessage>
          )}

          <S.ContainerButtons>
            <S.SubmitButton disabled={!isValid} type="submit">
              Pesquisar
            </S.SubmitButton>
            <S.ClearButton
              type="reset"
              onClick={() =>
                reset({
                  dtIni: defaultDate,
                  dtFim: defaultDate,
                  idProcesso: null,
                })
              }
            >
              Limpar
            </S.ClearButton>
            {isLoading && <S.LoadingSpinner />}
          </S.ContainerButtons>
        </S.Form>

        <CustomTable
          columns={[
            {
              name: "Data Folha",
              isSortable: true,
              formatToDate: true,
              keyData: "dtFolha",
            },
            {
              name: "Data Direito",
              isSortable: true,
              formatToDate: true,
              keyData: "dtDireito",
            },
            {
              name: "Número Folha",
              isSortable: true,
              keyData: "txFolha",
            },
            {
              name: "Código",
              isSortable: true,
              keyData: "nuRubrica",
            },
            {
              name: "Rubrica",
              isSortable: true,
              keyData: "txRubrica",
            },
            {
              name: "Valor",
              isSortable: true,
              formatToCurrency: true,
              keyData: "vaRubrica",
            },
          ]}
          data={response?.data ? response.data : []}
          showSelectNumberOfRows={true}
          selectRows={true}
          pdfButton={{
            nameFile: "consulta-ergon",
          }}
          csvButton={{
            nameFile: "consulta-ergon",
          }}
          defaultSortKeyColumn={{
            key: "dtDireito",
            direction: "ascending",
          }}
          isLoading={isLoading}
          showPagination={true}
          showSearchField={true}
        />
      </S.Wrapper>
    </>
  );
};

export default Ergon;

import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { GetProceduralFormClosed } from "../../../../api/services/process/process";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { Buttons } from "./components/Buttons";
import { SubmitRecClosedProc } from "./interfaces/recordclosedproceedings.interface";
import * as S from "./styled";

const RecordClosedProceedings = () => {
  const { user, selectedUser, pagination } = SharedState();

  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const defaultDate = new Date().toISOString().substring(0, 10);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitRecClosedProc>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(GetProceduralFormClosed);

  useEffect(() => {
    mutate(
      {
        dtFim: getValues("dtFim") || null,
        dtIni: getValues("dtIni") || null,
        page: pagination.page,
        pageSize: pagination.pageSize,
        idPerfil: user["jvris.User.Perfil"],
        idUsuarioCadastro: user["Jvris.User.Id"],
        isChefe: user["Jvris.User.isChefe"],
        idProcurador: +user_id,
      },
      {
        onSettled: () => {},
      }
    );
  }, [pagination]);

  const loadOptionsSpecials = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 5) {
      callback(null);
    } else {
      autocompleteSpecials({ txNumero: inputValue }).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
              label: atc.txNumeroFormatado,
              value: atc.id,
            }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  const onSubmit: SubmitHandler<SubmitRecClosedProc> = (params) => {
    mutate(
      {
        dtFim: params?.dtFim,
        dtIni: params?.dtIni,
        // sim, é IdProcurador
        idProcurador: +user_id,
        idFichaProcessual:
          params?.idFichaProcessual.length > 0
            ? params.idFichaProcessual
            : null,
        idProcesso: params?.idProcesso?.value,
        page: pagination.page,
        pageSize: pagination.pageSize,
        idPerfil: user["jvris.User.Perfil"],
        idUsuarioCadastro: user["Jvris.User.Id"],
        isChefe: user["Jvris.User.isChefe"],
      },
      {
        onSettled: () => {},
      }
    );
  };

  return (
    <>
      <PageTitle
        pageTitle="LISTAGEM DAS FICHAS PROCESSUAIS ENCERRADAS"
        pageIcon={<S.PageIcon />}
      />

      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>Data de Cadastro:</S.SectionTitle>

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
            <S.Section style={{ width: "5rem" }}>
              <S.SectionTitle>Solicitação:</S.SectionTitle>
              <S.FieldContainer>
                <S.TextInput
                  type="text"
                  placeholder="Digite a solicitação"
                  {...register("idFichaProcessual")}
                />
              </S.FieldContainer>
            </S.Section>
            <S.Section>
              <S.SectionTitle>Processo:</S.SectionTitle>

              {loadOptionsSpecials && (
                <S.FieldContainer>
                  <Controller
                    name="idProcesso"
                    control={control}
                    render={({ field }) => (
                      <S.CustomAutocomplete
                        placeholder="Digite no mínimo 5 digitos iniciais"
                        cacheOptions={true}
                        loadOptions={loadOptionsSpecials}
                        defaultOptions
                        noOptionsMessage={() =>
                          "Número de processo não encontrado"
                        }
                        isClearable
                        {...field}
                      />
                    )}
                  />
                </S.FieldContainer>
              )}
            </S.Section>
          </S.Row>

          <S.WarningMessage>{response?.message}</S.WarningMessage>

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
              name: "Solicitação",
              isSortable: true,
              keyData: "id",
            },
            {
              name: "Nº Processo",
              isSortable: true,
              keyData: "txNumeroFormatado",
            },
            {
              name: "Fase Processual",
              isSortable: true,
              keyData: "txFaseProcessual",
            },
            {
              name: "Encaminhado à DCJE",
              isSortable: true,
              keyData: "dtCadastro",
              formatToDate: true,
            },
            {
              name: "Responsável pelo cálculo",
              isSortable: true,
              keyData: "txContador",
            },
            {
              name: "Respondido em",
              isSortable: true,
              keyData: "txDataResposta",
            },
            {
              name: "Divergência",
              isSortable: true,
              keyData: "vaDivergencia",
              formatToCurrency: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "chaveFalsa",
              component: {
                element: (data) => <Buttons dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          data={response?.data ? response.data : []}
          showSelectNumberOfRows={true}
          isLoading={isLoading}
          showPagination={true}
          showSearchField={true}
          selectRows={true}
          tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
          pdfButton={{
            nameFile: "fichas-processuais-encerradas",
          }}
          csvButton={{
            nameFile: "fichas-processuais-encerradas",
          }}
          requestPagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalItens: response?.totalItens,
          }}
          defaultSortKeyColumn={{
            key: "dtCadastro",
            direction: "ascending",
          }}
        />
      </S.Wrapper>
    </>
  );
};

export default RecordClosedProceedings;

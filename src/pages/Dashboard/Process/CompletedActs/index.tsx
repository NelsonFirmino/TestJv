import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getCompletedActs } from "../../../../api/services/completedActs/completedacts";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useSpecials } from "../../../../hooks/useSpecials";
import { RemoveCompletedActButton } from "./components/RemoveCompletedActButton";
import { SubmitCompActs } from "./interfaces/completedacts.inteface";
import * as S from "./styled";

const CompletedActs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { user, selectedUser } = SharedState();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const defaultPreviousMonthDate = currentDate.toISOString().substring(0, 10);
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { mutate, data: response, isLoading } = useMutation(getCompletedActs);
  const [updateTable, setUpdateTable] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitCompActs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitCompActs> = (params) => {
    mutate({
      dtFim: params.dtFim,
      dtInicio: params.dtInicio,
      idEspecializada: params.idEspecializada?.value || "0",
      txProcesso: params?.txProcesso || null,
      idProcurador: selectedUser?.id.toString() || user["Jvris.User.Id"],
    });

    const queryParams = new URLSearchParams({
      dtFim: params.dtFim,
      dtInicio: params.dtInicio,
      idEspecializada: params.idEspecializada?.value || "0",
      txProcesso: params?.txProcesso,
    }).toString();

    navigate(`?${queryParams}`);
  };

  useEffect(() => {
    mutate({
      dtFim: searchParams.get("dtFim") || watch("dtFim") || null,
      dtInicio: searchParams.get("dtInicio") || watch("dtInicio") || null,
      idEspecializada:
        searchParams.get("idEspecializada") ||
        watch("idEspecializada")?.value ||
        "0",
      txProcesso: searchParams.get("txProcesso") || watch("txProcesso") || null,
      idProcurador: selectedUser?.id.toString() || user["Jvris.User.Id"],
    });
  }, [selectedUser, updateTable]);

  return (
    <>
      <PageTitle
        pageTitle="CONSULTA ATOS CONCLUÍDOS"
        pageIcon={<S.PageIcon />}
      />

      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>Período de Conclusão</S.SectionTitle>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtInicio?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultPreviousMonthDate}
                    max={defaultDate}
                    {...register("dtInicio", {
                      required: "Data de início de período é obrigatória.",
                      validate: (dtInicio) => {
                        if (watch("dtFim") < dtInicio) {
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
              <S.SectionTitle>Nº Processo:</S.SectionTitle>

              <S.FieldContainer>
                <S.TextInput
                  type="input"
                  placeholder="Digite o Nº do Processo"
                  {...register("txProcesso")}
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

          <S.ContainerButtons>
            <S.SubmitButton disabled={!isValid} type="submit">
              Consultar
            </S.SubmitButton>

            <S.ClearButton
              type="reset"
              onClick={() =>
                reset({
                  dtInicio: defaultDate,
                  dtFim: defaultDate,
                  idEspecializada: null,
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
              name: "Nº Processo",
              keyData: "txNumeroFormatado",
              isSortable: true,
            },
            {
              name: "Especializada",
              keyData: "txEspecializada",
              isSortable: true,
            },
            {
              name: "Data Distribuição",
              keyData: "dtDistribuicao",
              isSortable: true,
              formatToDate: true,
            },
            {
              name: "Tipo Conclusão",
              keyData: "txTipo",
              isSortable: true,
            },
            {
              name: "Data Conclusão",
              keyData: "dtConclusao",
              isSortable: true,
              formatToDate: true,
            },
            {
              name: "Hora Conclusão",
              keyData: "hrConclusao",
              isSortable: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "b",
              component: {
                element: (data) => (
                  <RemoveCompletedActButton
                    dataTable={data}
                    onDeleteSuccess={() => {
                      setUpdateTable(!updateTable);
                    }}
                  />
                ),
                isButton: true,
              },
            },
          ]}
          data={response?.data ? response.data : []}
          isLoading={isLoading}
          showPagination={true}
          showSearchField={true}
          csvButton={{
            nameFile: "atos-concluidos",
          }}
          pdfButton={{
            nameFile: "atos-concluidos",
          }}
          defaultSortKeyColumn={{
            key: "dtConclusao",
            direction: "descending",
          }}
          showSelectNumberOfRows={true}
          selectRows={true}
        />
      </S.Wrapper>
    </>
  );
};

export default CompletedActs;

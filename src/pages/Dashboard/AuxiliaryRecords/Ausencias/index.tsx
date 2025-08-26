import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { getAbsencesAttorney } from "../../../../api/services/absences/absences";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useSpecials } from "../../../../hooks/useSpecials";
import { EditButton } from "./components/EditButton";
import { RemoveButton } from "./components/RemoveButton";
import { SubmitSearchProps } from "./interfaces/submit-search.interface";
import * as S from "./styled";
import { SharedState } from "../../../../context/SharedContext";

const Ausencias = () => {
  const { user, selectedUser } = SharedState();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const defaultDate = new Date().toISOString().substring(0, 10);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitSearchProps>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getAbsencesAttorney);

  useEffect(() => {
    mutate({
      dtFim: watch("dtFim") || null,
      dtInicio: watch("dtInicio") || null,
      idEspecializada: watch("idEspecializada")?.value || null,
      usuarioSelecionado: selectedUser?.id,
    });
  }, [selectedUser]);

  const onSubmit: SubmitHandler<SubmitSearchProps> = async (params) => {
    mutate({
      idEspecializada: params?.idEspecializada?.value,
      dtFim: params?.dtFim,
      dtInicio: params?.dtInicio,
      usuarioSelecionado: selectedUser?.id,
    });
  };

  return (
    <>
      <PageTitle
        pageTitle="Lista de ausências"
        pageIcon={<S.PageIcon />}
        button={
          <S.RedirectPage to="/dashboard/cadastros-auxiliares/cadastro-ausencias">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.Wrapper>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Section>
            <S.SectionTitle>Período</S.SectionTitle>

            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtInicio?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    max={defaultDate}
                    {...register("dtInicio")}
                  />
                </S.DateContent>

                <S.DateContent error={errors.dtFim?.message}>
                  <S.DateDescription>Fim</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Fim"
                    max={defaultDate}
                    {...register("dtFim", {
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

          {+user["jvris.User.Perfil"] === 5 && (
            <S.Row>
              <S.Section>
                <S.SectionTitle>Especializada:</S.SectionTitle>

                <S.FieldContainer>
                  <Controller
                    name="idEspecializada"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        isLoading={loadingSpecialsList}
                        placeholder="Selecione a especializada"
                        {...field}
                        options={specialsList}
                      />
                    )}
                  />
                </S.FieldContainer>
              </S.Section>
              <S.Section></S.Section>
              <S.Section></S.Section>
            </S.Row>
          )}

          <S.ContainerButtons>
            <S.SubmitButton disabled={!isValid} type="submit">
              Buscar
            </S.SubmitButton>
            {isLoading && <S.LoadingSpinner />}
            <S.ClearButton
              type="reset"
              onClick={() =>
                reset({
                  dtFim: "",
                  dtInicio: "",
                  idEspecializada: null,
                })
              }
            >
              Limpar
            </S.ClearButton>
          </S.ContainerButtons>
        </S.Form>
        <CustomTable
          columns={[
            {
              name: "Procurador",
              isSortable: true,
              keyData: "txProcurador",
            },
            {
              name: "Tipo de Ausência",
              isSortable: true,
              keyData: "txTipoAusencia",
            },
            {
              name: "Data Defeso",
              isSortable: true,
              keyData: "dtDefeso",
              formatToDate: true,
            },
            {
              name: "Data Início",
              isSortable: true,
              keyData: "dtInicio",
              formatToDate: true,
            },
            {
              name: "Data Fim",
              isSortable: true,
              keyData: "dtFim",
              formatToDate: true,
            },
            {
              name: "",
              isSortable: false,
              keyData: "a",
              component: {
                element: (data) => <EditButton dataTable={data} />,
                isButton: true,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "b",
              component: {
                element: (data) => <RemoveButton dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          data={response?.data ? response.data : []}
          showSelectNumberOfRows={true}
          selectRows={true}
          pdfButton={{
            nameFile: "lista-ausências",
          }}
          csvButton={{
            nameFile: "lista-ausências",
          }}
          selectDataColumnButton={{
            columns: [
              {
                name: "Procurador",
                key: "txProcurador"
              },
              {
                name: "Tipo de Ausência",
                key: "txTipoAusencia"
              },
              {
                name: "Data Defeso",
                key: "dtDefeso"
              }
            ]
          }}
          defaultSortKeyColumn={{
            key: "dtDefeso",
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

export default Ausencias;

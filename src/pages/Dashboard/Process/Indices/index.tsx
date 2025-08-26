import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { listIndices } from "../../../../api/services/indices/indices";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { EditIndice } from "./components/EditIndice";
import { ModalAddIndice } from "./components/AddIndice";
import { RemoveIndice } from "./components/RemoveIndice";
import { SubmitIndicesProps } from "./interfaces/submit-indices.interfaces";
import * as S from "./styled";

const Indices = () => {
  const { pagination } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const [isOpenModal, setOpenModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
    watch,
  } = useForm<SubmitIndicesProps>({
    mode: "onChange",
  });

  const { mutate, data: response, isLoading } = useMutation(listIndices);

  useEffect(() => {
    mutate({
      dtFim: getValues("dtFim") || null,
      dtInicio: getValues("dtInicio") || null,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  }, [pagination]);

  const onSubmit: SubmitHandler<SubmitIndicesProps> = async (params) => {
    mutate({
      dtFim: params?.dtFim,
      dtInicio: params?.dtInicio,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  };

  // TODO: formatação com vírgula
  return (
    <>
      <ModalAddIndice isOpenModal={isOpenModal} setOpenModal={setOpenModal} />
      <PageTitle
        pageTitle="LISTA DE VALORES DE ÍNDICES"
        pageIcon={<S.PageIcon />}
        button={
          <S.AddIndice onClick={() => setOpenModal(true)}>
            <S.RedirectPageIcon />
          </S.AddIndice>
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
                    {...register("dtInicio", {})}
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
              name: "Data Índice",
              isSortable: true,
              keyData: "dtIndice",
              formatToDate: true,
            },
            {
              name: "SELIC",
              isSortable: true,
              keyData: "vaSelic",
            },
            {
              name: "IPCA",
              isSortable: true,
              keyData: "vaIpca",
            },
            {
              name: "TR",
              isSortable: true,
              keyData: "vaTr",
            },
            {
              name: "Poupança",
              isSortable: true,
              keyData: "vaPoupanca",
            },
            {
              name: "",
              isSortable: false,
              keyData: "chavefalsa",
              component: {
                element: (data) => <EditIndice dataTable={data} />,
                isButton: true,
              },
            },
            {
              name: "",
              isSortable: false,
              keyData: "chavefalsa2",
              component: {
                element: (data) => <RemoveIndice dataTable={data} />,
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
          tootTipSearcField="Campos de pesquisa filtra apenas dados da página atual da tabela."
          requestPagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalItens: response?.totalItens,
          }}
          pdfButton={{
            nameFile: "lista-valores-indices",
          }}
          csvButton={{
            nameFile: "lista-valores-indices",
          }}
        />
      </S.Wrapper>
    </>
  );
};

export default Indices;

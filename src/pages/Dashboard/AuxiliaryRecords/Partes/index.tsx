import { useState } from "react";
import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import JvrisTable from "../../../../components/JvrisTable";
import theme from "../../../../globalStyle/theme";
import { PencilSimple, X } from "phosphor-react";
import { formatDataToTable } from "../../../../utils/formatDataToTable";
import { ModalAddEdit } from "./components/ModalAddEdit";
import { ModalRemove } from "./components/ModalRemove";
import { usePartes } from "../../../../hooks/usePartes";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  getParteEspecifica,
  getPartes,
} from "../../../../api/services/partes/partes";
import { SubmitParte } from "./interfaces/partes.interface";
import { formatDataToTableExtra } from "../../../../utils/formatDataToTableExtra";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../components/CustomTable";
import { PersonType } from "./components/PersonType";
import { Document } from "./components/Document";
import { Actions } from "./components/Actions";

const Partes = () => {
  const { partes, isLoadingPartes } = usePartes();
  const [idParte, setIdParte] = useState<number>(null);
  const [txParte, setTxParte] = useState<string>("");
  const [txTipoPessoa, setTxTipoPessoa] = useState<string>("");
  const [txCpfCnpj, setTxCpfCnpj] = useState<string>("");
  const [showModalAddEdit, setShowModalAddEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ToggleElement = () => {
    setIsVisible(!isVisible);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitParte>({
    mode: "onChange",
  });

  const { mutate: mutateParteEspec, data: response } = useMutation(
    getParteEspecifica,
    {
      onSuccess: (data) => {
        if (data?.status === "OK") {
        }
      },
    }
  );

  const onSubmit: SubmitHandler<SubmitParte> = (params) => {
    mutateParteEspec({
      txCpf: params.txCpf.replace(/[^\d]/g, ""),
      txParte: params.txParte,
    });

    queryClient.invalidateQueries(`partes`);
    getPartes();
  };

  return (
    <>
      {showModalAddEdit && (
        <ModalAddEdit
          id={idParte}
          txParte={txParte}
          txTipoPessoa={txTipoPessoa}
          txCpfCnpj={txCpfCnpj}
          setShowModalAddEdit={setShowModalAddEdit}
        />
      )}

      {showModalRemove && (
        <ModalRemove id={idParte} setShowModalRemove={setShowModalRemove} />
      )}
      <PageTitle pageTitle="PARTES" pageIcon={<S.PageIcon />} />

      <S.Wrapper>
        <S.Row>
          <S.ContainerButtons>
            <S.SubmitButton onClick={() => ToggleElement()}>
              Buscar
            </S.SubmitButton>
          </S.ContainerButtons>
          <S.ContainerButtons>
            <S.SubmitButton
              onClick={() => {
                setIdParte(null);
                setTxParte("");
                setShowModalAddEdit(!showModalAddEdit);
              }}
            >
              Adicionar
            </S.SubmitButton>
          </S.ContainerButtons>
        </S.Row>

        {isVisible ? (
          <S.ToggleContainer>
            <S.Form onSubmit={handleSubmit(onSubmit)}>
              <S.ToggleRow>
                <S.Section>
                  <S.SectionTitle>Nome: *</S.SectionTitle>
                  <S.TextInput
                    required={false}
                    placeholder="Digite o nome"
                    {...register("txParte", {
                      required: false,
                    })}
                  />
                </S.Section>

                <S.Section>
                  <S.SectionTitle>Documento: *</S.SectionTitle>
                  <S.TextInput
                    required={false}
                    placeholder="Digite o número do documento"
                    {...register("txCpf", {
                      required: false,
                    })}
                  />
                </S.Section>
              </S.ToggleRow>

              <S.ToggleRow style={{ marginTop: "2rem" }}>
                <S.ContainerButtons>
                  <S.SubmitButton type="submit">Procurar</S.SubmitButton>
                </S.ContainerButtons>
              </S.ToggleRow>
            </S.Form>
          </S.ToggleContainer>
        ) : (
          ""
        )}
        {response ? (
          <S.TableWrapper>
            {response?.data ? (
              <JvrisTable
                download
                autoPrimaryColumn={false}

                columns={MockData.TableDataTitle()}
                data={
                  response
                    ? formatDataToTableExtra({
                      content: response?.data,
                      keysToInclude: ["txParte", "txTipoPessoa", "txCpfCnpj"],
                      keysToFormatAsParte: ["txTipoPessoa"],
                      keysToOnclick: [
                        {
                          key: "txCpfCnpj",
                          onClick: (dataOnIndex) => {
                            //console.log(dataOnIndex);
                          },
                        },
                      ],
                    })
                    : formatDataToTable([], [""])
                }
                GenericButton={[
                  {
                    hoverColor: theme.colors.softYellow,
                    alt: "Editar",
                    icon: <PencilSimple weight="fill" size={20} />,
                    onClick: (index) => {
                      if (index !== undefined) {
                        setIdParte(response?.data[index].id);
                        setTxParte(response?.data[index].txParte);
                        setTxTipoPessoa(response?.data[index].txTipoPessoa);
                        setTxCpfCnpj(response?.data[index].txCpfCnpj);
                        setShowModalAddEdit(!showModalAddEdit);
                      }
                    },
                  },
                  {
                    hoverColor: theme.colors.softRed,
                    alt: "Excluir",
                    icon: <X weight="bold" size={20} />,
                    onClick: (index) => {
                      if (index !== undefined) {
                        setIdParte(response?.data[index].id);
                        setShowModalRemove(!showModalRemove);
                      }
                    },
                  },
                ]}
              />
            ) : (
              <S.WarningMessage>{response?.message}</S.WarningMessage>
            )}
          </S.TableWrapper>
        ) : (
          ""
        )}

        <CustomTable
          isLoading={isLoadingPartes}
          data={partes?.data ? partes?.data : []}
          columns={[
            {
              name: "Nome da parte",
              keyData: "txParte",
              isSortable: true,
            },
            {
              name: "Pessoa",
              isSortable: true,
              keyData: "txTipoPessoa",
              component: {
                element: (data) => <PersonType data={data} />,
                isButton: false,
              },
            },
            {
              name: "Documento",
              isSortable: false,
              keyData: "txCpfCnpj",
              component: {
                element: (data) => <Document data={data} />,
                isButton: true,
              }
            },
            {
              name: "Ações",
              isSortable: false,
              keyData: "fake124",
              component: {
                element: (data) => <Actions data={data} />,
                isButton: true,
              }
            }
          ]}
          defaultSortKeyColumn={{
            key: "txParte",
            direction: "ascending"
          }}
          selectRows={true}
          csvButton={{
            nameFile: "partes"
          }}
          pdfButton={{
            nameFile: "partes"
          }}
          selectDataColumnButton={{
            columns: [
              { name: "Nome da parte", key: "txParte" }
            ]
          }}
          showPagination={true}
          showSearchField={true}
          showSelectNumberOfRows={true}
          onlyShowTableIfData={false}
        />

        {!isLoadingPartes && !response && (
          <S.TableWrapper>
            <JvrisTable
              download
              autoPrimaryColumn={false}

              columns={MockData.TableDataTitle()}
              data={formatDataToTableExtra({
                content: partes?.data,
                keysToInclude: ["txParte", "txTipoPessoa", "txCpfCnpj"],
                keysToFormatAsParte: ["txTipoPessoa"],
                keysToOnclick: [
                  {
                    key: "txCpfCnpj",
                    onClick: (dataOnIndex) => {
                      //removes just dashs and keep the dots
                      navigate(
                        `/dashboard/detalhes-processo/extrato-de-processos-por-parte/${encodeURIComponent(
                          dataOnIndex.txCpfCnpj
                        )}`
                      );
                      //console.log(dataOnIndex);
                    },
                  },
                ],
              })}
              GenericButton={[
                {
                  hoverColor: theme.colors.softYellow,
                  alt: "Editar",
                  icon: <PencilSimple weight="fill" size={20} />,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setIdParte(partes?.data[index].id);
                      setTxParte(partes?.data[index].txParte);
                      setTxTipoPessoa(partes?.data[index].txTipoPessoa);
                      setTxCpfCnpj(partes?.data[index].txCpfCnpj);
                      setShowModalAddEdit(!showModalAddEdit);
                    }
                  },
                },
                {
                  hoverColor: theme.colors.softRed,
                  alt: "Excluir",
                  icon: <X weight="bold" size={20} />,
                  onClick: (index) => {
                    if (index !== undefined) {
                      setIdParte(partes?.data[index].id);
                      setShowModalRemove(!showModalRemove);
                    }
                  },
                },
              ]}
            />
          </S.TableWrapper>
        )}
      </S.Wrapper>
    </>
  );
};

export default Partes;

import { Eye, Printer, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteExcluirCalculo,
  getAnexosRespostaDcje,
  getArquivoRespostaDcje,
  getCalculosDcjeResultados,
  getRespostaDcje,
} from "../../../../../api/services/RespostaDcje/respostaDcje";
import ConfirmToast from "../../../../../components/ConfirmToast";
import JvrisTable from "../../../../../components/JvrisTable";
import { PageTitle } from "../../../../../components/TitlePage";
import theme from "../../../../../globalStyle/theme";
import { formatDataToTable } from "../../../../../utils/formatDataToTable";
import { openPDFInNewTab } from "../../../../../utils/openPDFInNewTab.util";
import * as MockData from "./mockDataResposta";
import * as S from "./styled";

const ProceduralForwardingResponse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastData, setToastData] = useState({
    text: "",
    onConfirm: async () => {},
  });

  async function refreshTable() {
    if (response) {
      getCalculos(response.data.idFichaProcessual);
    }

    return true;
  }

  function handleToast(excluir: boolean, index: any) {
    if (re) {
      if (excluir)
        setToastData({
          text: `Deseja excluir o cálculo?`,
          onConfirm: async () => await handleExcluir(index),
        });
    }
    setShowConfirmToast(true);
  }

  const {
    mutate: mutateRespostaDcje,
    data: response,
    isLoading,
  } = useMutation(getRespostaDcje);

  function getResponse(id: number | any) {
    if (!id) throw new Error("id is required");
    mutateRespostaDcje(id);
  }

  // ______________
  // Arquivos

  async function getResponseArquivo(id: number | any) {
    if (!id) throw new Error("id is required");

    const resposta = await getArquivoRespostaDcje(id);

    return resposta;
  }

  const openArquivo = async (index: any) => {
    getResponseArquivo(re?.data[index].id).then((res) => {
      {
        res?.data ? openPDFInNewTab(res?.data.file_stream) : "ERROR";
      }
    });
  };

  async function handleExcluir(index: number) {
    await deleteExcluirCalculo(re!.data[index].id);
    await refreshTable();
  }
  // _______________
  // Anexos

  const { mutate: mutateAnexosResposta, data: res } = useMutation(
    getAnexosRespostaDcje,
    {
      onSuccess: (data) => {
        if (data?.status === "OK") {
        }
      },
    }
  );

  function getAnexos(id: number | any) {
    if (!id) throw new Error("id is required");
    mutateAnexosResposta(id);
  }

  const openAnexo = async (index: any) => {
    {
      res?.data ? openPDFInNewTab(res?.data[index].file_stream) : "ERROR";
    }
  };

  const { mutate: mutateCalculosResposta, data: re } = useMutation(
    getCalculosDcjeResultados
  );

  const getCalculos = (idFichaProcessual: number | any) => {
    mutateCalculosResposta(idFichaProcessual);
  };

  useEffect(() => {
    getResponse(id);
    getAnexos(id);
  }, []);

  useEffect(() => {
    if (response) {
      getCalculos(response.data.idFichaProcessual);
    }
  }, [response]);

  const respostaData = response?.data;
  const reData = re?.data;

  const numProcesso = respostaData?.txNumeroFormatado;
  const vaTotal = respostaData?.vaTotal
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "");
  const vaCalculado = respostaData?.vaCalculado
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "");
  const vaDivergencia = respostaData?.vaDivergencia
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace("R$", "");
  const txDivergencias = respostaData?.txDivergencias;
  const txObservacao = respostaData?.txObservacao;
  const isValorApurado = respostaData?.isValorApurado;
  // const inputColor3 = () => {
  //   const color = vaCalculado! > vaTotal! ? "green" : "red";
  //   return color;
  // };

  const somaVaExecucao = reData?.reduce(
    (acumulador, objeto) => acumulador + objeto.vaExecucao,
    0
  );

  const somaVaResultadoTotal = reData?.reduce(
    (acumulador, objeto) => acumulador + objeto.vaResultadoTotal,
    0
  );

  const inputColor = () => {
    if (somaVaResultadoTotal! > somaVaExecucao!) {
      return "blue";
    } else if (somaVaResultadoTotal! == somaVaExecucao!) {
      return "black";
    } else {
      return "red";
    }
  };

  return (
    <>
      <ConfirmToast
        setShowConfirmToast={setShowConfirmToast}
        show={showConfirmToast}
        customCancel={"Cancelar"}
        customConfirm={"Confirmar"}
        onConfirm={toastData.onConfirm}
        message={toastData.text}
        showCloseIcon={true}
      />
      <PageTitle
        pageTitle="RESPOSTA - FICHA PROCESSUAL A DCJE/PGE"
        pageIcon={<S.PageIcon />}
      />
      <S.TableWrapper>
        <S.Section>
          <S.SectionTitle>
            <S.SectionTitleName>DADOS</S.SectionTitleName>
          </S.SectionTitle>
          <S.SectionDataRow>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>
                Processo de Conhecimento/Execução: *
              </S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.TextInput disabled={true} value={numProcesso} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
          </S.SectionDataRow>

          <S.SectionDataRow>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>Valor Apurado:</S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.FieldContainer>
                  <S.SectionDataInfo>
                    <S.TextInput
                      disabled={true}
                      value={isValorApurado ? "SIM" : "NÃO"}
                    />
                  </S.SectionDataInfo>
                </S.FieldContainer>
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
          </S.SectionDataRow>

          <S.SectionDataRow>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>
                Valor Pleiteado pelo(s) Autor(es)R$: *
              </S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.TextInput disabled={true} value={vaTotal} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>
                Valor Apurado pela DCJE R$: *
              </S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.TextInput disabled={true} value={vaCalculado} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>Divergência R$: *</S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.TextInput disabled={true} value={vaDivergencia} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
          </S.SectionDataRow>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <S.SectionTitleName>
              ORIENTAÇÕES SOBRE OS CÁLCULOS REALIZADOS
            </S.SectionTitleName>
          </S.SectionTitle>
          <S.SectionDataRowTextArea>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>Divergências:</S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.ContentTextArea disabled={true} value={txDivergencias} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionDataTitle>Observações:</S.SectionDataTitle>
              <S.SectionDataInfo>
                <S.ContentTextArea disabled={true} value={txObservacao} />
              </S.SectionDataInfo>
            </S.SectionDataCapsule>
          </S.SectionDataRowTextArea>
        </S.Section>

        <S.Section>
          <S.SectionTitle>
            <S.SectionTitleName>ARQUIVOS</S.SectionTitleName>
          </S.SectionTitle>
          {re?.data ? (
            <>
              <JvrisTable
                autoPrimaryColumn={false}
                maxRows={false}
                Searchable={false}
                columns={MockData.TableDataTitle()}
                data={formatDataToTable(
                  reData,
                  [
                    "txRazaoPedido",
                    "txParte",
                    "vaExecucao",
                    "vaResultadoTotal",
                  ],
                  ["vaExecucao", "vaResultadoTotal"]
                )}
                GenericButton={[
                  {
                    hoverColor: theme.colors.jvrisAqua,
                    alt: "Excluir",
                    icon: <X weight="bold" size={20} />,
                    onClick: async (index: any) => {
                      if (index != undefined) handleToast(true, index);
                    },
                  },
                  {
                    hoverColor: theme.colors.jvrisAqua,
                    alt: "Imprimir",
                    icon: <Printer weight="bold" size={20} />,
                    onClick: (index) => {
                      if (index != undefined) {
                        openArquivo(index);
                      }
                    },
                  },
                ]}
              />
              <S.Section>
                <S.SectionDataRow>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>
                      VALOR EXECUTADO TOTAL
                    </S.SectionDataTitle>
                    <S.SectionDataInfo>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaExecucao.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfo>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>
                      VALOR CALCULADO TOTAL
                    </S.SectionDataTitle>
                    <S.SectionDataInfo>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaResultadoTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfo>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>DIVERGÊNCIA TOTAL</S.SectionDataTitle>
                    <S.SectionDataInfo>
                      <S.TextInput
                        disabled={true}
                        style={{ color: inputColor(), fontWeight: "bold" }}
                        value={(
                          somaVaResultadoTotal - somaVaExecucao
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfo>
                  </S.SectionDataCapsule>
                </S.SectionDataRow>
              </S.Section>
            </>
          ) : (
            <S.WarningMessage style={{ margin: "auto" }}>
              Nenhum registro encontrado
            </S.WarningMessage>
          )}
        </S.Section>

        {res?.data ? (
          <S.Section>
            <S.SectionTitle>
              <S.SectionTitleName>DESCRIÇÃO</S.SectionTitleName>
            </S.SectionTitle>
            <JvrisTable
              autoPrimaryColumn={false}
              columns={MockData.TableDataTitleDesc()}
              data={formatDataToTable(res?.data, ["name"])}
              GenericButton={[
                {
                  hoverColor: theme.colors.jvrisAqua,
                  alt: "Ver Anexo",
                  icon: <Eye weight="bold" size={20} />,
                  onClick: (index) => {
                    if (index != undefined) {
                      openAnexo(index);
                    }
                  },
                },
              ]}
            />
          </S.Section>
        ) : (
          ""
        )}
      </S.TableWrapper>
    </>
  );
};

export default ProceduralForwardingResponse;

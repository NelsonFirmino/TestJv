import { CaretLeft, Eye, Printer, X } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import {
  deleteExcluirAnexo,
  deleteExcluirCalculo,
  getAnexosRespostaDcje,
  getArquivoRespostaDcje,
} from "../../../../../api/services/RespostaDcje/respostaDcje";
import { postRespostasDCJE } from "../../../../../api/services/respostasDCJE/respostasDCJE";
import ConfirmToast from "../../../../../components/ConfirmToast";
import JvrisTable from "../../../../../components/JvrisTable";
import { PageTitle } from "../../../../../components/TitlePage";
import { SharedState } from "../../../../../context/SharedContext";
import theme from "../../../../../globalStyle/theme";
import { formatDataToTable } from "../../../../../utils/formatDataToTable";
import { getBase64 } from "../../../../../utils/getBase64.util";
import { openPDFInNewTab } from "../../../../../utils/openPDFInNewTab.util";
import { HomePageIcon, RedirectPage } from "../Calculos/styled";
import { useCalculosContext } from "../context/CalculosContext";
import { CALC } from "../interfaces/calculation.interfaces";
import { SubmitProcForwarding } from "./interfaces/proceduralforwarding.interface";
import * as MockData from "./mockDataResposta";
import * as S from "./styled";

const RespostaContador = (props: CALC) => {
  const {
    respostaCalculo,
    respostaFichaDCJE,
    respostaDcjeCalculado,
    respostaCalculosDcjeById,
    isRespostaInicial,
    updateData,
    setUpdateData,
    respostaRespostaDcje, //endpoint de resposta com idResposta
    isLoadingRespostaRespostaDcje,
    idCalculoContext,
    setIsRespostaInicial,
  } = useCalculosContext();

  const { user } = SharedState();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    control,
  } = useForm<SubmitProcForwarding>({
    mode: "onChange",
  });
  const idResposta = respostaFichaDCJE?.data?.idResposta;

  const [valorTotal, setValorTotal] = useState<number>(null);
  const [valorCalculado, setValorCalculado] = useState<number>(null);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastData, setToastData] = useState({
    text: "",
    onConfirm: async () => {},
  });

  async function refreshTable() {
    if (respostaRespostaDcje) {
      setUpdateData(!updateData);

      // getCalculos(respostaFichaDCJE.data.id);
    }
    if (res) {
      getAnexos(idResposta);
    }

    return true;
  }

  function handleToast(excluir: boolean, index: any) {
    if (respostaCalculo) {
      if (excluir)
        setToastData({
          text: `Deseja excluir o cálculo?`,
          onConfirm: async () => await handleExcluir(index),
        });
    }
    setShowConfirmToast(true);
  }

  function handleToastAnexo(excluir: boolean, index: any) {
    if (respostaCalculo) {
      if (excluir)
        setToastData({
          text: `Deseja excluir o anexo?`,
          onConfirm: async () => await handleExcluirAnexo(index),
        });
    }
    setShowConfirmToast(true);
  }

  // ______________
  // Arquivos

  async function getResponseArquivo(id: number | any) {
    if (!id) throw new Error("id is required");

    const resposta = await getArquivoRespostaDcje(id);

    return resposta;
  }

  const openArquivo = async (index: any) => {
    getResponseArquivo(respostaCalculo?.data[index].id).then((res) => {
      {
        res?.data ? openPDFInNewTab(res?.data.file_stream) : "ERROR";
      }
    });
  };

  async function handleExcluir(index: number) {
    await deleteExcluirCalculo(respostaCalculo!.data[index].id);
    await refreshTable();
  }

  async function handleExcluirAnexo(index: number) {
    await deleteExcluirAnexo(res!.data[index].id);
    await refreshTable();
  }
  // _______________
  // Anexos

  const {
    mutate: mutateAnexosResposta,
    data: res,
    isLoading: isLoadingAnexos,
  } = useMutation(getAnexosRespostaDcje, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
      }
    },
  });

  function getAnexos(id: number | any) {
    if (!id) throw new Error("id is required");
    mutateAnexosResposta(id);
  }

  const openAnexo = async (index: any) => {
    {
      res?.data ? openPDFInNewTab(res?.data[index].file_stream) : "ERROR";
    }
  };

  useEffect(() => {
    if (idResposta > 0) {
      getAnexos(idResposta);
    }
  }, []);

  // ---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (respostaFichaDCJE?.data.idResposta != 0) {
      // com idResposta
      setValorTotal(
        respostaFichaDCJE?.data?.vaTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "")
      );
      setValorCalculado(respostaRespostaDcje?.data.vaCalculado * 100);
    } else {
      setValorTotal(
        respostaFichaDCJE?.data?.vaTotal
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          .replace("R$", "")
      );
      setValorCalculado(respostaDcjeCalculado?.data.vaCalculado * 100);
    }
  }, [respostaFichaDCJE?.data.idResposta]);

  // ------------------------------

  const numProcesso = respostaFichaDCJE?.data.txNumeroFormatado;

  const [valorDivergencia, setValorDivergencia] = useState(null);
  const [valorApurado, setValorApurado] = useState(false);

  useEffect(() => {
    if (respostaDcjeCalculado?.data) {
      setValorDivergencia(
        respostaFichaDCJE?.data?.vaTotal - valorCalculado / 100
      );
    }
  }, [respostaFichaDCJE?.data.idResposta, valorCalculado]);

  useEffect(() => {
    if (respostaRespostaDcje) {
      if (respostaRespostaDcje?.data.vaCalculado > 0) {
        setValorApurado(true);
      } else {
        setValorApurado(false);
      }
    } else if (respostaDcjeCalculado) {
      if (respostaDcjeCalculado?.data.vaCalculado > 0) {
        setValorApurado(true);
      } else {
        setValorApurado(false);
      }
    }
  }, [respostaRespostaDcje, respostaDcjeCalculado]);

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleValorCalculado = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorCalculado(valorNumerico);
    setValue("vaCalculado", Number(valorNumerico) / 100);
    setValorDivergencia(
      respostaFichaDCJE?.data?.vaTotal - Number(valorNumerico) / 100
    );
  };

  const somaVaExecucao = respostaCalculo?.data.reduce(
    (acumulador, objeto) => acumulador + objeto.vaExecucao,
    0
  );

  const somaVaResultadoTotal = respostaCalculo?.data.reduce(
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

  useEffect(() => {
    if (respostaDcjeCalculado?.data) {
      setValue("txObservacao", respostaDcjeCalculado?.data.txObservacao);
      setValue("txDivergencias", respostaDcjeCalculado?.data.txDivergencias);
    } else {
      setValue("txObservacao", "");
      setValue("txDivergencias", "");
    }
  }, [!isLoadingRespostaRespostaDcje]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList) => void
  ) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size <= 15 * 1024 * 1024
    ) {
      onChange(e.target.files);
      setValue("lsArquivos", e.target.files);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setValue("lsArquivos", null);
      return;
    } else {
      setValue("lsArquivos", null);
      return;
    }
  };

  const handleToast2 = (msg: string, error: boolean = false) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    refreshTable();
  };

  const onSubmit: SubmitHandler<SubmitProcForwarding> = async (params) => {
    let files = {};
    if (params.lsArquivos) {
      for (let file of params.lsArquivos) {
        files[file.name] = await getBase64(file);
      }
    }

    postRespostasDCJE({
      id: Number(idResposta),
      idDistribuicao: respostaFichaDCJE?.data?.idDistribuicao,
      txObservacao: params.txObservacao,
      txDivergencias: params.txDivergencias,
      vaCalculado: Number(valorCalculado) / 100,
      vaDivergencia: valorDivergencia,
      isValorApurado: valorApurado,
      idUsuarioCadastro: Number(user["Jvris.User.Id"]),
      lsArquivos: files,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast2("Resposta salva com sucesso!");
        } else {
          handleToast2(response.message, true);
        }
      })
      .catch((err) => {
        handleToast2("Erro ao salvar resposta!");
      });
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
        button={
          <RedirectPage
            onClick={() => (
              props.setPageName("LISTACALCrespostaFichaDCJE"),
              setUpdateData(!updateData)
            )}
          >
            <HomePageIcon alt="Início do cálculo" />
          </RedirectPage>
        }
      />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerButtons>
          <S.VoltarButton
            onClick={() => {
              if (!isRespostaInicial) {
                props.setPageName("RESULTADOCALC");
              } else {
                props.setPageName("LISTACALCrespostaFichaDCJE");
              }
            }}
          >
            <CaretLeft
              size={16}
              color="white"
              style={{ marginLeft: "-1rem" }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                color: "white",
              }}
            >
              Voltar
            </span>
          </S.VoltarButton>
          {!isRespostaInicial && (
            <>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("DADOSCALC");
                }}
              >
                Dados
              </S.AbaButton>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("BASECALC");
                }}
              >
                Financeiro
              </S.AbaButton>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("PLANILHACALC");
                }}
              >
                Ver Cálculo
              </S.AbaButton>

              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("RESULTADOCALC");
                }}
              >
                Ver Resultado
              </S.AbaButton>

              <S.AbaButton
                isCurrent={true}
                onClick={() => {
                  setIsRespostaInicial(false);
                  props.setPageName("RESPOSTACALC");
                }}
              >
                Resposta
              </S.AbaButton>
            </>
          )}
        </S.ContainerButtons>
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
                      <S.RadioButtonContainer>
                        <S.RadioButtonLabel value={valorApurado}>
                          {valorApurado ? "SIM" : "NÃO"}
                        </S.RadioButtonLabel>
                        <S.ToggleButton
                          {...register("isValorApurado")}
                          checked={valorApurado}
                          onChange={() => setValorApurado(!valorApurado)}
                        />
                      </S.RadioButtonContainer>
                    </S.SectionDataInfo>
                  </S.FieldContainer>
                </S.SectionDataInfo>
              </S.SectionDataCapsule>
            </S.SectionDataRow>

            <S.SectionDataRow style={{ width: "70%" }}>
              <S.SectionDataCapsule>
                <S.SectionDataTitle>
                  Valor Pleiteado pelo(s) Autor(es) R$: *
                </S.SectionDataTitle>
                <S.SectionDataInfo>
                  <S.TextInput disabled={true} value={valorTotal} />
                </S.SectionDataInfo>
              </S.SectionDataCapsule>

              {!isLoadingRespostaRespostaDcje && (
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>
                    Valor Apurado pela DCJE R$: *
                  </S.SectionDataTitle>
                  <S.SectionDataInfo>
                    <S.TextInput
                      type="text"
                      disabled={false}
                      value={formatarNumero(valorCalculado)}
                      {...register("vaCalculado")}
                      onChange={handleValorCalculado}
                    />
                  </S.SectionDataInfo>
                </S.SectionDataCapsule>
              )}
              <S.SectionDataCapsule>
                <S.SectionDataTitle>Divergência R$: *</S.SectionDataTitle>
                <S.SectionDataInfo>
                  <S.TextInput
                    disabled={true}
                    value={
                      valorDivergencia != null
                        ? valorDivergencia
                            .toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                            .replace("R$", "")
                        : ""
                    }
                  />
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
            <S.SectionDataRowTextArea style={{ width: "70%" }}>
              <S.SectionDataCapsule>
                <S.SectionDataTitle>Divergências:</S.SectionDataTitle>
                <S.SectionDataInfo>
                  <S.ContentTextArea
                    {...register("txDivergencias")}
                    disabled={false}
                  />
                </S.SectionDataInfo>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionDataTitle>Observações:</S.SectionDataTitle>
                <S.SectionDataInfo>
                  <S.ContentTextArea
                    {...register("txObservacao")}
                    disabled={false}
                  />
                </S.SectionDataInfo>
              </S.SectionDataCapsule>
            </S.SectionDataRowTextArea>
          </S.Section>

          <S.Section>
            <S.SectionTitle>
              <S.SectionTitleName>ARQUIVOS</S.SectionTitleName>
            </S.SectionTitle>
            {respostaCalculo?.data ? (
              <>
                <JvrisTable
                  autoPrimaryColumn={false}
                  maxRows={false}
                  Searchable={false}
                  columnFilter={false}
                  columns={MockData.TableDataTitle()}
                  data={formatDataToTable(
                    respostaCalculo.data,
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
          {!res?.data ? (
            <S.Section>
              <S.SectionDataRowTextArea>
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>Anexos:</S.SectionDataTitle>
                  <S.SectionDataInfo>
                    <Controller
                      name="lsArquivos"
                      control={control}
                      defaultValue={null}
                      rules={{ required: false }}
                      render={({ field: { onChange, value, ...field } }) => (
                        <S.FileInput
                          multiple
                          required={false}
                          {...field}
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                      )}
                    />
                  </S.SectionDataInfo>
                </S.SectionDataCapsule>
              </S.SectionDataRowTextArea>
            </S.Section>
          ) : (
            ""
          )}

          {!isLoadingAnexos && res?.data ? (
            <S.Section>
              <S.SectionTitle>
                <S.SectionTitleName>DESCRIÇÃO</S.SectionTitleName>
              </S.SectionTitle>
              <JvrisTable
                autoPrimaryColumn={false}
                Searchable={false}
                maxRows={false}
                columnFilter={false}
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
                  {
                    hoverColor: theme.colors.jvrisAqua,
                    alt: "Excluir",
                    icon: <X weight="bold" size={20} />,
                    onClick: async (index: any) => {
                      if (index != undefined) handleToastAnexo(true, index);
                    },
                  },
                ]}
              />
            </S.Section>
          ) : (
            ""
          )}
          {respostaRespostaDcje?.data &&
          respostaRespostaDcje?.data?.isEncerrado == true ? (
            <div></div>
          ) : (
            <S.Section style={{ marginBottom: "3rem" }}>
              <S.SubmitButton type="submit">Salvar Resposta</S.SubmitButton>
            </S.Section>
          )}
        </S.TableWrapper>
      </S.Form>
    </>
  );
};

export default RespostaContador;

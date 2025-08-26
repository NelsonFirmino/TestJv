import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getCalculosResultadoDoCalculoRelatorio,
  putCalculoResultado,
} from "../../../../../api/services/RespostaDcje/respostaDcje";
import { PageTitle } from "../../../../../components/TitlePage";
import { SharedState } from "../../../../../context/SharedContext";
import { useAccountants } from "../../../../../hooks/useAccountants";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { openPDFInNewTab } from "../../../../../utils/openPDFInNewTab.util";
import { HomePageIcon, RedirectPage } from "../Calculos/styled";
import { useCalculosContext } from "../context/CalculosContext";
import { CALC, SubmitCalculo } from "../interfaces/calculation.interfaces";
import * as S from "./styled";

const ResultadoDoCalculo = (props: CALC) => {
  const {
    tipoCalculoContext,
    respostaCalculo,
    respostaFichaDCJE,
    isLoadingFichaDCJE,
    respostaPlanilhaDeCalculo,
    isLoadingPlanilhaDeCalculo,
    respostaResultadoDoCalculo,
    isLoadingResultadoDoCalculo,
    idCalculoContext,
    setIsRespostaInicial,
    updateData,
    setUpdateData,
    setTipoCalculoContext,
    setCadastrarCalculo,
  } = useCalculosContext();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitCalculo>({
    mode: "onChange",
  });

  const { accountantsList, loadingAccountantsList } = useAccountants();

  const navigate = useNavigate();

  const { user, selectedUser } = SharedState();

  const [somaVaCorrecaoMonetaria, setSomaVaCorrecaoMonetaria] = useState(null);
  const [somaVaBase, setSomaVaBase] = useState(null);
  const [somaVaJurosMora, setSomaVaJurosMora] = useState(null);
  const [somaVaAtualizado, setSomaVaAtualizado] = useState(null);
  const [accountant, setAccountant] = useState({
    label: "",
    value: 0,
  });
  const [valorHonSucumb, setValorHonSucumb] = useState(null);
  const [divergencias, setDivergencias] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function getResponseArquivo(id: number | any) {
    if (!id) throw new Error("id is required");

    const resposta = await getCalculosResultadoDoCalculoRelatorio(id);

    return resposta;
  }

  const openArquivo = async (index: any) => {
    getResponseArquivo(index).then((res) => {
      {
        respostaCalculo?.data
          ? openPDFInNewTab(res?.data.file_stream)
          : "ERROR";
      }
    });
  };

  useEffect(() => {
    if (accountantsList) {
      if (respostaResultadoDoCalculo?.data) {
        setAccountant(
          accountantsList?.find(
            (data) =>
              data.value ==
              respostaResultadoDoCalculo?.data?.idContadorResponsavel
          )
        );
      } else {
        setAccountant(null);
      }
    }
  }, [!loadingAccountantsList && respostaResultadoDoCalculo?.data]);

  useEffect(() => {
    if (respostaPlanilhaDeCalculo?.data) {
      setSomaVaBase(
        respostaPlanilhaDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaBaseMes,
          0
        )
      );

      setSomaVaCorrecaoMonetaria(
        respostaPlanilhaDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaCorrecaoMonetaria,
          0
        )
      );

      setSomaVaJurosMora(
        respostaPlanilhaDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaJurosMora,
          0
        )
      );

      setSomaVaAtualizado(
        respostaPlanilhaDeCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaAtualizado,
          0
        )
      );
    }
  }, [respostaPlanilhaDeCalculo]);

  useEffect(() => {
    if (respostaResultadoDoCalculo?.data) {
      setDivergencias(respostaResultadoDoCalculo?.data?.txDivergencias);
      setObservacoes(respostaResultadoDoCalculo?.data?.txObservacao);
    }
  }, [respostaResultadoDoCalculo?.data]);

  const onSubmit: SubmitHandler<SubmitCalculo> = (data) => {};

  const inputColor = () => {
    const subtraction =
      respostaResultadoDoCalculo?.data?.vaResultadoTotal -
      respostaResultadoDoCalculo?.data?.vaExecucao;

    if (subtraction! > 0) {
      return "blue";
    } else if (subtraction! == 0) {
      return "black";
    } else {
      return "red";
    }
  };

  const BaseIncidencia = () => {
    if (respostaFichaDCJE?.data.txBaseIncidencia == "") {
      return "Nenhum";
    } else if (respostaFichaDCJE?.data.txBaseIncidencia == "CON") {
      return "SOBRE CONDENAÇÃO";
    } else if (respostaFichaDCJE?.data.txBaseIncidencia == "VCU") {
      return "SOBRE VALOR DA CAUSA";
    } else if (respostaFichaDCJE?.data.txBaseIncidencia == "VFI") {
      return "SOBRE VALOR FIXADO";
    } else {
      return "----";
    }
  };

  useEffect(() => {
    if (respostaResultadoDoCalculo?.data) {
      setValorHonSucumb(respostaResultadoDoCalculo?.data?.vaHonorario * 100);
    }
  }, [respostaResultadoDoCalculo]);

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };
  const handleContadorResp = (data: any) => {
    setAccountant(data);
  };

  const handleValorHonSucumb = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorHonSucumb(valorNumerico);
  };

  const handleToast = (msg: string, error: boolean) => {
    !error
      ? toast(msg, {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    setUpdateData(!updateData);
  };

  const handleDivergencias = (e: any) => {
    setDivergencias(e.target.value);
  };

  const handleObs = (e: any) => {
    setObservacoes(e.target.value);
  };

  const putCalcResultado = (id?: number) => {
    putCalculoResultado({
      id: respostaResultadoDoCalculo?.data?.id,
      idCalculo: respostaResultadoDoCalculo?.data?.idCalculo,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      vaCalculado: respostaResultadoDoCalculo?.data?.vaCalculado,
      vaIndiceCorrecaoHonorario:
        respostaResultadoDoCalculo?.data?.vaIndiceCorrecaoHonorario,
      vaHonorario: valorHonSucumb / 100,
      vaResultadoTotal: respostaResultadoDoCalculo?.data?.vaResultadoTotal,
      txObservacao: observacoes,
      txDivergencias: divergencias,
      idContadorResponsavel: accountant?.value,
      vaExecucao: respostaResultadoDoCalculo?.data?.vaExecucao,
      vaBaseMes: respostaResultadoDoCalculo?.data?.vaBaseMes,
      vaBaseTotal: respostaResultadoDoCalculo?.data?.vaBaseTotal,
      vaCorrecaoMonetaria:
        respostaResultadoDoCalculo?.data?.vaCorrecaoMonetaria,
      vaJurosMora: respostaResultadoDoCalculo?.data?.vaJurosMora,
      isEncerrado: respostaResultadoDoCalculo?.data?.isEncerrado,
      idResposta: respostaResultadoDoCalculo?.data?.idResposta,
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Resultado atualizado com sucesso", false);
          props.setPageName("RESULTADOCALC");
        } else {
          handleToast("Erro ao atualizar resultado", true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao cadastrar resultado", true);
      });
  };

  //TODO: adicionar formatação de dinheiro na tabela

  return (
    <>
      <PageTitle
        pageTitle="RESULTADO DO CÁLCULO - DCJE"
        pageIcon={<S.PageIcon />}
        button={
          <RedirectPage
            onClick={() => (
              props.setPageName("LISTACALCrespostaFichaDCJE"),
              setUpdateData(!updateData),
              setCadastrarCalculo(false),
              setTipoCalculoContext(null)
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
              props.setPageName("PLANILHACALC");
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
          {idCalculoContext != null && (
            <>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("PLANILHACALC");
                }}
              >
                Ver Cálculo
              </S.AbaButton>

              <S.AbaButton
                isCurrent={true}
                onClick={() => {
                  props.setPageName("RESULTADOCALC");
                }}
              >
                Ver Resultado
              </S.AbaButton>

              <S.AbaButton
                isCurrent={false}
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
        {respostaFichaDCJE?.data && respostaCalculo?.data ? (
          <S.Wrapper>
            <S.Section
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Solicitação:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.id}
                  </S.SectionDataInfo>
                  <MagnifyingGlass
                    size={16}
                    alt="Ficha Processual"
                    style={{
                      cursor: "pointer",
                      marginTop: "0.2rem",
                      marginLeft: "1rem",
                    }}
                    onClick={
                      () =>
                        navigate(
                          `/dashboard/dcje/ficha-processual/${respostaFichaDCJE?.data.idAto}`
                        )
                      // navigate("")
                    }
                  />
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Processo:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.txNumeroFormatado}
                  </S.SectionDataInfo>
                  <MagnifyingGlass
                    size={16}
                    alt="Espelho do Processo"
                    style={{
                      cursor: "pointer",
                      marginTop: "0.2rem",
                      marginLeft: "1rem",
                    }}
                    onClick={() =>
                      navigate(
                        `/dashboard/detalhes-processo/espelho-processos/${respostaFichaDCJE?.data.idProcesso}`
                      )
                    }
                  />
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Data Citação:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {formatToBrazilianDate(respostaFichaDCJE.data.dtCitacao)}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Correção/Juros:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE.data.txIndiceCorrecao} /{" "}
                    {respostaFichaDCJE.data.txIndiceJuros}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>
            </S.Section>

            <S.Section
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Honorários de Sucumbência (%):</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE?.data.nuHonorariosPercentual
                      ? (respostaFichaDCJE?.data.nuHonorariosPercentual * 100)
                          .toFixed(2)
                          .replace(".", ",")
                      : "----"}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>
                  Honorários de Sucumbência Fixados:
                </S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>
                    {respostaFichaDCJE?.data.vaHonorariosFixos
                      ? (respostaFichaDCJE?.data.vaHonorariosFixos * 100)
                          .toFixed(2)
                          .replace(".", ",")
                      : respostaFichaDCJE?.data.vaHonorariosFixos == 0
                      ? "0,00"
                      : "----"}
                  </S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Base de Incidência:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>{BaseIncidencia()}</S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>

              <S.SectionDataPartiesCapsule>
                <S.SectionTitle>Data de Fixação:</S.SectionTitle>
                <S.SectionDataContainer>
                  <S.SectionDataInfo>{"----"}</S.SectionDataInfo>
                </S.SectionDataContainer>
              </S.SectionDataPartiesCapsule>
            </S.Section>

            <S.Section
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionDataCapsule>
                <S.SectionTitle>Valor Calculado:</S.SectionTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    disabled={true}
                    style={{ fontWeight: "bold" }}
                    value={respostaResultadoDoCalculo?.data?.vaCalculado.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionTitle>
                  Valor do Honorários de Sucumbência:
                </S.SectionTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    // disabled={true}
                    style={{ fontWeight: "bold" }}
                    value={formatarNumero(valorHonSucumb)}
                    onChange={(data) => handleValorHonSucumb(data)}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              {!isLoadingResultadoDoCalculo && (
                <S.SectionDataCapsule>
                  <S.SectionTitle>Contador responsável:</S.SectionTitle>
                  <S.SectionDataInfoSum>
                    <S.CustomSelect
                      isLoading={loadingAccountantsList}
                      placeholder="Selecione o(a) contador(a)"
                      options={accountantsList}
                      value={accountant}
                      onChange={(data) => handleContadorResp(data)}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
              )}
            </S.Section>

            <S.Section
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionDataCapsule>
                <S.SectionTitle>Valor Atualizado:</S.SectionTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    disabled={true}
                    style={{ fontWeight: "bold" }}
                    value={respostaResultadoDoCalculo?.data?.vaResultadoTotal.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionTitle>
                  Valor Total Pleiteado/Executado:
                </S.SectionTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    disabled={true}
                    style={{ fontWeight: "bold" }}
                    value={respostaResultadoDoCalculo?.data?.vaExecucao.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionTitle>Valor Calculado a Maior:</S.SectionTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    disabled={true}
                    style={{ color: inputColor(), fontWeight: "bold" }}
                    value={(
                      respostaResultadoDoCalculo?.data?.vaResultadoTotal -
                      respostaResultadoDoCalculo?.data?.vaExecucao
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
            </S.Section>

            <S.Section
              style={{
                marginTop: "-2rem",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionTitle>Divergências:</S.SectionTitle>
              <S.TextAreaInput
                minLength={2}
                maxLength={1000}
                placeholder="Digite aqui... (máximo 1000 caracteres)"
                // defaultValue={respostaResultadoDoCalculo?.data?.txDivergencias}
                value={divergencias}
                onChange={(data) => handleDivergencias(data)}
              />
            </S.Section>
            <S.Section
              style={{
                marginTop: "-2rem",
                flexWrap: "wrap",
                width: "90%",
              }}
            >
              <S.SectionTitle>Observações:</S.SectionTitle>
              <S.TextAreaInput
                minLength={2}
                maxLength={1000}
                placeholder="Digite aqui... (máximo 1000 caracteres)"
                value={observacoes}
                onChange={(data) => handleObs(data)}
              />
            </S.Section>
          </S.Wrapper>
        ) : (
          ""
        )}
        {respostaResultadoDoCalculo?.data?.idResposta == 0 && (
          <S.ContainerButtons>
            <S.SalvarButton
              onClick={() => {
                putCalcResultado();
              }}
            >
              Salvar
            </S.SalvarButton>
          </S.ContainerButtons>
        )}
      </S.Form>
    </>
  );
};

export default ResultadoDoCalculo;

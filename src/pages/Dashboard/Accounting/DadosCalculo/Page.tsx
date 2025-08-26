import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getErgonServidor,
  getImportarSip,
  postCalculo,
  putCalculo,
} from "../../../../api/services/RespostaDcje/respostaDcje";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { formatToBrazilianDate } from "../../../../utils/formatToBrazilianDate.util";
import { tipoCalculoOptions } from "../Calculation/Calculos/mockdata";
import { HomePageIcon, RedirectPage } from "../Calculation/Calculos/styled";
import { useCalculosContext } from "../Calculation/context/CalculosContext";
import {
  CALC,
  SubmitCalculo,
} from "../Calculation/interfaces/calculation.interfaces";
import { ExcluirDadosCalculo } from "./ExcluirDadosCalculo";
import { AdicionarExequente } from "./modals/AdicionarExequente";
import * as S from "./styled";

const Page = (props: CALC) => {
  const {
    tipoCalculoContext,
    cadastrarCalculo,
    setTipoCalculoContext,
    setCadastrarCalculo,
    respostaCalculo,
    respostaFichaDCJE,
    respostaCalculosDcjeById,
    setRespostaCalculosDcjeById,
    exequente,
    assuntos,
    setIsRespostaInicial,
    idCalculoContext,
    respostaBaseDeCalculo,
    updateData,
    setUpdateData,
    setIdCalculoContext,
    nuMatriculaUrv,
    setNuMatriculaUrv,
    nuDigitoUrv,
    setNuDigitoUrv,
    setNuMatriculaUrvFunc,
    setIsErgonFunc,
    isErgon,
    respostaPlanilhaDeCalculo,
    respostaResultadoDoCalculo,
  } = useCalculosContext();

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

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

  const navigate = useNavigate();

  const [isOpenExcluirModal, setOpenExcluirModal] = useState(false);

  const [tipoCalculoDados, setTipoCalculoDados] = useState({
    label: "",
    value: "",
  });
  const [assuntosDados, setAssuntosDados] = useState({
    label: "",
    value: "",
  });
  const [exequentesDados, setExequentesDados] = useState({
    label: "",
    value: "",
  });
  const [currentPageColor, setCurrentPageColor] = useState("");
  const [isOpenModal, setOpenModal] = useState(false);
  const [dtCorrecaoMonetariaDados, setDtCorrecaoMonetariaDados] = useState("");
  const [dtJurosMoraDados, setDtJurosMoraDados] = useState("");
  const [dtPrescricaoDados, setDtPrescricaoDados] = useState("");
  const [valorCalculado, setValorCalculado] = useState(null);
  const [vaUrvMarco94, setVaUrvMarco94] = useState(913.5 * 100);
  const [qtdMeses, setQtdMeses] = useState<number>(null);
  const [qtdDias, setQtdDias] = useState<number>(null);
  const [nuMatricula, setNuMatricula] = useState<string>("");
  // const [nuMatriculaUrv, setNuMatriculaUrv] = useState<string>("");
  // const [nuDigitoUrv, setNuDigitoUrv] = useState<string>("");
  const [nuVinculo, setNuVinculo] = useState({
    label: "",
    value: null,
  });
  const [isFerias, setIsFerias] = useState<boolean>(false);
  const [isDecimoTerceiro, setIsDecimoTerceiro] = useState<boolean>(false);
  const [dtFimUrv, setDtFimUrv] = useState("");

  const {
    mutate: mutateErgonServidor,
    data: responseErgonServidor,
    isLoading: isLoadingErgonServidor,
  } = useMutation(getErgonServidor);

  const {
    mutate: mutateImportarSip,
    data: responseImportarSip,
    isLoading: isLoadingImportarSip,
  } = useMutation(getImportarSip);

  //useEffect para matrícula e vínculo
  useEffect(() => {
    if (exequentesDados?.value) {
      mutateErgonServidor(+exequentesDados?.value);
    }
  }, [exequentesDados?.value]);

  // Lista do select de Vinculo
  interface VinculosOptions {
    value: number;
    label: string;
  }
  const [vinculos, setVinculos] = useState<VinculosOptions[]>([]);

  useEffect(() => {
    if (responseErgonServidor?.data) {
      setNuMatricula(responseErgonServidor?.data[0]?.nuMatricula.toString());
      const formattedOptions = responseErgonServidor.data.map((item) => ({
        value: item.nuVinculo,
        label: `${item.nuVinculo}`,
      }));
      setVinculos(formattedOptions);
      setIsErgonFunc(true);
    } else {
      setVinculos(null);
      // setNuVinculo(null);
      setNuMatricula("");
      setIsErgonFunc(false);
    }
  }, [responseErgonServidor, exequentesDados]);

  const handleQtdMeses = (event) => {
    const meses = event.target.value.replace(/\D/g, "");
    if (meses == "") {
      setQtdMeses(null);
    } else {
      setQtdMeses(meses);
    }
  };

  const handleQtdDias = (event) => {
    const dias = event.target.value.replace(/\D/g, "");
    if (dias == "") {
      setQtdDias(null);
    } else {
      setQtdDias(dias);
    }
  };

  const handleDataCorrecaoMonetaria = (event) => {
    const data = event.target.value;
    setDtCorrecaoMonetariaDados(data);
  };

  const handleDataJurosMora = (event) => {
    const data = event.target.value;
    setDtJurosMoraDados(data);
  };
  dtJurosMoraDados;

  const handleDataPrescrição = (event) => {
    const data = event.target.value;
    setDtPrescricaoDados(data);
  };

  const handleDataFimUrv = (event) => {
    const data = event.target.value;
    setDtFimUrv(data);
  };

  useEffect(() => {
    if (tipoCalculoContext && cadastrarCalculo == true) {
      setTipoCalculoDados(tipoCalculoContext);
    } else if (respostaCalculosDcjeById?.data) {
      setTipoCalculoDados(
        tipoCalculoOptions?.find(
          (data) => data.value == respostaCalculosDcjeById?.data.txTipoCalculo
        )
      );
    }

    if (respostaCalculosDcjeById?.data) {
      if (respostaCalculosDcjeById?.data?.nuVinculo == 0) {
        setNuVinculo(null);
      } else {
        setNuVinculo({
          value: respostaCalculosDcjeById?.data?.nuVinculo,
          label: respostaCalculosDcjeById?.data?.nuVinculo,
        });
      }
    } else {
      setNuVinculo(null);
      setNuMatricula(null);
      // setExequentesDados(null);
    }

    if (assuntos) {
      setAssuntosDados(
        assuntos?.find(
          (data) =>
            data.value ==
            (respostaCalculosDcjeById?.data == undefined
              ? respostaFichaDCJE?.data?.idRazaoPedido
              : respostaCalculosDcjeById?.data?.idRazaoPedido)
        )
      );
    }

    if (exequente) {
      setExequentesDados(
        exequente?.find(
          (data) => data.label == respostaCalculosDcjeById?.data?.txParte
        )
      );
    }

    if (!respostaCalculosDcjeById?.data) {
      setExequentesDados(null);
    }

    if (respostaCalculosDcjeById) {
    }

    if (cadastrarCalculo) {
      let dtAjuizamento = new Date(respostaFichaDCJE?.data?.dtAjuizamento);
      // regra para data de prescrição quando estiver cadastrando
      dtAjuizamento.setFullYear(dtAjuizamento.getFullYear() - 5);
      let dataFormatada = dtAjuizamento.toISOString().split("T")[0];

      setValorCalculado(respostaFichaDCJE?.data.vaTotal * 100);
      setDtCorrecaoMonetariaDados(respostaFichaDCJE?.data?.dtAtualizacaoValor);
      setDtJurosMoraDados(respostaFichaDCJE?.data?.dtAtualizacaoValor);
      setDtPrescricaoDados(dataFormatada);
      setQtdMeses(null);
      setQtdDias(null);
    } else {
      setValorCalculado(respostaCalculosDcjeById?.data?.vaExecucao * 100);
      setDtCorrecaoMonetariaDados(
        respostaCalculosDcjeById?.data?.dtCorrecaoMonetaria
      );
      setDtJurosMoraDados(respostaCalculosDcjeById?.data?.dtJurosMora);
      setDtPrescricaoDados(respostaCalculosDcjeById?.data?.dtPrescricao);
      setQtdMeses(respostaCalculosDcjeById?.data?.nuQtdMeses);
      setQtdDias(respostaCalculosDcjeById?.data?.nuQtdDias);
    }
  }, [
    respostaCalculosDcjeById,
    assuntos,
    exequente,
    cadastrarCalculo,
    tipoCalculoContext,
  ]);

  const handleExequente = (data: any) => {
    setExequentesDados(data);
    setNuVinculo(null);
  };

  const handleAssunto = (data: any) => {
    setAssuntosDados(data);
  };

  const handleVinculo = (data: any) => {
    setNuVinculo(data);
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleValorCalculado = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValorCalculado(valorNumerico);
  };

  const handleVaUrvMarco94 = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setVaUrvMarco94(valorNumerico);
  };

  const handleNuMatricula = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setNuMatricula(value);
  };

  const handleNuMatriculaUrv = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    // setNuMatriculaUrv(value);
    setNuMatriculaUrvFunc(value);
  };

  const handleNuDigitoUrv = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    setNuDigitoUrv(value);
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

  const onSubmit: SubmitHandler<SubmitCalculo> = (params) => {
    if (!respostaCalculosDcjeById?.data) {
      postCalculo({
        id: null,
        idFichaProcessual: respostaFichaDCJE?.data.id,
        idParte: +exequentesDados?.value,
        idRazaoPedido: +assuntosDados?.value,
        idResposta: respostaFichaDCJE?.data.idResposta,
        idUsuarioCadastro: +user["Jvris.User.Id"],
        txTipoCalculo: tipoCalculoDados?.value,
        vaExecucao: valorCalculado / 100,
        nuQtdMeses: tipoCalculoDados?.value == "IND" ? qtdMeses : 1,
        nuQtdDias: qtdDias,
        dtCorrecaoMonetaria: dtCorrecaoMonetariaDados.toString(),
        dtJurosMora: dtJurosMoraDados.toString(),
        dtPrescricao: dtPrescricaoDados.toString(),
        nuMatricula:
          tipoCalculoDados?.value == "URV" ? +nuMatriculaUrv : +nuMatricula,
        nuVinculo:
          tipoCalculoDados?.value == "URV" ? +nuDigitoUrv : nuVinculo?.value,
        dtFimUrv: tipoCalculoDados?.value == "URV" ? dtFimUrv : null,
        vaUrvMarco94:
          tipoCalculoDados?.value == "URV" ? vaUrvMarco94 / 100 : null,
        isFerias: tipoCalculoDados?.value == "URV" ? isFerias : null,
        isDecimoTerceiro:
          tipoCalculoDados?.value == "URV" ? isDecimoTerceiro : null,
      })
        .then((response) => {
          if (response.status == "Created") {
            if (tipoCalculoDados?.value == "URV") {
              mutateImportarSip({
                idCalculo: response?.data.id,
                idUsuario: +user["Jvris.User.Id"],
              });
            }
            setIdCalculoContext(response?.data.id);
            handleToast("Cálculo cadastrado com sucesso", false);
            props.setPageName("BASECALC");
          } else {
            handleToast("Erro ao Cadastrar Cálculo", true);
          }
        })
        .catch((err) => {
          handleToast("Erro ao Cadastrar Cálculo", true);
        });
    } else {
      putCalculo({
        id: respostaCalculosDcjeById?.data?.id,
        idFichaProcessual: respostaFichaDCJE?.data.id,
        idParte: +exequentesDados?.value,
        idRazaoPedido: +assuntosDados?.value,
        idResposta: respostaFichaDCJE?.data.idResposta,
        idUsuarioCadastro: +user["Jvris.User.Id"],
        txTipoCalculo: tipoCalculoDados?.value,
        vaExecucao: valorCalculado / 100,
        nuQtdMeses: tipoCalculoDados?.value == "IND" ? qtdMeses : 1,
        nuQtdDias: qtdDias,
        dtCorrecaoMonetaria: dtCorrecaoMonetariaDados.toString(),
        dtJurosMora: dtJurosMoraDados.toString(),
        dtPrescricao: dtPrescricaoDados.toString(),
        nuMatricula:
          tipoCalculoDados?.value == "URV" ? +nuMatriculaUrv : +nuMatricula,
        nuVinculo:
          tipoCalculoDados?.value == "URV" ? +nuDigitoUrv : nuVinculo?.value,
        dtFimUrv: tipoCalculoDados?.value == "URV" ? dtFimUrv : null,
        vaUrvMarco94:
          tipoCalculoDados?.value == "URV" ? vaUrvMarco94 / 100 : null,
        isFerias: tipoCalculoDados?.value == "URV" ? isFerias : null,
        isDecimoTerceiro:
          tipoCalculoDados?.value == "URV" ? isDecimoTerceiro : null,
      })
        .then((response) => {
          if (response.status == "OK") {
            if (tipoCalculoDados?.value == "URV") {
              mutateImportarSip({
                idCalculo: response?.data.id,
                idUsuario: +user["Jvris.User.Id"],
              });
            }
            setIdCalculoContext(response?.data.id);
            handleToast("Cálculo atualizado com sucesso", false);
            props.setPageName("BASECALC");
          } else {
            handleToast("Erro ao atualizar Cálculo", true);
          }
        })
        .catch((err) => {
          handleToast("Erro ao atualizar Cálculo", true);
        });
    }
  };

  return (
    <>
      <PageTitle
        pageTitle="DADOS DO CÁLCULO - DCJE"
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
      <AdicionarExequente
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      />

      {/* <button
        style={{ width: "10rem", height: "10rem", fontSize: "3rem" }}
        onClick={setIdCalculoContext(10)}
      >
        Teste
      </button> */}

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerButtons>
          <S.VoltarButton
            onClick={() => {
              props.setPageName("LISTACALCrespostaFichaDCJE");
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
            isCurrent={true}
            onClick={() => {
              props.setPageName("DADOSCALC");
            }}
          >
            Dados
          </S.AbaButton>
          {idCalculoContext != null && (
            <>
              <S.AbaButton
                isCurrent={false}
                onClick={() => {
                  props.setPageName("BASECALC");
                }}
              >
                Financeiro
              </S.AbaButton>
              {respostaPlanilhaDeCalculo?.data && (
                <>
                  <S.AbaButton
                    isCurrent={false}
                    onClick={() => {
                      props.setPageName("PLANILHACALC");
                    }}
                  >
                    Ver Cálculo
                  </S.AbaButton>
                  {respostaResultadoDoCalculo?.data && (
                    <>
                      <S.AbaButton
                        isCurrent={false}
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
                </>
              )}
            </>
          )}
        </S.ContainerButtons>

        {respostaFichaDCJE?.data ? (
          <S.Wrapper>
            <S.Section
              style={{
                marginTop: "3rem",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
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
                      marginTop: "-1.2rem",
                      marginLeft: "1rem",
                    }}
                    onClick={() =>
                      navigate(
                        `/dashboard/dcje/ficha-processual/${respostaFichaDCJE?.data.idAto}`
                      )
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
                      marginTop: "-1.2rem",
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
              {tipoCalculoDados && (
                <S.SectionDataPartiesCapsule>
                  <S.SectionTitle>Tipo de Cálculo:</S.SectionTitle>
                  <S.SectionDataContainer style={{ flexDirection: "column" }}>
                    <Controller
                      name="tipoCalculo"
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelectCalc
                          placeholder="Selecione o tipo de cálculo"
                          {...field}
                          options={tipoCalculoOptions}
                          isClearable={false}
                          value={tipoCalculoDados}
                          isDisabled={true}
                        />
                      )}
                    />
                  </S.SectionDataContainer>
                </S.SectionDataPartiesCapsule>
              )}
            </S.Section>
          </S.Wrapper>
        ) : (
          ""
        )}

        <S.Container>
          <S.ContainerFieldRow
            style={{
              justifyContent: "flex-start",
              gap: "3rem",
              maxWidth: "75rem",
            }}
          >
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>Exequente: *</S.SectionInfoTitle>
              <S.ExequenteButtons>
                <S.SectionDataInfoSum>
                  <Controller
                    name="exequente"
                    control={control}
                    render={({ field }) => (
                      <S.CustomSelect
                        required={true}
                        placeholder="Selecione o exequente"
                        {...field}
                        options={exequente}
                        isClearable={false}
                        value={exequentesDados}
                        onChange={(data) => handleExequente(data)}
                      />
                    )}
                  />
                </S.SectionDataInfoSum>
                <S.AddExequenteButton onClick={() => setOpenModal(true)} />
              </S.ExequenteButtons>
            </S.SectionDataCapsule>
            {tipoCalculoDados?.value !== "URV" ? (
              <>
                <S.SectionDataCapsule>
                  <S.SectionInfoTitle>Matrícula:</S.SectionInfoTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      placeholder="Matrícula"
                      style={{ width: "12rem" }}
                      value={nuMatricula}
                      onChange={handleNuMatricula}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
                <S.SectionDataCapsule>
                  <S.SectionInfoTitle>Vínculo:</S.SectionInfoTitle>
                  <S.SectionDataInfoSum>
                    <Controller
                      name="tipoCalculo"
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelectVinc
                          placeholder="Vínculo"
                          {...field}
                          options={vinculos ? vinculos : []}
                          isClearable={false}
                          value={nuVinculo ? nuVinculo : null}
                          onChange={(data) => handleVinculo(data)}
                        />
                      )}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
              </>
            ) : (
              <>
                <S.SectionDataCapsule>
                  <S.SectionInfoTitle>Matrícula:</S.SectionInfoTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      style={{ width: "12rem" }}
                      value={nuMatriculaUrv}
                      onChange={handleNuMatriculaUrv}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
                <S.SectionDataCapsule>
                  <S.SectionInfoTitle>Dígito:</S.SectionInfoTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      style={{ width: "8rem" }}
                      value={nuDigitoUrv}
                      onChange={handleNuDigitoUrv}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
              </>
            )}
          </S.ContainerFieldRow>

          <S.ContainerFieldRow
            style={{
              justifyContent: "flex-start",
              gap: "3rem",
              maxWidth: "75rem",
            }}
          >
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>Assunto:</S.SectionInfoTitle>
              <S.SectionDataInfoSum>
                <Controller
                  name="tipoCalculo"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o tipo de cálculo"
                      {...field}
                      options={assuntos}
                      isClearable={false}
                      value={assuntosDados}
                      onChange={(data) => handleAssunto(data)}
                    />
                  )}
                />
              </S.SectionDataInfoSum>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>Valor Executado:</S.SectionInfoTitle>
              <S.SectionDataInfoSum>
                <S.TextInput
                  disabled={
                    (respostaCalculosDcjeById &&
                      respostaCalculosDcjeById?.data?.isComPlanilha != 1) ||
                    cadastrarCalculo
                      ? false
                      : true
                  }
                  style={{ width: "12rem", fontWeight: "bold" }}
                  value={formatarNumero(valorCalculado)}
                  onChange={handleValorCalculado}
                />
              </S.SectionDataInfoSum>
            </S.SectionDataCapsule>
          </S.ContainerFieldRow>

          {tipoCalculoDados?.value == "IND" && (
            <S.ContainerFieldRow style={{ maxWidth: "45rem" }}>
              <S.SectionDataCapsule>
                <S.SectionInfoTitle>Quantidade de Meses: *</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    placeholder="0"
                    value={qtdMeses}
                    required={qtdDias == null ? true : false}
                    maxLength={3}
                    onChange={(value: number) => handleQtdMeses(value)}
                    {...register("nuQtdMeses", {
                      required: qtdDias == null ? true : false,
                      onChange: (value: number) => handleQtdMeses(value),
                    })}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionInfoTitle>Quantidade de Dias: *</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    value={qtdDias}
                    placeholder="0"
                    required={qtdMeses == null ? true : false}
                    maxLength={2}
                    onChange={(value: any) => handleQtdDias(value)}
                    {...register("nuQtdDias", {
                      required: qtdMeses == null ? true : false,
                      onChange: (value: any) => handleQtdDias(value),
                    })}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
            </S.ContainerFieldRow>
          )}

          <S.ContainerFieldRow style={{ maxWidth: "70rem" }}>
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>
                Atualizar Correção Monetária:
              </S.SectionInfoTitle>
              <S.SectionDataInfoSum>
                <S.InputDate
                  {...register("dtCorrecaoMonetaria", {
                    required: false,
                  })}
                  defaultValue={dtCorrecaoMonetariaDados}
                  onChange={(value: any) => handleDataCorrecaoMonetaria(value)}
                  type="date"
                />
              </S.SectionDataInfoSum>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>Atualizar Juros de Mora:</S.SectionInfoTitle>
              <S.SectionDataInfoSum>
                <S.InputDate
                  {...register("dtJurosMora", {
                    required: false,
                  })}
                  defaultValue={dtJurosMoraDados}
                  onChange={(value: any) => handleDataJurosMora(value)}
                  type="date"
                />
              </S.SectionDataInfoSum>
            </S.SectionDataCapsule>
            <S.SectionDataCapsule>
              <S.SectionInfoTitle>Data da Prescrição:</S.SectionInfoTitle>
              <S.SectionDataInfoSum>
                <S.InputDate
                  {...register("dtPrescricao", {
                    required: false,
                  })}
                  defaultValue={dtPrescricaoDados}
                  onChange={(value: any) => handleDataPrescrição(value)}
                  type="date"
                />
              </S.SectionDataInfoSum>
            </S.SectionDataCapsule>
          </S.ContainerFieldRow>
          {tipoCalculoDados?.value == "URV" && (
            <S.ContainerFieldRow style={{ maxWidth: "70rem" }}>
              <S.SectionDataCapsule>
                <S.SectionInfoTitle>Data Fim da URV:</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.InputDate
                    {...register("dtFimUrv", {
                      required: false,
                    })}
                    // defaultValue={dtCorrecaoMonetariaDados}
                    onChange={(value: any) => handleDataFimUrv(value)}
                    type="date"
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>

              <S.SectionDataCapsule>
                <S.SectionInfoTitle>Valor URV Março 1994:</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.TextInput
                    value={formatarNumero(vaUrvMarco94)}
                    onChange={handleVaUrvMarco94}
                  />
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionInfoTitle>Férias:</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.RadioButtonContainer>
                    <S.RadioButtonLabel value={isFerias}>
                      {isFerias ? "SIM" : "NÃO"}
                    </S.RadioButtonLabel>
                    <S.ToggleButton
                      {...register("isFerias")}
                      checked={isFerias}
                      onChange={() => setIsFerias(!isFerias)}
                    />
                  </S.RadioButtonContainer>
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
              <S.SectionDataCapsule>
                <S.SectionInfoTitle>13° Salário:</S.SectionInfoTitle>
                <S.SectionDataInfoSum>
                  <S.RadioButtonContainer>
                    <S.RadioButtonLabel value={isDecimoTerceiro}>
                      {isDecimoTerceiro ? "SIM" : "NÃO"}
                    </S.RadioButtonLabel>
                    <S.ToggleButton
                      {...register("isDecimoTerceiro")}
                      checked={isDecimoTerceiro}
                      onChange={() => setIsDecimoTerceiro(!isDecimoTerceiro)}
                    />
                  </S.RadioButtonContainer>
                </S.SectionDataInfoSum>
              </S.SectionDataCapsule>
            </S.ContainerFieldRow>
          )}
        </S.Container>

        {respostaFichaDCJE?.data?.idResposta == 0 && (
          <>
            {respostaCalculosDcjeById?.data?.isComPlanilha == 1 ? (
              <ExcluirDadosCalculo
                isOpenModal={isOpenExcluirModal}
                setOpenModal={setOpenExcluirModal}
              />
            ) : (
              <S.SalvarButton
                type="submit"
                disabled={!isValid || exequentesDados?.value == null}
              >
                Salvar
              </S.SalvarButton>
            )}
          </>
        )}
      </S.Form>
    </>
  );
};

export default Page;

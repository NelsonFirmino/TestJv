import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../../components/CustomTable";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../../components/TitlePage";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { tipoCalculoOptions } from "../Calculos/mockdata";
import * as S from "../Calculos/styled";
import { LinkEdit } from "../components/LinkEdit";
import { PrintCalculo } from "../components/PrintCalculo";
import { useCalculosContext } from "../context/CalculosContext";
import { CALC, SubmitCalculo } from "../interfaces/calculation.interfaces";

const CalculosInicio = (props: CALC) => {
  const {
    tipoCalculoContext,
    respostaCalculo,
    isLoadingCalc,
    respostaFichaDCJE,
    isLoadingFichaDCJE,
    idCalculo,
    setIdCalculo,
    setIdCalculoContext,
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

  const navigate = useNavigate();

  const [somaVaResultadoTotal, setSomaVaResultadoTotal] = useState(null);
  const [somaVaExecucao, setSomaVaExecucao] = useState(null);
  const [cadastrarCalculo, setCadastrarCalculo] = useState(false);
  const [tipoCalculo, setTipoCalculo] = useState("");

  useEffect(() => {
    if (respostaCalculo?.data) {
      setSomaVaExecucao(
        respostaCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaExecucao,
          0
        )
      );

      setSomaVaResultadoTotal(
        respostaCalculo?.data.reduce(
          (acumulador, objeto) => acumulador + objeto.vaResultadoTotal,
          0
        )
      );
    }
  }, [respostaCalculo]);

  useEffect(() => {
    setValue("id", null);
  }, [respostaCalculo?.data]);

  const onSubmit: SubmitHandler<SubmitCalculo> = (data) => {
    if (data) {
      // setIdCalculo(data.id);
      navigate(`/dashboard/contadoria/calculos/${data.id}`);
    }
  };

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
      <PageTitle
        pageTitle="LISTA DE CÁLCULOS - DCJE"
        pageIcon={<S.PageIcon />}
        button={
          respostaFichaDCJE?.data && (
            <S.RedirectPage
              onClick={() =>
                respostaFichaDCJE?.data?.isEncerrado ||
                respostaFichaDCJE?.data?.idResposta > 0
                  ? HotToastError(
                      "Ficha Processual já respondida, não é possível criar um novo cálculo"
                    )
                  : (setCadastrarCalculo(true),
                    HotToastSucess("Cadastro de cálculo"))
              }
            >
              <S.RedirectPageIcon alt="Cadastrar cálculo" />
            </S.RedirectPage>
          )
        }
      />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Solicitação:</S.SectionTitle>
            <S.FieldContainer style={{ width: "32rem" }}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <S.TextInput
                    type="text"
                    placeholder="Digite o número da solicitação"
                    {...register("id", {
                      maxLength: 24,
                      minLength: 3,
                      required: true,
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton
            disabled={!isValid}
            type="submit"
            onClick={() => (setTipoCalculo(""), setCadastrarCalculo(false))}
          >
            Pesquisar
          </S.SubmitButton>
          <S.ClearButton type="reset" onClick={() => reset()}>
            Limpar
          </S.ClearButton>
        </S.ContainerButtons>
        <S.Wrapper>
          {respostaFichaDCJE?.data ? (
            <S.Section
              style={{
                marginTop: "3rem",
                flexDirection: "row",
                justifyContent: "space-between",
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
                      marginTop: "-1.2rem",
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
              {cadastrarCalculo && (
                <S.SectionDataPartiesCapsule>
                  <S.SectionTitle>Tipo de Cálculo:</S.SectionTitle>
                  <S.SectionDataContainer style={{ flexDirection: "column" }}>
                    <Controller
                      name="tipoCalculo"
                      control={control}
                      render={({ field }) => (
                        <S.CustomSelect
                          placeholder="Selecione o tipo de cálculo"
                          {...field}
                          options={tipoCalculoOptions}
                          isClearable={false}
                          value={tipoCalculo}
                          onChange={(index: string) => setTipoCalculo(index)}
                        />
                      )}
                    />
                    <S.AdicionarCalculoButton
                      disabled={tipoCalculo == "" ? true : false}
                      onClick={(e) => {
                        e.preventDefault();
                        props.setPageName("DADOSCALC");
                      }}
                    >
                      Adicionar
                    </S.AdicionarCalculoButton>
                  </S.SectionDataContainer>
                </S.SectionDataPartiesCapsule>
              )}
            </S.Section>
          ) : (
            ""
          )}

          {respostaCalculo?.data && (
            <>
              {respostaCalculo?.data[0]?.idResposta == "0" ? (
                <CustomTable
                  columns={[
                    {
                      name: "Assunto",
                      isSortable: true,
                      keyData: "txRazaoPedido",
                      breakTextOnFirstColumn: true,
                    },
                    {
                      name: "Exequente",
                      isSortable: true,
                      keyData: "txParte",
                    },
                    {
                      name: "Atualizado até",
                      isSortable: true,
                      keyData: "dtAtualizacaoValor",
                      formatToDate: true,
                    },
                    {
                      name: "Valor Executado",
                      isSortable: true,
                      keyData: "vaExecucao",
                      formatToCurrency: true,
                    },
                    {
                      name: "Valor Calculado",
                      isSortable: true,
                      keyData: "vaResultadoTotal",
                      formatToCurrency: true,
                    },
                    {
                      name: "",
                      isSortable: false,
                      keyData: "editar",
                      component: {
                        element: (data) => (
                          <LinkEdit
                            onClick={() => {
                              setIdCalculoContext(data.id);
                              props.setPageName("DADOSCALC");
                            }}
                            dataTable={data}
                          />
                        ),
                        isButton: true,
                      },
                    },
                    {
                      name: "",
                      isSortable: false,
                      keyData: "editar2",
                      component: {
                        element: (data) => (
                          <LinkEdit
                            onClick={() => {
                              setIdCalculoContext(data.id);
                              props.setPageName("DADOSCALC");
                            }}
                            dataTable={data}
                          />
                        ),
                        isButton: true,
                      },
                    },
                    {
                      name: "",
                      isSortable: false,
                      keyData: "imprimir",
                      component: {
                        element: (data) => <PrintCalculo dataTable={data} />,
                        isButton: true,
                      },
                    },
                  ]}
                  data={respostaCalculo?.data ? respostaCalculo.data : []}
                  showSelectNumberOfRows={false}
                  isLoading={isLoadingCalc}
                  showPagination={false}
                  showSearchField={false}
                  selectRows={false}
                  tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                  pdfButton={{
                    nameFile: "calculos-dcje",
                  }}
                  csvButton={{
                    nameFile: "calculos-dcje",
                  }}
                />
              ) : (
                <CustomTable
                  columns={[
                    {
                      name: "Assunto",
                      isSortable: true,
                      keyData: "txRazaoPedido",
                      breakTextOnFirstColumn: true,
                    },
                    {
                      name: "Exequente",
                      isSortable: true,
                      keyData: "txParte",
                    },
                    {
                      name: "Atualizado até",
                      isSortable: true,
                      keyData: "dtAtualizacaoValor",
                      formatToDate: true,
                    },
                    {
                      name: "Valor Executado",
                      isSortable: true,
                      keyData: "vaExecucao",
                      formatToCurrency: true,
                    },
                    {
                      name: "Valor Calculado",
                      isSortable: true,
                      keyData: "vaResultadoTotal",
                      formatToCurrency: true,
                    },
                    {
                      name: "",
                      isSortable: false,
                      keyData: "editar",
                      component: {
                        element: (data) => (
                          <LinkEdit
                            onClick={() => {
                              setIdCalculoContext(data.id);
                              props.setPageName("DADOSCALC");
                            }}
                            dataTable={data}
                          />
                        ),
                        isButton: true,
                      },
                    },
                    {
                      name: "",
                      isSortable: false,
                      keyData: "imprimir",
                      component: {
                        element: (data) => <PrintCalculo dataTable={data} />,
                        isButton: true,
                      },
                    },
                  ]}
                  data={respostaCalculo?.data ? respostaCalculo.data : []}
                  showSelectNumberOfRows={false}
                  isLoading={isLoadingCalc}
                  showPagination={false}
                  showSearchField={false}
                  selectRows={false}
                  tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                  pdfButton={{
                    nameFile: "calculos-dcje",
                  }}
                  csvButton={{
                    nameFile: "calculos-dcje",
                  }}
                />
              )}

              <S.SectionSum>
                <S.SectionDataRow>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>
                      VALOR EXECUTADO TOTAL
                    </S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaExecucao?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>
                      VALOR CALCULADO TOTAL
                    </S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ fontWeight: "bold" }}
                        value={somaVaResultadoTotal?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                  <S.SectionDataCapsule>
                    <S.SectionDataTitle>DIVERGÊNCIA TOTAL</S.SectionDataTitle>
                    <S.SectionDataInfoSum>
                      <S.TextInput
                        disabled={true}
                        style={{ color: inputColor(), fontWeight: "bold" }}
                        value={(
                          somaVaResultadoTotal - somaVaExecucao
                        )?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      />
                    </S.SectionDataInfoSum>
                  </S.SectionDataCapsule>
                </S.SectionDataRow>
              </S.SectionSum>
            </>
          )}
        </S.Wrapper>
      </S.Form>
      {!isLoadingFichaDCJE && respostaFichaDCJE?.data.idResposta > 0 ? (
        <S.ContainerButtons
          style={{ marginLeft: "2rem", marginBottom: "2rem" }}
        >
          <S.RespostaButton
            onClick={() => {
              if (respostaFichaDCJE?.data) {
                props.setPageName("RESPOSTACALC");
              }
            }}
          >
            Resposta
          </S.RespostaButton>
        </S.ContainerButtons>
      ) : (
        ""
      )}
    </>
  );
};

export default CalculosInicio;

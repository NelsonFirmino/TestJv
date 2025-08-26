import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postCalculoResultado } from "../../../../../api/services/RespostaDcje/respostaDcje";
import { CustomTable } from "../../../../../components/CustomTable";
import { PageTitle } from "../../../../../components/TitlePage";
import { SharedState } from "../../../../../context/SharedContext";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { ExcluirDadosCalculo } from "../../DadosCalculo/ExcluirDadosCalculo";
import { HomePageIcon, RedirectPage } from "../Calculos/styled";
import { EditIndices } from "../components/LinkEdit2";
import { useCalculosContext } from "../context/CalculosContext";
import { CALC, SubmitCalculo } from "../interfaces/calculation.interfaces";
import { ExcluirCalculoPlanilha } from "./ExcluirCalculoPlanilha";
import * as S from "./styled";

const PlanilhaDeCalculo = (props: CALC) => {
  const {
    tipoCalculoContext,
    respostaCalculo,
    respostaFichaDCJE,
    isLoadingFichaDCJE,
    respostaPlanilhaDeCalculo,
    isLoadingPlanilhaDeCalculo,
    setIsRespostaInicial,
    respostaCalculosDcjeById,
    setUpdateData,
    updateData,
    setTipoCalculoContext,
    setCadastrarCalculo,
    idCalculoContext,
    respostaResultadoDoCalculo,
  } = useCalculosContext();
  const {
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SubmitCalculo>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { user, selectedUser } = SharedState();

  const [somaVaCorrecaoMonetaria, setSomaVaCorrecaoMonetaria] = useState(null);
  const [somaVaBase, setSomaVaBase] = useState(null);
  const [somaVaJurosMora, setSomaVaJurosMora] = useState(null);
  const [somaVaAtualizado, setSomaVaAtualizado] = useState(null);
  const [isOpenExcluirModal, setOpenExcluirModal] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

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

  const onSubmit: SubmitHandler<SubmitCalculo> = (data) => {};

  const inputColor = () => {
    if (somaVaAtualizado! > 0) {
      return "blue";
    } else if (somaVaAtualizado! == 0) {
      return "black";
    } else {
      return "red";
    }
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

  const postCalcResultado = (id?: number) => {
    postCalculoResultado({
      id: 0,
      idCalculo: respostaCalculosDcjeById?.data.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Resultado cadastrado com sucesso", false);
          props.setPageName("RESULTADOCALC");
        } else {
          handleToast("Erro ao cadastrar resultado", true);
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
        pageTitle="PLANILHA DE CÁLCULO - DCJE"
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
              props.setPageName("BASECALC");
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
          <S.AbaButton
            isCurrent={true}
            onClick={() => {
              props.setPageName("PLANILHACALC");
            }}
          >
            Ver Cálculo
          </S.AbaButton>
          {respostaResultadoDoCalculo?.data != null && (
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
        </S.ContainerButtons>
        {respostaFichaDCJE?.data ? (
          <S.Wrapper>
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
            </S.Section>

            {respostaPlanilhaDeCalculo?.data &&
            respostaPlanilhaDeCalculo?.data[0]?.isComResultado != 1 ? (
              <CustomTable
                columns={[
                  {
                    name: "Data Base",
                    isSortable: true,
                    keyData: "dtBase",
                    formatToDate: true,
                  },
                  {
                    name: "Valor",
                    isSortable: true,
                    keyData: "vaBaseMes",
                    formatToCurrency: true,
                  },
                  {
                    name: "Índice de Correção",
                    isSortable: true,
                    keyData: "vaIndiceCorrecao",
                  },
                  {
                    name: "Valor Correção Monetária",
                    isSortable: true,
                    keyData: "vaCorrecaoMonetaria",
                    formatToCurrency: true,
                  },
                  {
                    name: "Índice de Juros",
                    isSortable: true,
                    keyData: "vaIndiceJuros",
                  },
                  {
                    name: "Valor Juros de Mora",
                    isSortable: true,
                    keyData: "vaJurosMora",
                    formatToCurrency: true,
                  },
                  {
                    name: "Valor Atualizado",
                    isSortable: true,
                    keyData: "vaAtualizado",
                    formatToCurrency: true,
                  },
                  {
                    name: "",
                    isSortable: false,
                    keyData: "editar",
                    component: {
                      element: (data) => <EditIndices dataTable={data} />,

                      isButton: true,
                    },
                  },
                  {
                    name: "",
                    isSortable: false,                                       
                    keyData: "excluir",
                    component: {
                      element: (data) => (
                        <ExcluirCalculoPlanilha
                          dataTable={data}
                          // onClick={() => setAlterarButton(false)}
                        />
                      ),

                      isButton: true,
                    },
                  },
                ]}
                data={
                  respostaPlanilhaDeCalculo?.data
                    ? respostaPlanilhaDeCalculo?.data
                    : []
                }
                showSelectNumberOfRows={false}
                isLoading={isLoadingPlanilhaDeCalculo}
                showPagination={true}
                showSearchField={true}
                tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                pdfButton={{
                  nameFile: "planilha-de-calculo-dcje",
                }}
                csvButton={{
                  nameFile: "planilha-de-calculo-dcje",
                }}
              />
            ) : (
              <CustomTable
                columns={[
                  {
                    name: "Data Base",
                    isSortable: true,
                    keyData: "dtBase",
                    formatToDate: true,
                  },
                  {
                    name: "Valor",
                    isSortable: true,
                    keyData: "vaBaseMes",
                    formatToCurrency: true,
                  },
                  {
                    name: "Índice de Correção",
                    isSortable: true,
                    keyData: "vaIndiceCorrecao",
                  },
                  {
                    name: "Valor Correção Monetária",
                    isSortable: true,
                    keyData: "vaCorrecaoMonetaria",
                    formatToCurrency: true,
                  },
                  {
                    name: "Índice de Juros",
                    isSortable: true,
                    keyData: "vaIndiceJuros",
                  },
                  {
                    name: "Valor Juros de Mora",
                    isSortable: true,
                    keyData: "vaJurosMora",
                    formatToCurrency: true,
                  },
                  {
                    name: "Valor Atualizado",
                    isSortable: true,
                    keyData: "vaAtualizado",
                    formatToCurrency: true,
                  },
                ]}
                data={
                  respostaPlanilhaDeCalculo?.data
                    ? respostaPlanilhaDeCalculo?.data
                    : []
                }
                showSelectNumberOfRows={false}
                isLoading={isLoadingPlanilhaDeCalculo}
                showPagination={true}
                showSearchField={true}
                tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                pdfButton={{
                  nameFile: "planilha-de-calculo-dcje",
                }}
                csvButton={{
                  nameFile: "planilha-de-calculo-dcje",
                }}
              />
            )}

            <S.SectionSum>
              <S.SectionDataRow>
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>VALOR BASE TOTAL</S.SectionDataTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      disabled={true}
                      style={{ fontWeight: "bold" }}
                      value={somaVaBase?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>
                    VALOR CORREÇÃO MONETÁRIA TOTAL
                  </S.SectionDataTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      disabled={true}
                      style={{ fontWeight: "bold" }}
                      value={somaVaCorrecaoMonetaria?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>
                    VALOR JUROS DE MORA TOTAL
                  </S.SectionDataTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      disabled={true}
                      style={{ fontWeight: "bold" }}
                      value={somaVaJurosMora?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
                <S.SectionDataCapsule>
                  <S.SectionDataTitle>
                    VALOR ATUALIZADO TOTAL
                  </S.SectionDataTitle>
                  <S.SectionDataInfoSum>
                    <S.TextInput
                      disabled={true}
                      style={{ color: inputColor(), fontWeight: "bold" }}
                      value={somaVaAtualizado?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    />
                  </S.SectionDataInfoSum>
                </S.SectionDataCapsule>
              </S.SectionDataRow>
            </S.SectionSum>
          </S.Wrapper>
        ) : (
          ""
        )}
        {respostaCalculosDcjeById?.data?.idResposta == 0 && (
          <S.ContainerButtons>
            {respostaCalculosDcjeById?.data?.vaResultadoTotal == 0 ? (
              <S.SalvarButton
                onClick={() => {
                  postCalcResultado();
                }}
              >
                Calcular Resultado
              </S.SalvarButton>
            ) : (
              <ExcluirDadosCalculo
                isOpenModal={isOpenExcluirModal}
                setOpenModal={setOpenExcluirModal}
              />
            )}
          </S.ContainerButtons>
        )}
      </S.Form>
    </>
  );
};

export default PlanilhaDeCalculo;

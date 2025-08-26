import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  SubmitData,
  SubmitRecClosedProc,
} from "./interfaces/responseofprocessforms.interface";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { useEffect, useState } from "react";
import { getRespostasDCJE } from "../../../../api/services/respostasDCJE/respostasDCJE";
import JvrisTable from "../../../../components/JvrisTable";
import { formatDataToTableExtra } from "../../../../utils/formatDataToTableExtra";
import theme from "../../../../globalStyle/theme";
import { PencilSimple, X } from "phosphor-react";
import { ModalRemove } from "./components/ModalRemove";
import { useAccountants } from "../../../../hooks/useAccountants";
import { useNavigate } from "react-router-dom";
import { SharedState } from "../../../../context/SharedContext";

const ResponseOfProcessForms = () => {
  const { user } = SharedState();
  const navigate = useNavigate();
  const { accountantsList, loadingAccountantsList } = useAccountants();
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(null);
  const [startDateState, setStartDateState] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [endDateState, setEndDateState] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [processoState, setProcessoState] = useState<number>();
  const [contadorState, setContadorState] = useState<number>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitRecClosedProc>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitRecClosedProc> = (data) => {
    getData({
      dtIni: data.startDate.toString(),
      dtFim: data.endDate.toString(),
      idProcesso: data.processo?.value,
      idContador: data.contador?.value,
    });
  };

  const getData = ({ dtIni, dtFim, idProcesso, idContador }: SubmitData) => {
    setIsLoading(true);
    setListData(null);
    setStartDateState(dtIni);
    setEndDateState(dtFim);
    setProcessoState(idProcesso);
    setContadorState(idContador);

    let contador: number = idContador ?? 0;

    if (user["jvris.User.Perfil"] != "4") {
      contador = +user["Jvris.User.Id"];
    }

    getRespostasDCJE({
      idContador: contador,
      dtIni,
      dtFim,
      idProcesso,
    })
      .then((response) => {
        setListData(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setListData(null);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData({ dtIni: startDateState, dtFim: endDateState });
  }, []);

  useEffect(() => {
    if (showModalRemove == false) {
      getRespostasDCJE({
        dtIni: startDateState,
        dtFim: endDateState,
        idProcesso: processoState,
        idContador: contadorState,
      }).then((response) => {
        setListData(response.data);
        resetStates();
      });
    }
  }, [showModalRemove]);

  const resetStates = () => {
    setShowModalRemove(null);
  };

  const loadOptionsSpecials = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 5) {
      callback(null);
    } else {
      autocompleteSpecials({ txNumero: inputValue }).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
              label: atc.txNumeroFormatado,
              value: atc.id,
            }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  return (
    <>
      {showModalRemove && (
        <ModalRemove setShowModalRemove={setShowModalRemove} id={id} />
      )}

      <PageTitle
        pageTitle="RESPOSTAS CADASTRADAS - DCJE"
        pageIcon={<S.PageIcon />}
      />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Data de Cadastro:</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.startDate?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("startDate", {
                    //required: "Data de início de período é obrigatória.",
                  })}
                />
              </S.DateContent>

              <S.DateContent error={errors.endDate?.message}>
                <S.DateDescription>Fim</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Fim"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("endDate", {
                    //required: "Data de fim de período é obrigatória.",
                    validate: (endDate: string) => {
                      if (watch("startDate") > endDate) {
                        return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                      }
                    },
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
          </S.FieldDateContainer>

          <S.ErrorMessage>{errors.startDate?.message}</S.ErrorMessage>
          <S.ErrorMessage>{errors.endDate?.message}</S.ErrorMessage>
        </S.Section>

        <S.Row>
          {user["jvris.User.Perfil"] == "4" && (
            <S.Section>
              <S.SectionTitle>Contador:</S.SectionTitle>
              <S.FieldContainer>
                <Controller
                  name="contador"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      placeholder="Selecione o contador"
                      isLoading={loadingAccountantsList}
                      options={accountantsList}
                      isClearable
                    />
                  )}
                />
              </S.FieldContainer>
            </S.Section>
          )}
          <S.Section>
            <S.SectionTitle>Nº do Processo:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="processo"
                control={control}
                render={({ field }) => (
                  <S.CustomAutocomplete
                    placeholder="Digite no mínimo 5 digitos iniciais"
                    cacheOptions={true}
                    loadOptions={loadOptionsSpecials}
                    defaultOptions
                    noOptionsMessage={() => "Número de processo não encontrado"}
                    isClearable
                    {...field}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Pesquisar
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() => {
              reset({
                contador: null,
                processo: null,
                startDate: new Date().toISOString().substring(0, 10),
                endDate: new Date().toISOString().substring(0, 10),
              });
            }}
          >
            Limpar
          </S.ClearButton>
        </S.ContainerButtons>
      </S.Form>

      {isLoading ? (
        <S.LoadingSpinner />
      ) : (
        (!listData || listData?.length == 0) && (
          <S.FieldContainer style={{ padding: "2rem" }}>
            <S.LabelField style={{ color: theme.colors.softRed }}>
              Não foram encontrados registros com os parâmetros informados.
            </S.LabelField>
          </S.FieldContainer>
        )
      )}

      {listData?.length > 0 && (
          <JvrisTable
            autoPrimaryColumn={false}
            download
            
            columns={[
              {
                text: "Nº SOLICITAÇÃO",
              },
              {
                text: "Nº Processo",
              },
              {
                text: "Distribuição",
              },
              {
                text: "Prazo DCJE",
              },
              {
                text: "Prazo Procurador",
              },
              {
                text: "Resposta",
              },
              {
                text: "Autores",
              },
              {
                text: "Valor R$",
              },
              {
                text: "Assunto",
              },
            ]}
            data={formatDataToTableExtra({
              content: listData,
              keysToInclude: [
                "idFichaProcessual",
                "txNumeroFormatado",
                "dtDistribuicao",
                "dtPrazoDCJE",
                "dtPrazoProcurador",
                "dtResposta",
                "nuAutores",
                "vaTotal",
                "txRazaoPedido",
              ],
              keysToFormatAsDate: [
                "dtDistribuicao",
                "dtPrazoDCJE",
                "dtPrazoProcurador",
                "dtResposta",
                "txDataEntrada",
              ],
              keysToFormatAsMoney: ["vaTotal"],
            })}
            GenericButton={
              user["jvris.User.Perfil"] == "4"
                ? [
                    {
                      alt: "Editar Resposta",
                      hoverColor: theme.colors.softYellow,
                      icon: <PencilSimple weight="fill" size={20} />,
                      onClick: (index) => {
                        if (index !== undefined) {
                          setId(listData[index].id);
                          navigate(
                            `/dashboard/contadoria/dcje-resposta/${listData[index].id}`
                          );
                        }
                      },
                    },
                    {
                      alt: "Excluir Resposta",
                      hoverColor: theme.colors.softRed,
                      icon: <X weight="bold" size={20} />,
                      onClick: (index) => {
                        setId(listData[index].id);
                        setShowModalRemove(!showModalRemove);
                      },
                    },
                  ]
                : [
                    {
                      alt: "Editar Resposta",
                      hoverColor: theme.colors.softYellow,
                      icon: <PencilSimple weight="fill" size={20} />,
                      onClick: (index) => {
                        if (index !== undefined) {
                          setId(listData[index].id);
                          navigate(
                            `/dashboard/contadoria/dcje-resposta/${listData[index].id}`
                          );
                        }
                      },
                    },
                  ]
            }
          />
      )}
    </>
  );
};

export default ResponseOfProcessForms;

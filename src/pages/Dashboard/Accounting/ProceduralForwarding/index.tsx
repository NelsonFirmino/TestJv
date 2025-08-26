import { CheckSquare, Eye, PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import useFichaDcjeService from "../../../../api/services/ficha-dcje";
import ConfirmToast from "../../../../components/ConfirmToast";
import JvrisTable from "../../../../components/JvrisTable";
import { JvrisGenericButtonI } from "../../../../components/JvrisTable/components/GenericButton/GenericButton.interface";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import theme from "../../../../globalStyle/theme";
import { formatDataToTable } from "../../../../utils/formatDataToTable";
import { formatToBrazilianDate } from "../../../../utils/formatToBrazilianDate.util";
import { SubmitProcForwarding } from "./interfaces/proceduralforwarding.interface";
import * as MockData from "./mockData";
import * as S from "./styled";

const ProceduralForwarding = () => {
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const navigate = useNavigate();
  const defaultDate = new Date().toISOString().substring(0, 10);

  const [renderButtons, setRenderButtons] = useState<JvrisGenericButtonI[][]>(
    []
  );
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [toastData, setToastData] = useState({
    text: "",
    onConfirm: async () => {},
  });
  const [dtInicio, setDtInicio] = useState<string>();
  const [dtFinal, setDtFinal] = useState<string>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitProcForwarding>({
    mode: "onChange",
  });

  const {
    getAll,
    get,
    getFichasForIdAto,
    postEncerrarFicha,
    deleteExcluirFicha,
    fichasDcje,
    fichasDcjeResponse,
    fichaId,
    loading,
    resetFichasDcje,
  } = useFichaDcjeService();

  async function refreshTable() {
    if (fichasDcje) resetFichasDcje();
    await getAll({
      idProcurador: user_id.toString(),
      dtIni: dtInicio,
      dtFim: dtFinal,
      isResposta: false,
      page: "1",
      pageSize: "1000",
      isEncerradas: false,
    });
    return true;
  }

  useEffect(() => {
    if (fichasDcje) {
      for (let x = 0; x < fichasDcje.length; x++) {
        const element = fichasDcje[x];
        element.dtAjuizamento = formatToBrazilianDate(element.dtAjuizamento);
        element.dtAtualizacaoValor = formatToBrazilianDate(
          element.dtAtualizacaoValor
        );
        element.dtCadastro = formatToBrazilianDate(element.dtCadastro);
        element.dtCitacao = formatToBrazilianDate(element.dtCitacao);
        element.dtPrazoDCJE = formatToBrazilianDate(element.dtPrazoDCJE);
        element.dtPrazoProcurador = formatToBrazilianDate(
          element.dtPrazoProcurador
        );
      }

      ConfirmToast;
      tableButtons();
    }
  }, [fichasDcje]);

  useEffect(() => {
    refreshTable();
  }, [user_id]);

  useEffect(() => {
    goToFicha();
  }, [fichaId]);

  const onSubmit: SubmitHandler<SubmitProcForwarding> = (params) => {
    setDtInicio(params.dtIni);
    setDtFinal(params.dtFim);
    get({
      ...params,
      idProcurador: user_id.toString(),
      idProcesso: params.idProcesso?.value,
      isResposta: params.isResposta,
      page: "1",
      pageSize: "1000",
    });
  };

  const loadOptions = (inputValue: string, callback: any) => {
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

  function handleToast(excluir: boolean, index: number) {
    if (fichasDcje) {
      if (excluir)
        setToastData({
          text: `Deseja excluir a solicitação Nº ${fichasDcje[
            index
          ].id.toString()}`,
          onConfirm: async () => await handleExcluir(index),
        });
      else
        setToastData({
          text: `Deseja encerrar a solicitação Nº ${fichasDcje[
            index
          ].id.toString()}`,
          onConfirm: async () => await handleEncerrar(index),
        });
    }
    setShowConfirmToast(true);
  }

  async function handleExcluir(index: number) {
    await deleteExcluirFicha({
      id: fichasDcje![index].id,
    });
    await refreshTable();
  }

  async function handleEncerrar(index: number) {
    await postEncerrarFicha({
      id: fichasDcje![index].id,
      idProcurador: +user["Jvris.User.Id"],
    });
    await refreshTable();
  }

  async function handleEditar(index: number) {
    await getFichasForIdAto({
      id: fichasDcje![index].id,
    });

    if (fichaId) {
      return navigate(
        `/dashboard/dcje/ficha-processual/${fichaId?.data.idAto}`
      );
    }
    goToFicha();
  }

  function goToFicha() {
    if (fichaId) {
      return navigate(
        `/dashboard/dcje/ficha-processual/${fichaId?.data.idAto}`
      );
    }
  }

  const tableButtons = () => {
    const btnEditar: JvrisGenericButtonI = {
      hoverColor: theme.colors.softYellow,
      icon: <PencilSimple weight="fill" size={20} alt="Editar" />,
      onClick: async (index) => {
        if (index != undefined) await handleEditar(index);
      },
    };

    const btnExcluir: JvrisGenericButtonI = {
      hoverColor: theme.colors.softRed,
      icon: <X weight="fill" size={20} alt="Excluir" />,
      onClick: async (index) => {
        if (index != undefined) handleToast(true, index);
      },
    };

    const btnVerResposta: JvrisGenericButtonI = {
      hoverColor: theme.colors.jvrisAqua,
      icon: <Eye weight="bold" size={20} alt="Ver resposta" />,
      onClick: (index: any) => {
        navigate(
          `/dashboard/contadoria/dcje-resposta/${
            fichasDcje![index!].idResposta
          }`
        );
      },
    };

    const btnEncerrar: JvrisGenericButtonI = {
      hoverColor: theme.colors.softOrange,
      icon: <CheckSquare size={20} alt="Encerrar" />,
      onClick: async (index) => {
        if (index != undefined) handleToast(false, index);
      },
    };
    const renderButtonsArray: JvrisGenericButtonI[][] = [];

    fichasDcje?.forEach((ficha) => {
      const renderButtonsLine: JvrisGenericButtonI[] = [];
      renderButtonsLine.push(btnEditar);

      const idDistribuicao = ficha.idDistribuicao.toString();
      const idResposta = ficha.idResposta.toString();

      if (idDistribuicao == "0") renderButtonsLine.push(btnExcluir);

      if (idResposta != "0") {
        renderButtonsLine.push(btnVerResposta);
        renderButtonsLine.push(btnEncerrar);
      }
      if (renderButtonsLine.length > 0)
        renderButtonsArray.push(renderButtonsLine);
    });

    setRenderButtons(renderButtonsArray);
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
        pageTitle="LISTAGEM DOS PROCESSOS ENCAMINHADOS À DCJE/PGE"
        pageIcon={<S.PageIcon />}
      />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Data de Cadastro:</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.dtIni?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  max={defaultDate}
                  {...register("dtIni", {
                    // required: "Data de início de período é obrigatória.",
                    validate: (dtIni) => {
                      if (watch("dtFim") < dtIni) {
                        return "Intervalo de data inválido. Data de inicio deve ser antes da data de final.";
                      }
                    },
                  })}
                />
              </S.DateContent>

              <S.DateContent error={errors.dtFim?.message}>
                <S.DateDescription>Fim</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Fim"
                  max={defaultDate}
                  {...register("dtFim", {
                    // required: "Data de fim de período é obrigatória.",
                    validate: (dtFim) => {
                      if (watch("dtIni") > dtFim) {
                        return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                      }
                    },
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
          </S.FieldDateContainer>

          <S.ErrorMessage>{errors.dtIni?.message}</S.ErrorMessage>
          <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
        </S.Section>

        <S.Row>
          <S.LeftSection>
            <S.SectionTitle>Solicitação:</S.SectionTitle>

            <S.FieldContainer>
              <S.TextInput
                type="text"
                placeholder="Digite a solicitação"
                {...register("idFichaProcessual")}
              />
            </S.FieldContainer>
          </S.LeftSection>

          <S.Section>
            <S.SectionTitle>Nº do Processo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idProcesso"
                control={control}
                render={({ field }) => (
                  <S.CustomAutocomplete
                    placeholder="Digite no mínimo 5 digitos iniciais do processo"
                    cacheOptions={true}
                    loadOptions={loadOptions}
                    defaultOptions
                    noOptionsMessage={() => "Número de processo não encontrado"}
                    isClearable
                    {...field}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.RightSection>
            <S.SectionTitle>Resposta:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="isResposta"
                control={control}
                render={({ field }) => (
                  <S.Section>
                    <S.RadioButtonContainer htmlFor="isResposta">
                      <S.RadioButtonLabel value={field.value}>
                        {field.value ? "SIM" : "NÃO"}
                      </S.RadioButtonLabel>
                      <S.ToggleButton {...register("isResposta")} />
                    </S.RadioButtonContainer>
                  </S.Section>
                )}
              />
            </S.FieldContainer>
          </S.RightSection>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Pesquisar
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                dtIni: defaultDate,
                dtFim: defaultDate,
                isResposta: false,
                idProcesso: null,
              })
            }
          >
            Limpar
          </S.ClearButton>
          {loading && <S.LoadingSpinner />}
        </S.ContainerButtons>
        <S.WarningMessage>{fichasDcjeResponse?.message}</S.WarningMessage>
      </S.Form>

      {fichasDcje && (
          <JvrisTable
            download
            autoPrimaryColumn={false}
            
            columns={MockData.TableDataTitle()}
            data={formatDataToTable(
              fichasDcje,
              [
                "id",
                "txNumeroFormatado",
                "dtCadastro",
                "dtPrazoProcurador",
                "dtPrazoDCJE",
                "txContador",
                "txDataResposta",
                "vaDivergencia",
              ],
              ["vaDivergencia"]
            )}
            GenericButtonOnSpecificLines={renderButtons}
          />
      )}
    </>
  );
};

export default ProceduralForwarding;

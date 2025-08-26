import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitCompActs } from "./interfaces/completedacts.inteface";
import * as MockData from "./mockData";
import * as S from "./styled";
import { PageTitle } from "../../../../components/TitlePage";
import { useEffect, useState } from "react";
import JvrisTable from "../../../../components/JvrisTable";
import { formatDataToTableExtra } from "../../../../utils/formatDataToTableExtra";
import { useMutation } from "react-query";
import { useSpecials } from "../../../../hooks/useSpecials";
import { JvrisTableColumnNDataI } from "../../../../components/JvrisTable/JvrisTable.interface";
import { getDashboardRPVListarComFiltro } from "../../../../api/services/dashboardRPV/dashboardRPV";
import { useRpvNaturezaDespesasSelect } from "../../../../hooks/useRpvNaturezaDespesas";
import { ModalRemove } from "./components/ModalRemove";
import { useNavigate } from "react-router-dom";
import { getRpvRequisitorioByID } from "../../../../api/services/rpvRequisitorios/rpvRequisitorios";
import { ModalAddDespacho } from "./components/ModalAddDespacho";
import { getDispatch } from "../../../../api/services/dispatch/dispatchModal/dispatch";
import { ModalAddApostilamento } from "./components/ModalAddApostilamento";
import { ModalAddHonorario } from "./components/ModalAddHonorario";
import { SharedState } from "../../../../context/SharedContext";

// TODO: incluir máscara de CPF/CNPJ

const ConsultaRequisitorios = () => {
  const navigate = useNavigate();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalAddDespacho, setShowModalAddDespacho] = useState(false);
  const [showModalAddApostilamento, setShowModalAddApostilamento] =
    useState(false);
  const [showModalAddHonorario, setShowModalAddHonorario] = useState(false);
  const [id, setId] = useState<number>(null);
  const [idAto, setIdAto] = useState<number>(null);
  const [idProcurador, setIdProcurador] = useState<number>(null);
  const [idRequisitorio, setIdRequisitorio] = useState<number>(null);
  const [submitCompActs, setSubmitCompActs] = useState<SubmitCompActs>();

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitCompActs>({
    mode: "onChange",
  });

  const [tipoSelectedOption, setTipoSelectedOption] = useState(
    MockData.specialOptions[0]
  );

  const [naturezaSelectedOption, setNaturezaSelectedOption] = useState({
    label: "",
    value: 0,
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(getDashboardRPVListarComFiltro);

  const { naturezaList, isLoadingNaturezaList } =
    useRpvNaturezaDespesasSelect();
  const { specialsList, loadingSpecialsList } = useSpecials();
  const [data, setData] = useState<JvrisTableColumnNDataI[][]>([[]]);

  const onSubmit: SubmitHandler<SubmitCompActs> = (params) => {
    setSubmitCompActs(params);
    mutate({
      ...params,
      dtInicio: params.dtInicio,
      dtFim: params.dtFim,
      txTipo: tipoSelectedOption?.value,
      txCpfCnpj: params.txRequisitor,
      txProcesso: params.txProcesso,
      txCpfCnpjDevedor: params.txDevedor,
      idNatureza: naturezaSelectedOption?.value,
      idUsuarioLogado: +user["Jvris.User.Id"],
    });
  };

  useEffect(() => {
    if (!showModalRemove && submitCompActs) {
      mutate({
        ...submitCompActs,
        dtInicio: submitCompActs.dtInicio,
        dtFim: submitCompActs.dtFim,
        txTipo: tipoSelectedOption?.value,
        txCpfCnpj: submitCompActs.txRequisitor,
        txProcesso: submitCompActs.txProcesso,
        txCpfCnpjDevedor: submitCompActs.txDevedor,
        idNatureza: naturezaSelectedOption?.value,
        idUsuarioLogado: +user["Jvris.User.Id"],
      });
    }
  }, [showModalRemove]);

  useEffect(() => {
    if (specialsList) {
      setNaturezaSelectedOption(null);
    }
  }, [!loadingSpecialsList]);

  useEffect(() => {
    if (response?.data) {
      setData(
        formatDataToTableExtra({
          content: response?.data,
          keysToInclude: [
            "txRequisitor",
            "txCpfCnpjRequisitor",
            "txDevedor",
            "txNatureza",
            "txProcesso",
            "txTipo",
            "dtLimitePagamento",
            "vaPagamento",
          ],
          keysToFormatAsType: ["txTipo"],
          keysToFormatAsMoney: ["vaPagamento"],
          keysToFormatAsDate: ["dtLimitePagamento"],
        })
      );
    }
  }, [response?.data]);

  return (
    <>
      {showModalAddDespacho && (
        <ModalAddDespacho
          setShowModalAdd={setShowModalAddDespacho}
          id={id}
          idAto={idAto}
          idProcurador={idProcurador}
        />
      )}

      {showModalAddApostilamento && (
        <ModalAddApostilamento
          setShowModalAdd={setShowModalAddApostilamento}
          idRequisitorio={idRequisitorio}
          idUsuarioCadastro={+user["Jvris.User.Id"]}
        />
      )}

      {showModalAddHonorario && (
        <ModalAddHonorario
          setShowModalAdd={setShowModalAddHonorario}
          idRequisitorio={idRequisitorio}
          idUsuarioCadastro={+user["Jvris.User.Id"]}
        />
      )}

      {showModalRemove && (
        <ModalRemove
          setShowModalRemove={setShowModalRemove}
          id={idRequisitorio}
        />
      )}

      <PageTitle pageTitle="CONSULTA REQUISÍTORIOS" pageIcon={<S.PageIcon />} />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Período:</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.dtInicio?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={defaultDate}
                  //max={defaultDate}
                  {...register("dtInicio", {
                    required: "Data de início de período é obrigatória.",
                    validate: (dtInicio) => {
                      if (watch("dtFim") < dtInicio) {
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
                  defaultValue={defaultDate}
                  //max={defaultDate}
                  {...register("dtFim", {
                    required: "Data de fim de período é obrigatória.",
                    validate: (dtFim) => {
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

        <S.Row>
          <S.Section>
            <S.SectionTitle>Tipo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idTipo"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    {...field}
                    options={MockData.specialOptions}
                    value={tipoSelectedOption ?? tipoSelectedOption[0]}
                    onChange={(value: any) => setTipoSelectedOption(value)}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>
        <S.Row>
          <S.Section>
            <S.SectionTitle>CPF/CNPJ Requisitor:</S.SectionTitle>

            <S.FieldContainer>
              <S.TextInput type="input" {...register("txRequisitor")} />
            </S.FieldContainer>
          </S.Section>
          <S.Section>
            <S.SectionTitle>Nº Processo:</S.SectionTitle>

            <S.FieldContainer>
              <S.TextInput type="input" {...register("txProcesso")} />
            </S.FieldContainer>
          </S.Section>
        </S.Row>
        <S.Row>
          <S.Section>
            <S.SectionTitle>CPF/CNPJ Devedor:</S.SectionTitle>

            <S.FieldContainer>
              <S.TextInput type="input" {...register("txDevedor")} />
            </S.FieldContainer>
          </S.Section>
          <S.Section>
            <S.SectionTitle>Natureza da despesa:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idNaturezaDespesa"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a natureza da despesa"
                    {...field}
                    isLoading={isLoadingNaturezaList}
                    options={naturezaList}
                    value={naturezaSelectedOption}
                    onChange={(value: any) => {
                      setNaturezaSelectedOption(value);
                    }}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Consultar
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() => {
              setTipoSelectedOption(MockData.specialOptions[0]);
              setNaturezaSelectedOption(null);
              reset();
            }}
          >
            Limpar
          </S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>

      {!response ? (
        ""
      ) : (
        <>
          <S.Section>
            <PageTitle pageTitle="REQUISÍTORIOS" pageIcon={<S.NoIcon />} />
            {response.status != "OK" && (
              <S.Section>
                <S.DataStatus>{response.message}</S.DataStatus>
              </S.Section>
            )}

            <S.TableWrapper>
              {response?.data ? (
                <JvrisTable
                  download
                  autoPrimaryColumn={false}
                  
                  columns={MockData.TableDataTitle()}
                  data={data}
                  ClicableButton={{
                    text: "Editar",
                    onClick(index) {
                      getRpvRequisitorioByID(response?.data[index].id).then(
                        (response: any) => {
                          if (response?.data?.idAto) {
                            navigate(
                              `/dashboard/gerenciamento/requisitorios/${response?.data?.idAto}`
                            );
                          }
                        }
                      );
                    },
                    subOptions: [
                      [
                        {
                          text: "Despacho",
                          onClick(index) {
                            getRpvRequisitorioByID(
                              response?.data[index].id
                            ).then((response: any) => {
                              getDispatch(response?.data.idAto).then(
                                (response: any) => {
                                  setId(response?.data?.id);
                                  setIdProcurador(response?.data?.idProcurador);
                                  setIdAto(response?.data?.idAto);
                                  setShowModalAddDespacho(true);
                                }
                              );
                            });
                          },
                        },
                      ],
                      [
                        {
                          text: "Apostilamentos",
                          onClick(index) {
                            setIdRequisitorio(response?.data[index].id);
                            setShowModalAddApostilamento(true);
                          },
                        },

                        {
                          text: "Honorários",
                          onClick(index) {
                            setIdRequisitorio(response?.data[index].id);
                            setShowModalAddHonorario(true);
                          },
                        },
                      ],
                      [
                        {
                          text: "Excluir",
                          onClick(index) {
                            setIdRequisitorio(response?.data[index].id);
                            setShowModalRemove(true);
                          },
                        },
                      ],
                    ],
                  }}
                />
              ) : (
                ""
              )}
            </S.TableWrapper>
          </S.Section>
        </>
      )}
    </>
  );
};

export default ConsultaRequisitorios;

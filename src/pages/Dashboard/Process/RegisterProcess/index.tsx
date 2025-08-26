import * as S from "./styled";
import { useEffect, useState } from "react";
import { PageTitle } from "../../../../components/TitlePage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  SubmitObservationProcess,
  SubmitProcess,
} from "./interfaces/register-process.interface";
import { useProcessData } from "../../../../hooks/useProcessData";
import { useParams } from "react-router-dom";
import { useProcessParts } from "../../../../hooks/useProcessParts";
import { useProcessObservations } from "../../../../hooks/useProcessObservations";
import { useMutation, useQueryClient } from "react-query";
import { ModalAddPart } from "./components/ModalAddPart";
import { ModalConfirmRemovePart } from "./components/ModalConfirmRemovePart";
import { postProcessObservations } from "../../../../api/services/processObservations/processObservations";
import { Observation } from "./components/Observation";
import { autocompleteAssuntos } from "../../../../api/services/autocompleteAssuntos/autocompleteAssuntos";
import { getProcessoAssuntos } from "../../../../api/services/assuntos/assuntos";
import { useProcessRelevance } from "../../../../hooks/useProcessRelevance";
import { useProcessSecretariesSelect } from "../../../../hooks/useProcessSecretaries";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import toast from "react-hot-toast";
import {
  getProcessData,
  patchProcessData,
} from "../../../../api/services/processData/processData";
import { convertToDecimal } from "../../../../utils/convertToDecimal.util";
import { Process } from "../../../../api/services/processParts/processParts.interface";
import { SharedState } from "../../../../context/SharedContext";

const RegisterProcess = () => {
  const { user } = SharedState();
  const queryClient = useQueryClient();
  const { processId } = useParams();
  const { processData, isLoadingProcessData } = useProcessData(processId);
  const { processParts, isLoadingProcessParts } = useProcessParts(processId);
  const { processSecretariesList, isLoadingProcessSecretariesList } =
    useProcessSecretariesSelect();
  const { processRelevanceList, loadingProcessRelevanceResponseList } =
    useProcessRelevance();
  const { processObservations, isLoadingProcessObservationss } =
    useProcessObservations(processId);
  const [showModalAddPart, setShowModalAddPart] = useState(false);
  const [showModalConfirmRemovePart, setShowModalConfirmRemovePart] = useState<{
    open?: boolean;
    partId: number;
  }>({
    open: false,
    partId: 0,
  });

  const [isFisicoToogle, setIsFisicoToogle] = useState(false);
  const [assuntosList, setAssuntosList] = useState([]);

console.log('processData', processData);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
    setValue,
  } = useForm<SubmitProcess>({
    mode: "onChange",
  });

  const [updateCheckPart, setUpdateCheckPart] = useState<number>(1);

  const handlePartCheck = async (
    index: number,
    part: Process[],
    txPolo: string
  ) => {
    const partList = part.filter((p) => p.txPolo == txPolo);
    await tooglePartCheck(index, partList).then((res) => {
      if (res) setUpdateCheckPart((oldValue) => oldValue + 1);
    });
  };

  async function tooglePartCheck(index: number, part: Process[]) {
    part.map((p) => {
      p.isPrincipal = false;
    });
    part[index].isPrincipal = true;
    return true;
  }



  useEffect(() => {
    if (processData && processData.data) {

      setUpdateCheckPart((oldValue) => oldValue + 1);
      handleOptions();
      setIsFisicoToogle(processData.data.isFisico);
      GetProcessData(processData.data.idProcesso_Relacionado);
    }
  }, [processData]);

  useEffect(() => {
    if (assuntosList) {
      reset((formValues) => ({
        ...formValues,
        txAssunto: assuntosList as any,
      }));
    }
  }, [assuntosList]);

  const handleOptions = async () => {
    const processoAssunto = await getProcessoAssuntos(processId).then(
      (o: any) => o
    );
    setAssuntosList(processoAssunto);
  };

  const GetProcessData = async (processId?: string) => {
    if (processId)
      await getProcessData(processId).then((response) => {
        setValue("relatedProcess", {
          label:
            response.data.txNumeroFormatado +
            `(${response.data.nuInstancia}º grau | ${response.data.txSigla})`,
          value: response.data.id,
        });
      });
  };

  const {
    register: registerObservation,
    handleSubmit: handleSubmitObservation,
    reset: resetObservationForm,
    formState: { isValid: isValidObservation, errors: errorsObservation },
  } = useForm<SubmitObservationProcess>({
    mode: "onChange",
  });

  const [valor, setValor] = useState<number>();

  const handleIsFisicoCheckbox = () => {
    setIsFisicoToogle(!isFisicoToogle);
  };

  const handleChange = (e: any) => {
    const valorNumerico: number = e.target.value.replace(/\D/g, "");
    setValor(valorNumerico);
    setValue("processValue", String(valorNumerico / 100));
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleToast = (response: boolean) => {
    response
      ? toast("Processo Atualizado com Sucesso", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      })
      : toast.error("Erro ao Atualizar Processo", {
        icon: "😥",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
  };

  const onSubmit: SubmitHandler<SubmitProcess> = (params) => {
    const txNumero = params.txNumeroFormatado.replace(/[^a-zA-Z0-9 ]/g, "");
    const vaProcesso = convertToDecimal(params.processValue);
    const assuntosList = params.txAssunto.map((assunto) => ({
      idAssunto: assunto.value,
    }));
    const partsList = processParts.data.map((part) => ({
      idParte: part.idParte,
      txPolo: part.txPolo,
      isPrincipal: part.isPrincipal,
      idUsuarioCadastro: part.idUsuarioCadastro,
    }));

    patchProcessData({
      idProcesso: processId,
      idAto: processData.data.idAto,
      idUsuarioCadastro: user["Jvris.User.Id"],
      idSistemaProcessual: params.idSistemaProcessual.value,
      idTribunal: params.idTribunal.value,
      nuInstancia: params.nuInstancia.value,
      txNumeroFormatado: params.txNumeroFormatado,
      txNumero: txNumero,
      txTipo: processData.data.txTipo,
      txRelevancia: params.relevancias.value,
      idProcesso_Relacionado: params.relatedProcess?.value,
      vaProcesso: vaProcesso,
      isFisico: params.isFisico,
      lsProcessoAssunto: assuntosList,
      lsProcessoParte: partsList,
    }).then((response) => {
      if (response.status == "OK") {
        handleToast(true);
      } else {
        handleToast(false);
      }
    });
  };

  // TODO: colocar validação no campo de processNumber

  const {
    mutate,
    data: responseObservation,
    isLoading,
  } = useMutation(postProcessObservations, {
    onSuccess: () => {
      queryClient.invalidateQueries(`processObservations-${processId}`);
      resetObservationForm({
        txObservacao: "",
      });
    },
  });

  const onSubmitProcessObservation: SubmitHandler<
    SubmitObservationProcess
  > = async (params) => {
    mutate({
      idProcesso: +processId!,
      txObservacao: params.txObservacao,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  const loadOptionsSpecials = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 5) {
      callback(null);
    } else {
      autocompleteSpecials({ txNumero: inputValue }).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
            label:
              atc.txNumeroFormatado +
              `(${atc.nuInstancia}º grau | ${atc.txSigla})`,
            value: atc.id,
          }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  const loadOptionsAssuntos = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 3) {
      callback(null);
    } else {
      autocompleteAssuntos({ txAssunto: inputValue }).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
            label: atc.txAssunto,
            value: atc.id,
          }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  return (
    <>
      <PageTitle
        pageTitle="CADASTRO DE PROCESSOSsssss"
        pageIcon={<S.PageIcon weight="fill" />}
      />

      {showModalAddPart && (
        <ModalAddPart
          processId={processId}
          setShowModalAddPart={setShowModalAddPart}
        />
      )}

      {showModalConfirmRemovePart.open && (
        <ModalConfirmRemovePart
          setShowModalConfirmRemovePart={setShowModalConfirmRemovePart}
          processId={processId}
          partId={showModalConfirmRemovePart.partId}
        />
      )}

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Dados Gerais</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Sistema Processual:</S.FieldTitle>
              {!isLoadingProcessData && !isLoadingProcessSecretariesList ? (
                <Controller
                  name="idSistemaProcessual"
                  control={control}
                  defaultValue={{
                    label: processData.data ? processData.data.txSistemaProcessual : null,
                    value: processData.data ? processData.data.idSistemaProcessual : null,
                  }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o sistema processual"
                      {...field}
                      defaultValue={{
                        label: processData.data ? processData.data.txSistemaProcessual : null,
                        value: processData.data ? processData.data.idSistemaProcessual : null,
                      }}
                      options={processSecretariesList}
                      isClearable={false}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Tribunal:</S.FieldTitle>
              {!isLoadingProcessData ? (
                <Controller
                  name="idTribunal"
                  control={control}
                  defaultValue={{
                    label: processData.data ? processData.data.txTribunal : null,
                    value: processData.data ? processData.data.idTribunal : null,
                  }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione o Tribunal"
                      {...field}
                      defaultValue={{
                        label: processData.data ? processData.data.txTribunal : null,
                        value: processData.data ? processData.data.idTribunal : null,
                      }}
                      isSearchable={false}
                      isDisabled={true}
                      isClearable={false}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Instância:</S.FieldTitle>
              {!isLoadingProcessData ? (
                <Controller
                  name="nuInstancia"
                  control={control}
                  defaultValue={{
                    label: processData.data ? processData.data.nuInstancia + "ª" : null,
                    value: processData.data ? processData.data.nuInstancia : null,
                  }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione a Instância"
                      {...field}
                      defaultValue={{
                        label: processData.data ? processData.data.nuInstancia + "ª" : null,
                        value: processData.data ? processData.data.nuInstancia : null,
                      }}
                      isSearchable={false}
                      isDisabled={true}
                      isClearable={false}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Número do Processo:</S.FieldTitle>
              {!isLoadingProcessData ? (
                <S.TextInput
                  type="text"
                  placeholder="Número do processo"
                  defaultValue={processData.data ? processData.data.txNumeroFormatado : null}
                  {...register("txNumeroFormatado")}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Relevância:</S.FieldTitle>
              {!isLoadingProcessData && !loadingProcessRelevanceResponseList ? (
                <Controller
                  name="relevancias"
                  control={control}
                  defaultValue={{
                    label: processData.data ? processData.data.txRelevancia : null,
                    value: processData.data ? String(
                      processRelevanceList.find(
                        (v) => v.label === processData.data.txRelevancia
                      ).value
                    ) : null,
                  }}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione a Relevância"
                      {...field}
                      defaultValue={{
                        label: processData.data ? processData.data.txRelevancia : null,
                        value: processData.data ? processRelevanceList.find(
                          (v) => v.label === processData.data.txRelevancia
                        ).value : null,
                      }}
                      options={processRelevanceList}
                      isClearable={false}
                    />
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Processo Relacionado:</S.FieldTitle>
              <Controller
                name="relatedProcess"
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
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Assuntos:</S.FieldTitle>
              <Controller
                name="txAssunto"
                control={control}
                render={({ field }) => (
                  <S.CustomAutocomplete
                    placeholder="Digite no mínimo 3 digitos iniciais do assunto"
                    cacheOptions={true}
                    loadOptions={loadOptionsAssuntos}
                    defaultOptions
                    noOptionsMessage={() => "Assunto não encontrado"}
                    isClearable={false}
                    isMulti={true}
                    {...field}
                  />
                )}
              />
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Valor do Processo (R$):</S.FieldTitle>
              {!isLoadingProcessData ? (
                <S.TextInput
                  type="text"
                  placeholder="Digite o valor do processo"
                  value={formatarNumero(
                    valor || processData.data ? processData.data.vaProcesso * 100 : 0
                  )}
                  {...register("processValue")}
                  onChange={handleChange}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Físico: *</S.FieldTitle>
              {!isLoadingProcessData ? (
                <Controller
                  name="isFisico"
                  control={control}
                  defaultValue={processData.data ? processData.data.isFisico : false}
                  render={({ field }) => (
                    <S.RadioButtonContainer htmlFor="isFisico">
                      <S.RadioButtonLabel value={isFisicoToogle}>
                        {isFisicoToogle ? "SIM" : "NÃO"}
                      </S.RadioButtonLabel>
                      <S.ToggleButton
                        {...register("isFisico")}
                        checked={isFisicoToogle}
                        onChange={() => {
                          handleIsFisicoCheckbox();
                        }}
                      />
                    </S.RadioButtonContainer>
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>
      </S.Form>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Partes</S.TitleSection>
          <S.AddPartButton
            onClick={() => setShowModalAddPart(!showModalAddPart)}
          >
            Adicionar Parte
          </S.AddPartButton>
        </S.TitleSectionContainer>
        <S.ContentSection>
          {!isLoadingProcessParts ? (
            processParts!.data?.filter((pt) => pt.txPolo === "A").length > 0 ? (
              <S.ContainerTable>
                <S.Title>Polo Ativos</S.Title>
                <S.Table>
                  <thead>
                    <S.RowTable>
                      <th>NOME</th>
                      <th>CPF/CNPJ</th>
                      <th>AÇÕES</th>
                    </S.RowTable>
                  </thead>
                  <tbody>
                    {processParts!.data
                      .filter((pt) => pt.txPolo === "A")
                      .map((part, index) => (
                        <S.RowTable key={part.id}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            {updateCheckPart && (
                              <S.isPrincipalPartButton>
                                {part.isPrincipal ? (
                                  <S.CheckIcon
                                    weight="fill"
                                    alt="Principal"
                                    onClick={() => {
                                      handlePartCheck(
                                        index,
                                        processParts.data,
                                        part.txPolo
                                      );
                                    }}
                                  />
                                ) : (
                                  <S.MinusIcon
                                    weight="bold"
                                    alt="Principal"
                                    onClick={() => {
                                      handlePartCheck(
                                        index,
                                        processParts.data,
                                        part.txPolo
                                      );
                                    }}
                                  />
                                )}
                              </S.isPrincipalPartButton>
                            )}
                            <S.RemovePartButton
                              onClick={async () =>
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.id,
                                })
                              }
                            >
                              <S.RemoveIcon weight="fill" alt="Excluir Parte" />
                            </S.RemovePartButton>
                          </td>
                        </S.RowTable>
                      ))}
                  </tbody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.ContainerTable>
                <S.Title>Polo Ativo</S.Title>
                <S.WarningNotFound>
                  Nenhum registro encontrado.
                </S.WarningNotFound>
              </S.ContainerTable>
            )
          ) : (
            <S.LoadingSpinner />
          )}

          {!isLoadingProcessParts ? (
            processParts!.data?.filter((pt) => pt.txPolo === "P").length > 0 ? (
              <S.ContainerTable>
                <S.Title>Polo Passivo</S.Title>
                <S.Table>
                  <thead>
                    <S.RowTable>
                      <th>NOME</th>
                      <th>CPF/CNPJ</th>
                      <th>AÇÕES</th>
                    </S.RowTable>
                  </thead>
                  <tbody>
                    {processParts!.data
                      .filter((pt) => pt.txPolo === "P")
                      .map((part, index) => (
                        <S.RowTable key={part.id}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.isPrincipalPartButton>
                              {part.isPrincipal ? (
                                <S.CheckIcon
                                  weight="fill"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(
                                      index,
                                      processParts.data,
                                      part.txPolo
                                    );
                                  }}
                                />
                              ) : (
                                <S.MinusIcon
                                  weight="bold"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(
                                      index,
                                      processParts.data,
                                      part.txPolo
                                    );
                                  }}
                                />
                              )}
                            </S.isPrincipalPartButton>
                            <S.RemovePartButton
                              onClick={async () =>
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.id,
                                })
                              }
                            >
                              <S.RemoveIcon weight="fill" alt="Excluir Parte" />
                            </S.RemovePartButton>
                          </td>
                        </S.RowTable>
                      ))}
                  </tbody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.ContainerTable>
                <S.Title>Polo Passivo</S.Title>
                <S.WarningNotFound>
                  Nenhum registro encontrado.
                </S.WarningNotFound>
              </S.ContainerTable>
            )
          ) : (
            <S.LoadingSpinner />
          )}

          {!isLoadingProcessParts ? (
            processParts!.data?.filter((pt) => pt.txPolo === "I").length > 0 ? (
              <S.ContainerTable>
                <S.Title>Interessados(as)</S.Title>
                <S.Table>
                  <thead>
                    <S.RowTable>
                      <th>NOME</th>
                      <th>CPF/CNPJ</th>
                      <th>AÇÕES</th>
                    </S.RowTable>
                  </thead>
                  <tbody>
                    {processParts!.data
                      .filter((pt) => pt.txPolo === "I")
                      .map((part) => (
                        <S.RowTable key={part.id}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () =>
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.id,
                                })
                              }
                            >
                              <S.RemoveIcon weight="fill" alt="Excluir Parte" />
                            </S.RemovePartButton>
                          </td>
                        </S.RowTable>
                      ))}
                  </tbody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.ContainerTable>
                <S.Title>Interessados(as)</S.Title>
                <S.WarningNotFound>
                  Nenhum registro encontrado.
                </S.WarningNotFound>
              </S.ContainerTable>
            )
          ) : (
            <S.LoadingSpinner />
          )}

          {!isLoadingProcessParts ? (
            processParts!.data?.filter((pt) => pt.txPolo === "D").length > 0 ? (
              <S.ContainerTable>
                <S.Title>Advogados(as)</S.Title>
                <S.Table>
                  <thead>
                    <S.RowTable>
                      <th>NOME</th>
                      <th>CPF/CNPJ</th>
                      <th>AÇÕES</th>
                    </S.RowTable>
                  </thead>
                  <tbody>
                    {processParts!.data
                      .filter((pt) => pt.txPolo === "D")
                      .map((part) => (
                        <S.RowTable key={part.id}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () =>
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.id,
                                })
                              }
                            >
                              <S.RemoveIcon weight="fill" alt="Excluir Parte" />
                            </S.RemovePartButton>
                          </td>
                        </S.RowTable>
                      ))}
                  </tbody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.ContainerTable>
                <S.Title>Advogados(as)</S.Title>
                <S.WarningNotFound>
                  Nenhum registro encontrado.
                </S.WarningNotFound>
              </S.ContainerTable>
            )
          ) : (
            <S.LoadingSpinner />
          )}
        </S.ContentSection>
        <S.ContainerSubmitObservation>
          <S.SubmitObservationForm
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Editar Processo
          </S.SubmitObservationForm>
          {isLoading && <S.LoadingSpinnerObservation />}
        </S.ContainerSubmitObservation>
      </S.Section>

      <S.Section>
        <S.TitleSectionContainer>
          <S.TitleSection>Consulta e adição de observação</S.TitleSection>
        </S.TitleSectionContainer>

        {!isLoadingProcessObservationss ? (
          <S.ObservationContentSection>
            {processObservations.data ? (
              processObservations.data?.map((po) => (
                <Observation
                  observationId={po.id}
                  processId={processId!}
                  key={po.id}
                  name={po.txUsuario}
                  observation={po.txObservacao}
                  created_at={po.dtCadastro}
                  time={po.hrCadastro}
                />
              ))
            ) : (
              <S.ContainerTable>
                <S.WarningNotFound>
                  Nenhum registro encontrado.
                </S.WarningNotFound>
              </S.ContainerTable>
            )}
          </S.ObservationContentSection>
        ) : (
          <S.LoadingSpinner />
        )}

        <S.ContentSection>
          <S.FormObservation
            onSubmit={handleSubmitObservation(onSubmitProcessObservation)}
          >
            <S.TextAreaInput
              minLength={2}
              maxLength={1000}
              placeholder="Digite aqui uma observação de no máximo 1000 caracteres."
              {...registerObservation("txObservacao", {
                maxLength: 1000,
                minLength: 2,
                required: true,
              })}
            />
            <S.WarningMessage>{responseObservation?.message}</S.WarningMessage>
            <S.ContainerSubmitObservation>
              <S.SubmitObservationForm
                type="submit"
                disabled={!isValidObservation}
              >
                Adicionar Observação
              </S.SubmitObservationForm>
              {isLoading && <S.LoadingSpinnerObservation />}
            </S.ContainerSubmitObservation>
          </S.FormObservation>
        </S.ContentSection>
      </S.Section>
    </>
  );
};

export default RegisterProcess;

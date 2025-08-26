import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useAtosService from "../../../../api/services/atos/atos";
import { autocompleteAssuntos } from "../../../../api/services/autocompleteAssuntos/autocompleteAssuntos";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { postProcessData } from "../../../../api/services/processData/processData";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useProcessRelevance } from "../../../../hooks/useProcessRelevance";
import { useProcessSecretariesSelect } from "../../../../hooks/useProcessSecretaries";
import { ModalAddPart } from "./components/ModalAddPart";
import { ModalConfirmRemovePart } from "./components/ModalConfirmRemovePart";
import {
  SubmitObservationProcess,
  SubmitProcess,
} from "./interfaces/register-process.interface";
import * as S from "./styled";

const CadastroProcessos = () => {
  const { get: getAto, ato } = useAtosService();
  const { processSecretariesList, isLoadingProcessSecretariesList } =
    useProcessSecretariesSelect();
  const { processRelevanceList, loadingProcessRelevanceResponseList } =
    useProcessRelevance();

  const [showModalAddPart, setShowModalAddPart] = useState(false);
  const [showModalConfirmRemovePart, setShowModalConfirmRemovePart] = useState<{
    open?: boolean;
    partId: number;
  }>({
    open: false,
    partId: 0,
  });
  const [vaProcesso, setVaProcesso] = useState(null);
  const [isFisicoToogle, setIsFisicoToogle] = useState(false);
  const [isSigilosoToogle, setIsSigilosoToogle] = useState(false);
  const [assuntosList, setAssuntosList] = useState([]);
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const location = useLocation();
  const [lsPartes, setLsPartes] = useState<any[]>([]);

  useEffect(() => {
    getAto(location.state.idAto);
  }, [location.state.idAto]);

  
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

  const handlePartCheck = async (index: number) => {
    setLsPartes((prev) => {
      return prev.map((part: any, i: number) => {
        if (i === index) {
          return {
            ...part,
            isPrincipal: !part.isPrincipal,
          };
        } else {
          return part;
        }
      });
    });
  };

  useEffect(() => {
    if (assuntosList) {
      reset((formValues) => ({
        ...formValues,
        txAssunto: assuntosList as any,
      }));
    }
  }, [assuntosList]);

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

  const handleIsSigilosoCheckbox = () => {
    setIsSigilosoToogle(!isSigilosoToogle);
  };

  const handleVaProcesso = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setVaProcesso(valorNumerico);
    setValue("vaProcesso", (+valorNumerico / 100).toString());
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  function formatarVaProcesso(numero) {
    let numeroLimpo = numero.replace(/[^0-9,.]/g, "");

    numeroLimpo = numeroLimpo.replace(",", ".");

    numeroLimpo = numeroLimpo.replace(/\.(?=.*\.)/g, "");

    let numeroFormatado = parseFloat(numeroLimpo).toFixed(2);

    return numeroFormatado;
  }

  const handleToast = (response: boolean) => {
    console.log(response);

    response
      ? toast("Processo Salvo com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error("Erro ao Salvar Processo", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
  };

  //console.log(lsPartes);

  const onSubmit: SubmitHandler<SubmitProcess> = (params) => {
    const txNumero = ato.txNumeroFormatado.replace(/[^a-zA-Z0-9 ]/g, "");
    const assuntosList = params.txAssunto.map((assunto) => ({
      idAssunto: assunto.value,
    }));

    if (!params.idSistemaProcessual) {
      HotToastWarning("Selecione o sistema processual");
      return;
    }
    // if (!params.txNumeroFormatado) {
    //   HotToastWarning("Digite o número do processo");
    //   return;
    // }
    if (!params.relevancias) {
      HotToastWarning("Selecione a relevância do processo");
      return;
    }
    if (!params.txAssunto.length) {
      HotToastWarning("Selecione o assunto do processo");
      return;
    }

    // console.log(
    //   params.vaProcesso ? formatarVaProcesso(params.vaProcesso) : null
    // );

    postProcessData({
      // id: 0,
      idAto: ato.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      idSistemaProcessual: params.idSistemaProcessual.value,
      idTribunal: params.idTribunal ? params.idTribunal.value : ato.idTribunal,
      nuInstancia: params.nuInstancia
        ? params.nuInstancia.value
        : ato.nuInstancia,
      txNumeroFormatado: ato.txNumeroFormatado,
      // txNumero: txNumero,
      txTipo:
        ato.idSistemaProcessual == 7 || ato.idSistemaProcessual == 13
          ? "A"
          : "J",
      txRelevancia: params.relevancias.value,
      idProcesso_Relacionado: params.relatedProcess?.value,
      vaProcesso: params.vaProcesso
        ? +formatarVaProcesso(params.vaProcesso)
        : null,
      isFisico: params.isFisico,
      isSigiloso: ato?.idSistemaProcessual == 7 && params.isSigiloso,
      lsProcessoAssunto: assuntosList,
      lsProcessoParte: lsPartes,
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast(true);
        } else {
          handleToast(false);
        }
      })
      .catch((error) => {
        handleToast(false);
      });
  };

  // TODO: colocar validação no campo de processNumber

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
        pageTitle="CADASTRO DE PROCESSOS"
        pageIcon={<S.PageIcon weight="fill" />}
      />

      {showModalAddPart && (
        <ModalAddPart
          setPartesLS={setLsPartes}
          setShowModalAddPart={setShowModalAddPart}
        />
      )}

      {showModalConfirmRemovePart.open && (
        <ModalConfirmRemovePart
          setShowModalConfirmRemovePart={setShowModalConfirmRemovePart}
          setLsPartes={setLsPartes}
          partId={showModalConfirmRemovePart.partId}
        />
      )}

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Dados Gerais</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
          <S.SectionDataPartiesCapsule>
              <S.SectionTitle>Processo:</S.SectionTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txNumeroFormatado : ""}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
            <S.ContainerField>
              <S.FieldTitle>Sistema Processual:</S.FieldTitle>
              {ato && !isLoadingProcessSecretariesList ? (
                <Controller
                  name="idSistemaProcessual"
                  control={control}
                  defaultValue={{
                    label: ato.txSistemaProcessual,
                    value: ato.idSistemaProcessual,
                  }}
                  render={({ field }) => (
                    <S.CustomSelect
                      isDisabled
                      placeholder="Selecione o sistema processual"
                      {...field}
                      defaultValue={
                        ato && {
                          label: ato.txSistemaProcessual,
                          value: ato.idSistemaProcessual,
                        }
                      }
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
              <S.FieldTitle>Número do Processo:</S.FieldTitle>

              {ato && (
                <S.TextInput
                  disabled
                  type="text"
                  placeholder="Número do processo"
                  defaultValue={ato.txNumeroFormatado}
                  {...register("txNumeroFormatado")}
                />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Relevância:</S.FieldTitle>
              {!loadingProcessRelevanceResponseList ? (
                <Controller
                  name="relevancias"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione a Relevância"
                      {...field}
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

              <S.TextInput
                type="text"
                placeholder="Digite o valor do processo"
                value={formatarNumero(vaProcesso)}
                {...register("vaProcesso")}
                onChange={handleVaProcesso}
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Físico: *</S.FieldTitle>

              <Controller
                name="isFisico"
                control={control}
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
            </S.ContainerField>
            {ato?.idSistemaProcessual == 7 && (
              <S.ContainerField>
                <S.FieldTitle>Sigiloso: *</S.FieldTitle>

                <Controller
                  name="isSigiloso"
                  control={control}
                  render={({ field }) => (
                    <S.RadioButtonContainer htmlFor="isSigiloso">
                      <S.RadioButtonLabel value={isSigilosoToogle}>
                        {isSigilosoToogle ? "SIM" : "NÃO"}
                      </S.RadioButtonLabel>
                      <S.ToggleButton
                        {...register("isSigiloso")}
                        checked={isSigilosoToogle}
                        onChange={() => {
                          handleIsSigilosoCheckbox();
                        }}
                      />
                    </S.RadioButtonContainer>
                  )}
                />
              </S.ContainerField>
            )}
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
          {lsPartes ? (
            lsPartes.filter((pt) => pt.txPolo === "A").length > 0 ? (
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
                    {lsPartes
                      .filter((pt) => pt.txPolo === "A")
                      .map((part, index) => (
                        <S.RowTable key={part.idParte}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.isPrincipalPartButton>
                              {part.isPrincipal ? (
                                <S.CheckIcon
                                  weight="fill"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(index);
                                  }}
                                />
                              ) : (
                                <S.MinusIcon
                                  weight="bold"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(index);
                                  }}
                                />
                              )}
                            </S.isPrincipalPartButton>

                            <S.RemovePartButton
                              onClick={async () => {
                                //console.log(part.idParte);
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.idParte,
                                });
                              }}
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

          {lsPartes ? (
            lsPartes.filter((pt) => pt.txPolo === "P").length > 0 ? (
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
                    {lsPartes
                      .filter((pt) => pt.txPolo === "P")
                      .map((part, index) => (
                        <S.RowTable key={part.idParte}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.isPrincipalPartButton>
                              {part.isPrincipal ? (
                                <S.CheckIcon
                                  weight="fill"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(index);
                                  }}
                                />
                              ) : (
                                <S.MinusIcon
                                  weight="bold"
                                  alt="Principal"
                                  onClick={() => {
                                    handlePartCheck(index);
                                  }}
                                />
                              )}
                            </S.isPrincipalPartButton>
                            <S.RemovePartButton
                              onClick={async () => {
                                //console.log(part.idParte);
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.idParte,
                                });
                              }}
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

          {lsPartes ? (
            lsPartes.filter((pt) => pt.txPolo === "I").length > 0 ? (
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
                    {lsPartes
                      .filter((pt) => pt.txPolo === "I")
                      .map((part) => (
                        <S.RowTable key={part.idParte}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () => {
                                //console.log(part.idParte);
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.idParte,
                                });
                              }}
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

          {lsPartes ? (
            lsPartes.filter((pt) => pt.txPolo === "D").length > 0 ? (
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
                    {lsPartes
                      .filter((pt) => pt.txPolo === "D")
                      .map((part) => (
                        <S.RowTable key={part.idParte}>
                          <td>{part.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () => {
                                //console.log(part.idParte);
                                setShowModalConfirmRemovePart({
                                  open: true,
                                  partId: part.idParte,
                                });
                              }}
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
      </S.Section>

      <S.Section>
        <S.ContentSection>
          <S.FormObservation>
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
            <S.ContainerSubmitObservation>
              <S.SubmitObservationForm
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Salvar Processo
              </S.SubmitObservationForm>
            </S.ContainerSubmitObservation>
          </S.FormObservation>
        </S.ContentSection>
      </S.Section>
    </>
  );
};

export default CadastroProcessos;

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
// import * as MockData from "./mockData";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAtosService from "../../../../api/services/atos/atos";
import { autocompleteAssuntos } from "../../../../api/services/autocompleteAssuntos/autocompleteAssuntos";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { postProcessData } from "../../../../api/services/processData/processData";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
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
  const { idAto } = useParams();

  useEffect(() => {
    getAto(+idAto);
  }, [idAto]);

  const {
    register: registerObservation,
    handleSubmit: handleSubmitObservation,
    reset: resetObservationForm,
  } = useForm<SubmitObservationProcess>({
    mode: "onChange",
  });

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

  const [lsPartes, setLsPartes] = useState<any[]>([]);

  const handleTogglePrincipalParte = (idParte: number, polo: "A" | "P") => {
    setLsPartes((prev) => {
      const partesDoPolo = prev.filter((p) => p.txPolo === polo);

      const parteClicada = prev.find((p) => p.idParte === idParte);
      const estaMarcado = parteClicada?.isPrincipal;

      // Nova lista com todos os do polo, atualizando quem é principal
      return prev
        .map((p) => {
          if (p.txPolo !== polo) return p;

          if (p.idParte === idParte) {
            // Inverte a seleção da parte clicada
            return { ...p, isPrincipal: !p.isPrincipal };
          }

          // Se a parte clicada será principal, os demais do mesmo polo devem ser desmarcados
          if (!estaMarcado) {
            return { ...p, isPrincipal: false };
          }

          return p;
        })
        .map((p) => {
          // Garante que ao desmarcar a principal, uma nova será marcada
          if (p.txPolo === polo && !p.isPrincipal) {
            const aindaTemPrincipal = prev.some(
              (x) => x.txPolo === polo && x.idParte !== idParte && x.isPrincipal
            );

            if (!aindaTemPrincipal) {
              const candidatos = prev.filter(
                (x) => x.txPolo === polo && x.idParte !== idParte
              );
              const primeiroDisponivel = candidatos[0];
              if (
                primeiroDisponivel &&
                p.idParte === primeiroDisponivel.idParte
              ) {
                return { ...p, isPrincipal: true };
              }
            }
          }
          return p;
        });
    });
  };

  useEffect(() => {
    const partesAtualizadas = [...lsPartes];
    let atualizou = false;

    const garantirPrincipal = (polo: "A" | "P") => {
      const partesDoPolo = partesAtualizadas.filter((p) => p.txPolo === polo);
      const temPrincipal = partesDoPolo.some((p) => p.isPrincipal);

      if (!temPrincipal && partesDoPolo.length > 0) {
        const index = partesAtualizadas.findIndex(
          (p) => p.txPolo === polo && p.idParte === partesDoPolo[0].idParte
        );
        if (index !== -1) {
          partesAtualizadas[index] = {
            ...partesAtualizadas[index],
            isPrincipal: true,
          };
          atualizou = true;
        }
      }
    };

    garantirPrincipal("A");
    garantirPrincipal("P");

    if (atualizou) {
      setLsPartes(partesAtualizadas);
    }
  }, [lsPartes]);

  useEffect(() => {
    if (assuntosList) {
      reset((formValues) => ({
        ...formValues,
        txAssunto: assuntosList as any,
      }));
    }
  }, [assuntosList]);

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
    response
      ? toast(
          "Processo salvo com sucesso. Aguarde enquanto está sendo redirecionado para o dashboard",
          {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#81c784",
              color: "#fff",
              fontSize: "30px",
            },
          }
        )
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

  const [invalidSalvar, setInvalidSalvar] = useState(false);

  const onSubmit: SubmitHandler<SubmitProcess> = (params) => {
    const txNumero = ato.txNumeroFormatado.replace(/[^a-zA-Z0-9 ]/g, "");
    const assuntosList = params.txAssunto.map((assunto) => ({
      idAssunto: assunto.value,
    }));

    if (!params.relevancias) {
      HotToastWarning("Selecione a relevância do processo");
      return;
    }

    if (!params.txAssunto.length) {
      HotToastWarning("Selecione o assunto do processo");
      return;
    }

    // if (lsPartes.length === 0) {
    //   HotToastWarning("Adicione pelo menos uma parte ao processo");
    //   return;
    // }

    const temAtivo = lsPartes.some((parte) => parte.txPolo === "A");
    const temPassivo = lsPartes.some((parte) => parte.txPolo === "P");

    if (!temAtivo || !temPassivo) {
      HotToastWarning(
        "O processo deve ter pelo menos uma parte ativa e uma parte passiva"
      );
      return;
    }

    setInvalidSalvar(true);

    postProcessData({
      // id: 0,
      idAto: ato.id,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      idSistemaProcessual: ato?.idSistemaProcessual,
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
          setTimeout(() => {
            // Redirecionar ou realizar outra ação após 2 segundos
            window.location.href = `/dashboard/gerenciamento/operador`;
          }, 2000);
        } else {
          setInvalidSalvar(false);
          handleToast(false);
        }
      })
      .catch((error) => {
        handleToast(false);
        setInvalidSalvar(false);
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
          <S.ContentSectionFirstRow
            numElements={ato?.idSistemaProcessual == 7 ? 3 : 5}
          >
            <S.SectionDataPartiesCapsule>
              <S.FieldTitle>Sistema Processual</S.FieldTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txSistemaProcessual : "-"}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>
            {ato?.idSistemaProcessual != 7 && (
              <>
                <S.SectionDataPartiesCapsule>
                  <S.FieldTitle>Tribunal</S.FieldTitle>
                  <S.SectionDataContainer>
                    <S.SectionDataInfo>
                      {ato ? ato.txOrgaojulgador : "-"}
                    </S.SectionDataInfo>
                  </S.SectionDataContainer>
                </S.SectionDataPartiesCapsule>
                <S.SectionDataPartiesCapsule style={{ maxWidth: "5rem" }}>
                  <S.FieldTitle>Instância</S.FieldTitle>
                  <S.SectionDataContainer>
                    <S.SectionDataInfo>
                      {ato?.nuInstancia ? `${ato.nuInstancia}ª` : "-"}
                    </S.SectionDataInfo>
                  </S.SectionDataContainer>
                </S.SectionDataPartiesCapsule>
              </>
            )}
            <S.SectionDataPartiesCapsule>
              <S.FieldTitle>Número do Processo</S.FieldTitle>
              <S.SectionDataContainer>
                <S.SectionDataInfo>
                  {ato ? ato.txNumeroFormatado : "-"}
                </S.SectionDataInfo>
              </S.SectionDataContainer>
            </S.SectionDataPartiesCapsule>

            <S.ContainerField>
              <S.FieldTitle>Relevância *:</S.FieldTitle>
              {!loadingProcessRelevanceResponseList ? (
                <Controller
                  name="relevancias"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Selecione a relevância"
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
          </S.ContentSectionFirstRow>

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
              <S.FieldTitle>Assuntos *:</S.FieldTitle>
              <Controller
                name="txAssunto"
                control={control}
                render={({ field }) => (
                  <S.CustomAutocomplete
                    placeholder="Digite mais de 3 caracteres"
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
        <S.ContentSection style={{ flexWrap: "wrap" }}>
          {lsPartes ? (
            lsPartes.filter((pt) => pt.txPolo === "A").length > 0 ? (
              <S.ContainerTable>
                <S.Title>Polo Ativo</S.Title>
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
                          <td>{part.parte.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.isPrincipalPartButton>
                              {part.isPrincipal ? (
                                <S.CheckIcon
                                  weight="fill"
                                  alt="Principal"
                                  onClick={() => {
                                    handleTogglePrincipalParte(
                                      part.idParte,
                                      "A"
                                    );
                                  }}
                                />
                              ) : (
                                <S.MinusIcon
                                  weight="bold"
                                  alt="Principal"
                                  onClick={() => {
                                    handleTogglePrincipalParte(
                                      part.idParte,
                                      "A"
                                    );
                                  }}
                                />
                              )}
                            </S.isPrincipalPartButton>

                            <S.RemovePartButton
                              onClick={async () => {
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
                          <td>{part.parte.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.isPrincipalPartButton>
                              {part.isPrincipal ? (
                                <S.CheckIcon
                                  weight="fill"
                                  alt="Principal"
                                  onClick={() => {
                                    handleTogglePrincipalParte(
                                      part.idParte,
                                      "P"
                                    );
                                  }}
                                />
                              ) : (
                                <S.MinusIcon
                                  weight="bold"
                                  alt="Principal"
                                  onClick={() => {
                                    handleTogglePrincipalParte(
                                      part.idParte,
                                      "P"
                                    );
                                  }}
                                />
                              )}
                            </S.isPrincipalPartButton>
                            <S.RemovePartButton
                              onClick={async () => {
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
                          <td>{part.parte.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () => {
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
                          <td>{part.parte.txParte}</td>
                          <td>{part.parte.txCpfCnpj}</td>
                          <td style={{ display: "flex" }}>
                            <S.RemovePartButton
                              onClick={async () => {
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
                disabled={!isValid || invalidSalvar}
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

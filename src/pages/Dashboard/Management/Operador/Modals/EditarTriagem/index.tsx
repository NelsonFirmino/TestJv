import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  getTriagem,
  getTriagensObs,
  postObs,
  updateObs,
  updateTriagensObs,
} from "../../../../../../api/services/triagens-observacoes/triagensObs";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../../components/HotToastFuncs";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../context/SharedContext";
import { useAct } from "../../../../../../hooks/useAct";
import { useSecretaries } from "../../../../../../hooks/useSecretaries";
import { useSecretariesSpecials } from "../../../../../../hooks/useSecretariesSpecials";
import { useOperadorContext } from "../../context";
import * as S from "./styled";

export interface EditarTriagemI {
  id?: number;
  idAto?: number;
  idEspecializada?: number;
  nuCodigoAviso?: string;
  idSecretaria?: number;
  isPublicar?: boolean;
  idUsuarioCadastro?: number;
  txNumeroFormatado?: string;
  txSecretaria?: string;
  txObservacao?: string;
}

const EditarTriagem = () => {
  const { user } = SharedState();
  const { setOpenEditarTriagem, processoData, openEditarTriagem, reload } =
    useOperadorContext();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid, errors },
  } = useForm<EditarTriagemI>({
    mode: "onChange",
  });

  const { mutate, data: response, isLoading } = useMutation(getTriagensObs);
  const {
    mutate: mutateTriagem,
    data: responseTriagem,
    isLoading: isLoadingTriagem,
  } = useMutation(getTriagem);

  const { act, isLoadingAct } = useAct(processoData?.idAto);

  const { secretariesList, loadingSecretariesist } = useSecretaries();

  const [secretariaSelectedOption, setSecretariaSelectedOption] = useState({
    label: "",
    value: 0,
  });

  const [especializadaSelectedOption, setEspecializadaSelectedOption] =
    useState({
      label: "",
      value: 0,
    });

  // const [obs, setObs] = useState("");

  // Configurando secretariaSelectedOption para chamada de API
  useEffect(() => {
    if (secretariesList) {
      if (act?.data?.idSecretaria) {
        setSecretariaSelectedOption(
          secretariesList?.find((data) => data.value == act?.data?.idSecretaria)
        );
      } else {
        setSecretariaSelectedOption(secretariesList[0]);
      }
    }
  }, [(!loadingSecretariesist && openEditarTriagem) || processoData]);

  const { newFormatedSpecialsList, isloadingSecretariesSpecialList } =
    useSecretariesSpecials(
      secretariaSelectedOption.value &&
        secretariaSelectedOption.value.toString()
    );

  useEffect(() => {
    if (response?.data) {
      setValue("txObservacao", response.data[0].txObservacao);
    } else {
      setValue("txObservacao", "");
    }
  }, [!isLoading && processoData]);

  useEffect(() => {
    if (responseTriagem?.data) {
      setValue("isPublicar", responseTriagem.data.isPublicar);
    } else {
      setValue("isPublicar", false);
    }
  }, [(!isLoadingTriagem && openEditarTriagem) || processoData]);

  useEffect(() => {
    if (newFormatedSpecialsList) {
      if (processoData.idEspecializada) {
        setEspecializadaSelectedOption(
          newFormatedSpecialsList?.find(
            (data) => data.value == processoData.idEspecializada
          )
        );
      } else {
        setEspecializadaSelectedOption(null);
      }
    }
  }, [(!isloadingSecretariesSpecialList && openEditarTriagem) || processoData]);

  useEffect(() => {
    if (act?.data?.idTriagem) {
      mutate({
        id: act.data.idTriagem,
        idUsuarioCadastro: user["Jvris.User.Id"],
      });
      mutateTriagem({
        id: act.data.idTriagem,
        idUsuarioCadastro: user["Jvris.User.Id"],
      });
    }
  }, [act]);

  //Início do RESET
  const resetObs = () => {
    if (response?.data) {
      setValue("txObservacao", response.data[0].txObservacao);
    } else {
      setValue("txObservacao", "");
    }
  };

  useEffect(() => {
    resetObs();
  }, [openEditarTriagem || response?.data || act?.data]);

  const resetPublicar = () => {
    if (responseTriagem?.data) {
      setValue("isPublicar", responseTriagem.data.isPublicar);
    } else {
      setValue("isPublicar", false);
    }
  };

  useEffect(() => {
    resetPublicar();
  }, [(isLoadingAct && openEditarTriagem) || act?.data]);

  const resetSecretaria = () => {
    if (secretariesList) {
      if (act?.data?.idSecretaria) {
        setSecretariaSelectedOption(
          secretariesList?.find((data) => data.value == act?.data?.idSecretaria)
        );
      } else {
        setSecretariaSelectedOption(secretariesList[0]);
      }
    }
  };

  useEffect(() => {
    resetSecretaria();
  }, [(!loadingSecretariesist && openEditarTriagem) || processoData]);

  const resetEspec = () => {
    if (newFormatedSpecialsList) {
      if (processoData.idEspecializada) {
        setEspecializadaSelectedOption(
          newFormatedSpecialsList?.find(
            (data) => data.value == processoData.idEspecializada
          )
        );
      } else {
        setEspecializadaSelectedOption(null);
      }
    }
  };

  useEffect(() => {
    resetEspec();
  }, [openEditarTriagem || processoData]);

  const onSubmit: SubmitHandler<EditarTriagemI> = async (params) => {
    updateTriagensObs({
      idTriagem: act?.data?.idTriagem,
      idAto: processoData?.idAto,
      idSecretaria: secretariaSelectedOption.value,
      idEspecializada: especializadaSelectedOption.value,
      isPublicar: params.isPublicar,
      idUsuarioCadastro: user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "OK") {
          handleToast("Edição de triagem feita com sucesso");
        } else {
          handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao editar triagem");
      });

    // Observação
    response?.data
      ? updateObs({
          id: response?.data[0].id,
          idTriagem: act?.data.idTriagem,
          txObservacao: params.txObservacao,
          idUsuarioCadastro: user["Jvris.User.Id"],
        })
          .then((response) => {
            if (response.status == "OK") {
              handleToast("Edição feita com sucesso");
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((err) => {
            handleToast("Erro ao editar triagem");
          })
      : params.txObservacao
      ? postObs({
          idTriagem: act?.data.idTriagem,
          txObservacao: params.txObservacao,
          idUsuarioCadastro: user["Jvris.User.Id"],
        })
          .then((response) => {
            if (response.status == "Created") {
              handleToast("Edição feita com sucesso");
            } else {
              handleToast(response.message, true);
            }
          })
          .catch((err) => {
            handleToast("Erro ao editar triagem");
          })
      : "";
  };

  const handleToast = (msg: string, error: boolean = false) => {
    !error ? HotToastSucess(msg) : HotToastError(msg);
    setOpenEditarTriagem(false);
    resetObs();
    resetPublicar();
    resetSecretaria();
    resetEspec();
    reload();
  };

  return (
    <BaseModal
      isOpenModal={openEditarTriagem}
      setOpenModal={setOpenEditarTriagem}
      title="Editar Triagem"
      isSelect={true}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <SM.ContentWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "20px",
            }}
          >
            <S.ContainerField>
              <S.FieldTitle>Número do Processo</S.FieldTitle>
              <S.TextInput
                defaultValue={processoData.txNumeroFormatado}
                disabled={true}
                autoFocus
              />
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>Nº do Aviso</S.FieldTitle>
              <S.TextInput
                defaultValue={processoData.nuCodigoAviso}
                disabled={true}
                autoFocus
              />
            </S.ContainerField>
            {!loadingSecretariesist && (
              <S.ContainerField>
                <S.FieldTitle>Secretaria: *</S.FieldTitle>
                <Controller
                  name="idSecretaria"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={secretariesList}
                      isLoading={loadingSecretariesist}
                      value={secretariaSelectedOption}
                      onChange={(value: any) => {
                        setSecretariaSelectedOption(value);
                        if (value != secretariaSelectedOption) {
                          setEspecializadaSelectedOption({
                            label: "",
                            value: 0,
                          });
                        }
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            {!isloadingSecretariesSpecialList && (
              <S.ContainerField>
                <S.FieldTitle>Especializada: *</S.FieldTitle>
                <Controller
                  name="idEspecializada"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      isClearable={false}
                      options={newFormatedSpecialsList}
                      isLoading={isloadingSecretariesSpecialList}
                      placeholder="Selecione a especializada"
                      value={especializadaSelectedOption}
                      onChange={(value: any) => {
                        setEspecializadaSelectedOption(value);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}
            <S.ContainerField>
              <S.ContainerFieldTextArea>
                <S.FieldTitle style={{ marginTop: "2rem" }}>
                  Observação:
                  {/* <S.LettersCounter>{obs.length} / 1000</S.LettersCounter> */}
                </S.FieldTitle>
                {!isLoading && (
                  <S.TextAreaInput
                    minLength={2}
                    maxLength={1000}
                    required={false}
                    placeholder="Digite aqui... (máximo 1000 caracteres)"
                    {...register("txObservacao", {
                      maxLength: 1000,
                      minLength: 2,
                      required: false,
                    })}
                  />
                )}
              </S.ContainerFieldTextArea>
            </S.ContainerField>
            {!isLoadingTriagem && (
              <S.ContainerField
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                  Publicar no DOE:
                </SM.ContentTitleLabel>

                <SM.ContentInputCheckbox
                  {...register("isPublicar")}
                  style={{ marginBottom: "-3px" }}
                  // defaultChecked={getValues("isPublicar")}
                  // onChange={(event: any) => {
                  //   setIsPublicar(event.target.checked);
                  // }}
                />
              </S.ContainerField>
            )}
          </SM.ContentWrapper>
          <S.ContainerSubmitButton>
            <S.SubmitButton disabled={!isValid} type="submit">
              Salvar
            </S.SubmitButton>
          </S.ContainerSubmitButton>
        </div>
      </S.Form>
    </BaseModal>
  );
};

export default EditarTriagem;

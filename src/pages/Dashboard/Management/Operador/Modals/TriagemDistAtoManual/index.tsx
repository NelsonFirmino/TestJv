import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { postTriagensObs } from "../../../../../../api/services/triagens-observacoes/triagensObs";
import { BaseModal } from "../../../../../../components/BaseModal";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../context/SharedContext";
import { useSecretaries } from "../../../../../../hooks/useSecretaries";
import { useSecretariesSpecials } from "../../../../../../hooks/useSecretariesSpecials";
import { useOperadorContext } from "../../context";
import * as S from "./styled";

export interface TriagemPostI {
  idAto?: number;
  idEspecializada?: number;
  idSecretaria?: number;
  isPublicar?: boolean;
  idUsuarioCadastro?: number;
  observacao?: string;
  txObservacao?: string;
  nuCodigoAviso?: string;
}

const TriagemDistAtoManual = () => {
  const { user } = SharedState();
  const { reload } = useOperadorContext();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm<TriagemPostI>({
    mode: "onChange",
  });

  const { openTriagem, setOpenTriagem, processoData, triagemData } =
    useOperadorContext();

  console.log("processoData", processoData);

  const [secretariaSelectedOption, setSecretariaSelectedOption] =
    useState(null);

  const [especializadaSelectedOption, setEspecializadaSelectedOption] =
    useState(null);

  const [obs, setObs] = useState("");

  // const { act, isLoadingAct } = useAct(processoData.id);

  const { secretariesList, loadingSecretariesist } = useSecretaries();

  const { newFormatedSpecialsList, isloadingSecretariesSpecialList } =
    useSecretariesSpecials(
      secretariaSelectedOption?.value &&
        secretariaSelectedOption?.value.toString()
    );

  const resetFields = () => {
    setObs("");
    setEspecializadaSelectedOption({ label: "", value: null });
    setSecretariaSelectedOption({ label: "", value: null });
  };

  const handleToast = (msg: string, error: boolean = false) => {
    !error
      ? toast(msg, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        })
      : toast.error(msg, {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
    setOpenTriagem(false);
    reload();
    resetFields();
  };

  const onSubmit: SubmitHandler<TriagemPostI> = async (params) => {
    postTriagensObs({
      idAto: processoData?.id,
      idSecretaria: secretariaSelectedOption?.value,
      idEspecializada: especializadaSelectedOption?.value,
      isPublicar: params.isPublicar,
      idUsuarioCadastro: user["Jvris.User.Id"],
    })
      .then((response) => {
        if (response.status == "Created") {
          handleToast("Triagem feita com sucesso");
        } else {
          handleToast(response.message, true);
        }
      })
      .catch((err) => {
        handleToast("Erro ao fazer triagem");
      });

    // Observação
    //   params.txObservacao
    //     ? postObs({
    //         idTriagem: processoData?.id,
    //         txObservacao: params.txObservacao,
    //       })
    //         .then((response) => {
    //           if (response.status == "Created") {
    //             handleToast("Edição feita com sucesso");
    //           } else {
    //             handleToast(response.message, true);
    //           }
    //         })
    //         .catch((err) => {
    //           handleToast("Erro ao editar triagem");
    //         })
    //     : "";
  };

  return (
    <BaseModal
      isOpenModal={openTriagem}
      setOpenModal={setOpenTriagem}
      title="Triagem e Distribuição de Ato Manual"
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

            {secretariesList && (
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
                        setEspecializadaSelectedOption(null);
                      }}
                    />
                  )}
                />
              </S.ContainerField>
            )}

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

            <S.ContainerFieldTextArea>
              <S.FieldTitle style={{ marginTop: "2rem" }}>
                Observação:
                <S.LettersCounter>{obs.length} / 1000</S.LettersCounter>
              </S.FieldTitle>
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
                defaultValue={obs}
                onChange={(event: any) => {
                  setObs(event.target.value);
                }}
              />
            </S.ContainerFieldTextArea>

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
              />
            </S.ContainerField>
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

export default TriagemDistAtoManual;

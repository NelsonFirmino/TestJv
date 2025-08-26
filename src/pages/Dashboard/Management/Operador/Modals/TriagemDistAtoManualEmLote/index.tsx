import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  postObs,
  postTriagensObsLote,
} from "../../../../../../api/services/triagens-observacoes/triagensObs";
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

const TriagemDistAtoManualEmLote = () => {
  const { user, setSelectedDataTable, setSelectedRowHashes } = SharedState();
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

  const {
    openTriagemModal,
    setOpenTriagemModal,
    processoData,
    processosData,
    triagemData,
  } = useOperadorContext();

  // States
  const [secretariaSelectedOption, setSecretariaSelectedOption] =
    useState(null);

  const [especializadaSelectedOption, setEspecializadaSelectedOption] =
    useState(null);

  const [obs, setObs] = useState("");

  const [showSelectedProcess, setShowSelectedProcess] = useState(false);

  // const { act, isLoadingAct } = useAct(processoData.id);

  const { secretariesList, loadingSecretariesist } = useSecretaries();

  const { newFormatedSpecialsList, isloadingSecretariesSpecialList } =
    useSecretariesSpecials(
      secretariaSelectedOption?.value &&
        secretariaSelectedOption?.value.toString()
    );

  const resetFields = () => {
    setObs("");
    setEspecializadaSelectedOption(null);
    setSecretariaSelectedOption(null);
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
    setOpenTriagemModal(false);
    reload();
    resetFields();
  };

  const onSubmit: SubmitHandler<TriagemPostI> = async (params) => {
    if (processosData) {
      let sucessoCount = 0;
      let erroCount = 0;

      for (const processo of processosData) {
        const idAto = processo.id;

        try {
          const response = await postTriagensObsLote({
            idAto: idAto,
            idSecretaria: secretariaSelectedOption?.value,
            idEspecializada: especializadaSelectedOption?.value,
            isPublicar: params.isPublicar,
            idUsuarioCadastro: user["Jvris.User.Id"],
          });

          if (response.status == "Created") {
            // Observação
            obs.length > 0 &&
              postObs({
                idTriagem: response?.data?.id,
                txObservacao: obs,
                idUsuarioCadastro: user["Jvris.User.Id"],
              })
                .then((responseObs) => {
                  if (response.status == "Created") {
                    console.log(responseObs.message);
                  } else {
                    handleToast(response.message, true);
                  }
                })
                .catch((err) => {
                  handleToast(err.message, true);
                });

            sucessoCount++;
          } else {
            erroCount++;
            console.error(`Erro no ato ${idAto}: ${response.message}`);
          }
        } catch (err) {
          erroCount++;
          console.error(`Erro ao fazer triagem do ato ${idAto}`, err);
        }
      }

      // Exibe um único toast resumido
      if (sucessoCount > 0) {
        setSelectedDataTable([]);
        setSelectedRowHashes([]);
        reload();
        handleToast(`${sucessoCount} processo(s) triado(s) com sucesso`);
      }

      if (erroCount > 0) {
        handleToast(`${erroCount} processo(s) falharam na triagem`, true);
      }
    }
  };

  return (
    <BaseModal
      isOpenModal={openTriagemModal}
      setOpenModal={() => setOpenTriagemModal(false)}
      onClose={() => {
        resetFields();
      }}
      title="Triagem e Distribuição de Ato Manual"
      isSelect={true}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.Section>
            <S.SectionTitle>
              Número dos processos ({processosData.length})
              <S.ContainerShowProcessNumber
                onClick={() => setShowSelectedProcess(!showSelectedProcess)}
              >
                {showSelectedProcess ? (
                  <Eye size={20} />
                ) : (
                  <EyeSlash size={20} />
                )}
              </S.ContainerShowProcessNumber>
            </S.SectionTitle>

            <S.SelectedProcessNumberContainer isOpen={showSelectedProcess}>
              {processosData.map((p) => (
                <S.SelectedProcessNumber>
                  {p.txNumeroFormatado}
                </S.SelectedProcessNumber>
              ))}
            </S.SelectedProcessNumberContainer>
          </S.Section>
          <SM.ContentWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "20px",
            }}
          >
            {secretariesList && (
              <S.ContainerField>
                <S.FieldTitle>Secretaria: *</S.FieldTitle>
                <Controller
                  name="idSecretaria"
                  control={control}
                  render={({ field }) => (
                    <S.CustomSelect
                      {...field}
                      placeholder="Selecione a secretaria"
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
                value={obs}
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

export default TriagemDistAtoManualEmLote;

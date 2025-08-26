import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getActById } from "../../../../../../api/services/acts/acts";
import { GetActByIdResponse } from "../../../../../../api/services/acts/acts.interface";
import { updateTriagensObs } from "../../../../../../api/services/triagens-observacoes/triagensObs";
import { BaseModal } from "../../../../../../components/BaseModal";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../context/SharedContext";
import { useAct } from "../../../../../../hooks/useAct";
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

const EditarTriagemEmLoteAguardTomCien = () => {
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
    setOpenEditarTriagemEmLoteModal,
    openEditarTriagemEmLoteModal,
    processoData,
    processosData,
    triagemData,
  } = useOperadorContext();

  console.log(processosData);

  const { act, isLoadingAct } = useAct(processoData?.idAto);

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
    setOpenEditarTriagemEmLoteModal(false);
    reload();
    resetFields();
  };

  // const {
  //   mutateTriagemObs,
  //   data: responseTriagemObs,
  //   isLoadingTriagemObs,
  // } = useMutation(getTriagensObs);

  const [actsMap, setActsMap] = useState<Record<number, GetActByIdResponse>>(
    {}
  );

  useEffect(() => {
    const fetchActs = async () => {
      if (!processosData) return;

      const results = await Promise.all(
        processosData.map(async (processo) => {
          const id = processo.idAto ?? processo.id; // usa idAto se existir, senão usa id
          const act = await getActById(id);
          return { idAto: id, act };
        })
      );

      const actsByIdAto = results.reduce((acc, curr) => {
        acc[curr.idAto] = curr.act;
        return acc;
      }, {} as Record<number, GetActByIdResponse>);

      setActsMap(actsByIdAto);
    };

    fetchActs();
  }, [processosData]);

  const onSubmit: SubmitHandler<TriagemPostI> = async (params) => {
    if (processosData) {
      let sucessoCount = 0;
      let erroCount = 0;

      for (const processo of processosData) {
        const idAto = processo.idAto ?? processo.id; // 👈 usa idAto se existir, senão usa id
        const idTriagem = actsMap[idAto]?.data?.idTriagem;

        console.log(idTriagem, "idTriagem do processo");

        try {
          const response = await updateTriagensObs({
            idAto: idAto,
            idTriagem: idTriagem,
            idSecretaria: secretariaSelectedOption?.value,
            idEspecializada: especializadaSelectedOption?.value,
            isPublicar: params.isPublicar,
            idUsuarioCadastro: user["Jvris.User.Id"],
          });

          if (response.status == "OK") {
            console.log(response);
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
      isOpenModal={openEditarTriagemEmLoteModal}
      setOpenModal={() => setOpenEditarTriagemEmLoteModal(false)}
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

export default EditarTriagemEmLoteAguardTomCien;

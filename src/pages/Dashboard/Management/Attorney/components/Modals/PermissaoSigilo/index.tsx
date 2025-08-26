import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { patchAdicionarPermissaoSigilo } from "../../../../../../../api/services/adicionarPermissaoSigilo/adicionarPermissaoSigilo";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../../../components/HotToastFuncs";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../../context/SharedContext";
import { useCurrentAttorneysAdvisors } from "../../../../../../../hooks/useCurrentAttorneysAdvisors";
import {
  useNivelSigiloCinco,
  useNivelSigiloDois,
  useNivelSigiloQuatro,
  useNivelSigiloTres,
  useNivelSigiloUm,
  useNivelSigiloZero,
} from "../../../../../../../hooks/useNivelSigilo";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { OptionsType } from "../../../interfaces";
import { ProcessosView } from "../../../styled";
import { SubmitPermissaoSigilo } from "./interfaces/permissaoSigilo.interface";

interface NivelSigilo {
  nuSigilo: number;
  idProcesso: number;
  idAto: number;
}

const PermissaoSigilo = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal, setShouldReset } =
    useModalsContext();
  const [process, setProcess] = useState("");
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

  const { attorneysAdvisorsList, loadingAttorneysAdvisorsList } =
    useCurrentAttorneysAdvisors();
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [nivelSigilo, setNivelSigilo] = useState<NivelSigilo[]>([]);
  const { nivelZero, isLoadingNivelZero } = useNivelSigiloZero(+user_id);
  const { nivelUm, isLoadingNivelUm } = useNivelSigiloUm(+user_id);
  const { nivelDois, isLoadingNivelDois } = useNivelSigiloDois(+user_id);
  const { nivelTres, isLoadingNivelTres } = useNivelSigiloTres(+user_id);
  const { nivelQuatro, isLoadingNivelQuatro } = useNivelSigiloQuatro(+user_id);
  const { nivelCinco, isLoadingNivelCinco } = useNivelSigiloCinco(+user_id);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitPermissaoSigilo>({
    mode: "onChange",
  });

  function resetForm() {
    setValue("nuSigilo", { label: "", value: null });
    reset({
      nuSigilo: null,
    });
    closeModal();
  }

  function mapToOptionsType(
    data: any[],
    valueKey: string,
    labelKey: string
  ): OptionsType[] {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
        isFixed: true,
        isSelected: true,
      };
    });
  }
  function mapNivelSigilo(
    data: any[],
    valueKey: string,
    valueKey2: string,
    valueKey3: string
  ): NivelSigilo[] {
    return data.map((item: any) => {
      return {
        nuSigilo: item[valueKey],
        idProcesso: item[valueKey2],
        idAto: item[valueKey3],
      };
    });
  }

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "id",
        "txNumero"
      );
      const mappedNivelSigilo = mapNivelSigilo(
        managing.selectedData,
        "nuSigilo",
        "idProcesso",
        "id"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
      setNivelSigilo(mappedNivelSigilo);
    }
  }, [managing.selectedData || modalsID.permissaoSigilo]);

  useEffect(() => {
    if (currModal == modalsID.permissaoSigilo)
      managing.singularSelectedData &&
        setProcess(managing.singularSelectedData!.txNumero);
  }, [managing.singularSelectedData]);

  const onSubmit: SubmitHandler<SubmitPermissaoSigilo> = (params) => {
    nivelSigilo &&
      nivelSigilo.map((value) =>
        value.nuSigilo == 0
          ? patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario0.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
          : value.nuSigilo == 1
          ? patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario1.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
          : value.nuSigilo == 2
          ? patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario2.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
          : value.nuSigilo == 3
          ? patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario3.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
          : value.nuSigilo == 4
          ? patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario4.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
          : patchAdicionarPermissaoSigilo({
              usuarioProcesso: [
                {
                  idProcesso: value?.idProcesso,
                  idUsuario: params.idUsuario5.value,
                  nuSigilo: value?.nuSigilo,
                  idAto: value?.idAto,
                },
              ],
            }).then((response) => {
              if (response.status == "OK") {
                HotToastSucess("Permissão adicionada com sucesso");
                setShouldReset(true);
              } else {
                HotToastError("Erro ao adicionar permissão");
              }
            })
      );

    resetForm();
  };

  const temNivelZero = nivelSigilo.some((objeto) => objeto.nuSigilo === 0);
  const temNivelUm = nivelSigilo.some((objeto) => objeto.nuSigilo === 1);
  const temNivelDois = nivelSigilo.some((objeto) => objeto.nuSigilo === 2);
  const temNivelTres = nivelSigilo.some((objeto) => objeto.nuSigilo === 3);
  const temNivelQuatro = nivelSigilo.some((objeto) => objeto.nuSigilo === 4);
  const temNivelCinco = nivelSigilo.some((objeto) => objeto.nuSigilo === 5);

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.permissaoSigilo)}
      closeModal={() => resetForm()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>
            Adicionar usuários para lista de permissão de sigilo
          </SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => resetForm()}>Fechar</SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.Form onSubmit={handleSubmit(onSubmit)}>
          <SM.ContentWrapper>
            <SM.ContentTitle>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                PROCESSO(S) SELECIONADO(S)
              </SM.ContentTitleLabel>
            </SM.ContentTitle>

            {process == "" ? (
              <ProcessosView processosOptions={processosOptions} />
            ) : (
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                {managing.singularSelectedData?.txNumero}
              </SM.ContentTitleLabel>
            )}
            <SM.ContentSeparator />

            {temNivelZero && !isLoadingNivelZero && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 0:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario0", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelZero}
                      isClearable={false}
                      isLoading={isLoadingNivelZero}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {temNivelUm && !isLoadingNivelUm && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 1:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario1", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelUm}
                      isClearable={false}
                      isLoading={isLoadingNivelUm}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {temNivelDois && !isLoadingNivelDois && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 2:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario2", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelDois}
                      isClearable={false}
                      isLoading={isLoadingNivelDois}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {temNivelTres && !isLoadingNivelTres && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 3:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario3", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelTres}
                      isClearable={false}
                      isLoading={isLoadingNivelTres}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {temNivelQuatro && !isLoadingNivelQuatro && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 4:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario4", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelQuatro}
                      isClearable={false}
                      isLoading={isLoadingNivelQuatro}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {temNivelCinco && !isLoadingNivelCinco && (
              <>
                <SM.ContentTitle>
                  <SM.ContentTitleLabel>Nível 5:</SM.ContentTitleLabel>
                </SM.ContentTitle>
                <Controller
                  control={control}
                  {...register("idUsuario5", {
                    required: "Selecionar um assessor é obrigatório.",
                  })}
                  render={({ field }) => (
                    <SM.ContentSelect
                      placeholder="Selecione o nível do sigilo"
                      options={nivelCinco}
                      isClearable={false}
                      isLoading={isLoadingNivelCinco}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            <SM.ContentButton>
              <SM.ContentButtonLabel disabled={!isValid} type="submit">
                Alterar
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Form>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default PermissaoSigilo;

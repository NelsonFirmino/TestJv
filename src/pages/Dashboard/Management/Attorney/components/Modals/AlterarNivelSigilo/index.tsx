import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { patchAlterarNivelSigilo } from "../../../../../../../api/services/alterarNivelSigilo/alterarNivelSigilo";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../../../components/HotToastFuncs";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../../context/SharedContext";
import { useCurrentAttorneysAdvisors } from "../../../../../../../hooks/useCurrentAttorneysAdvisors";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { OptionsType } from "../../../interfaces";
import { ProcessosView } from "../../../styled";
import { SubmitAlterarNivelSigilo } from "./interfaces/alterarNivelSigilo.interface";
import { nivelSigilo } from "./mockData";

const AlterarNivelSigilo = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal, setShouldReset } =
    useModalsContext();
  const [process, setProcess] = useState("");
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

  const { attorneysAdvisorsList, loadingAttorneysAdvisorsList } =
    useCurrentAttorneysAdvisors();
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

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

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "id",
        "txNumero"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
    }
  }, [managing.selectedData]);

  useEffect(() => {
    if (currModal == modalsID.alterarNivelSigilo)
      managing.singularSelectedData &&
        setProcess(managing.singularSelectedData!.txNumero);
  }, [managing.singularSelectedData]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAlterarNivelSigilo>({
    mode: "onChange",
  });

  function resetForm() {
    setValue("nuSigilo", { label: "", value: null });
    reset({
      nuSigilo: null,
    });
    closeModal();
  }

  const onSubmit: SubmitHandler<SubmitAlterarNivelSigilo> = (params) => {
    managing?.selectedData
      ? managing?.selectedData?.map((item: any) => {
          patchAlterarNivelSigilo({
            atosSigilosos: [
              {
                idProcesso: item?.idProcesso,
                idUsuario: +user["Jvris.User.Id"],
                nuSigilo: params.nuSigilo.value,
                idAto: item?.id,
              },
            ],
          }).then((response) => {
            if (response.status == "OK") {
              HotToastSucess("Nível de Sigilo Alterado com Sucesso");
              setShouldReset(true);
            } else {
              HotToastError("Erro ao Alterar Nível de Sigilo");
            }
          });
          resetForm();
        })
      : patchAlterarNivelSigilo({
          atosSigilosos: [
            {
              idProcesso: managing?.singularSelectedData.idProcesso,
              idUsuario: +user["Jvris.User.Id"],
              nuSigilo: params.nuSigilo.value,
              idAto: managing?.singularSelectedData.id,
            },
          ],
        }).then((response) => {
          if (response.status == "OK") {
            HotToastSucess("Nível de Sigilo Alterado com Sucesso");
            setShouldReset(true);
          } else {
            HotToastError("Erro ao Alterar Nível de Sigilo");
          }
        });
    resetForm();
  };


  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.alterarNivelSigilo)}
      closeModal={() => resetForm()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Alterar Nível de Sigilo</SM.TitleLabel>
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
            <SM.ContentTitle>
              <SM.ContentTitleLabel>Nível de sigilo</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <Controller
              control={control}
              {...register("nuSigilo", {
                required: "Selecionar um assessor é obrigatório.",
              })}
              render={({ field }) => (
                <SM.ContentSelect
                  placeholder="Selecione o nível do sigilo"
                  options={nivelSigilo}
                  isClearable={false}
                  {...field}
                />
              )}
            />
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

export default AlterarNivelSigilo;

import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { useCurrentAttorneysAdvisors } from "../../../../../../../hooks/useCurrentAttorneysAdvisors";
import jwtDecode from "jwt-decode";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SubmitAtribuirAssessor } from "./interfaces/atribuirassessor.interface";
import { patchDistributionsAdvisor } from "../../../../../../../api/services/distributions/distributions";
import toast from "react-hot-toast";
import { useModalsContext } from "../../../context/ModalsContext";
import { useTablesContext } from "../../../context/TablesContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useEffect, useState } from "react";
import { OptionsType } from "../../../interfaces";
import { SharedState } from "../../../../../../../context/SharedContext";
import { HotToastError, HotToastSucess } from "../../../../../../../components/HotToastFuncs";
import { ProcessosView } from "../../../styled";

const AtribuirAssessorModal = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal, setShouldReset } = useModalsContext();
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
    if (currModal == modalsID.atribuirAssessor)
      managing.singularSelectedData &&
        setProcess(managing.singularSelectedData!.txNumero);
  }, [managing.singularSelectedData]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitAtribuirAssessor>({
    mode: "onChange",
  });

  function resetForm() {
    setProcess("");
    reset({
      assessor: null,
    });
    closeModal();
  }

  const onSubmit: SubmitHandler<SubmitAtribuirAssessor> = (params) => {
    const idDistribuicaoList: number[] = [];

    process
      ? idDistribuicaoList.push(managing.singularSelectedData.idDistribuicao)
      : managing.selectedData.map((item: any) => {
        idDistribuicaoList.push(item.idDistribuicao);
      });

    patchDistributionsAdvisor({
      idAssessor: params.assessor.value!,
      idUsuarioCadastro: +user["Jvris.User.Id"],
      idsDistribuicao: idDistribuicaoList,
    }).then((response) => {
      if (response.status == "OK") {
        HotToastSucess("Assessor Atribuído com Sucesso!");
        setShouldReset(true);
      } else {
        HotToastError("Erro ao Atribuir Assessor!");
      }
    });
    resetForm();
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.atribuirAssessor)}
      closeModal={() => resetForm()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Atribuir para Assessor</SM.TitleLabel>
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
              <SM.ContentTitleLabel>Assessores</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <Controller
              control={control}
              {...register("assessor", {
                required: "Selecionar um assessor é obrigatório.",
              })}
              render={({ field }) => (
                <SM.ContentSelect
                  placeholder="Selecione um Assessor"
                  options={attorneysAdvisorsList}
                  isClearable={false}
                  isLoading={loadingAttorneysAdvisorsList}
                  {...field}
                />
              )}
            />
            <SM.ContentButton>
              <SM.ContentButtonLabel disabled={!isValid} type="submit">
                Atribuir
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Form>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AtribuirAssessorModal;

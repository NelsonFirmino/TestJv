import { useQueryClient } from "react-query";
import { useSpecials } from "../../../../../../../hooks/useSpecials";
import { postInformationRequest } from "../../../../../../../api/services/attorneys/informationRequests/attorneys.informationRequests";
import jwtDecode from "jwt-decode";
import { useContext } from "react";

import { SubmitSolicitacaoInfo } from "./interfaces/solicitacaoinformacao.inteface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {JvrisModal} from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import * as S from "./styled";
import toast from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { SharedState } from "../../../../../../../context/SharedContext";

const SolicitacaoInformacaoModal = () => {
  const { managing } = useTablesContext();
  const { closeModal, isModalOpen } = useModalsContext();

  const queryClient = useQueryClient();
  const { specialsList, loadingSpecialsList } = useSpecials();

  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitSolicitacaoInfo>({
    mode: "onChange",
  });

  const resetOnSubmit = () => {
    managing.resetSingularSelectedData();
    reset({
      txDescricao: "",
      idEspecializada: null,
    });
    closeModal();
  };

  const onSubmit: SubmitHandler<SubmitSolicitacaoInfo> = async (params) => {
    postInformationRequest({
      idEspecializada: params.idEspecializada!.value,
      txDescricao: params.txDescricao,
      idAto: managing.selectedData && managing.selectedData.length?  Number(managing.selectedData![0].id): Number(managing.singularSelectedData.id),
    } as any).then((response) => {
      if (response.status == "Created") {
        toast("Informação Solicitada com Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });

        queryClient.invalidateQueries(`currentAttorneysAdvisors-${user_id}`);
        resetOnSubmit();
      } else {
        toast.error("Erro ao Solicitar Informação", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
    });
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.solicitacaoInformacao)}
      closeModal={resetOnSubmit}
    >
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <SM.Wrapper>
          <SM.TitleContainer>
            <SM.TitleLabel>Solicitação de Informação</SM.TitleLabel>
            <SM.TitleButtonWrapper>
              <SM.TitleButton onClick={resetOnSubmit}>Fechar</SM.TitleButton>
            </SM.TitleButtonWrapper>
          </SM.TitleContainer>
          <SM.ContentWrapper>
            <SM.ContentTitle>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                PROCESSO SELECIONADO:
              </SM.ContentTitleLabel>
              <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                {managing.singularSelectedData?.txNumero}
              </SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentSeparator />
            <SM.ContentSelectWrapper>
              <Controller
                name="idEspecializada"
                control={control}
                render={({ field }) => (
                  <SM.ContentSelect
                    isLoading={loadingSpecialsList}
                    placeholder="Selecione a especializada"
                    {...field}
                    options={specialsList}
                  />
                )}
              />
            </SM.ContentSelectWrapper>
            <SM.ContentTitle>
              <SM.ContentTitleLabel>Descrição</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentTextArea {...register("txDescricao")} />
            <SM.ContentButton>
              <SM.ContentButtonLabel type="submit">
                Solicitar Informação
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </SM.ContentWrapper>
        </SM.Wrapper>
      </S.Form>
    </JvrisModal>
  );
};
export default SolicitacaoInformacaoModal;

import { useMutation, useQueryClient } from "react-query";
import { deleteAudience } from "../../../../../../api/services/audiencies/audiences";
import { ModalRemoveAudienceProps } from "./modal-register-audience.interface";
import * as S from "./styled";

export const ModalRemoveAudience = ({
  showModalRemoveAudience,
  setShowModalRemoveAudience,
}: ModalRemoveAudienceProps) => {
  const queryClient = useQueryClient();
  const handleDeleteAudience = useMutation(deleteAudience, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `actAudience-${showModalRemoveAudience.idAto}`
      );
      setShowModalRemoveAudience({
        idAto: "0",
        idAudiencia: 0,
        open: false,
      });
    },
    onError: (error) => {
      alert("Error ao remover audiência...");
    },
  });

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Remover Audiência</S.TitleModal>
          <S.CloseModal
            onClick={() =>
              setShowModalRemoveAudience({
                open: false,
                idAto: "0",
                idAudiencia: 0,
              })
            }
          >
            Fechar
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Tem certeza que deseja excluir a audiência?
          </S.WarningMessage>

          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() =>
                setShowModalRemoveAudience({
                  open: false,
                  idAto: "0",
                  idAudiencia: 0,
                })
              }
            >
              Cancelar
            </S.OptionCancel>
            <S.OptionRemoveAttachment
              onClick={() =>
                handleDeleteAudience.mutate(showModalRemoveAudience.idAudiencia)
              }
            >
              Remover
            </S.OptionRemoveAttachment>
          </S.OptionsContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

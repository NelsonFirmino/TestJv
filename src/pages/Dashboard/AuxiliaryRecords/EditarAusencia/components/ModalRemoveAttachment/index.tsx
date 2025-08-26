import * as S from "./styled";
import { useQueryClient } from "react-query";
import { deleteAbsenceAttachment } from "../../../../../../api/services/absences/absences";

type Params = {
  open?: boolean;
  absenseAttachmentId: number;
};

interface ModalConfirmRemoveAttachment {
  setShowModalConfirmRemoveAttachment: (params: Params) => void;
  showModalConfirmRemoveAttachment: Params;
  absenseId: number;
}

export const ModalConfirmRemoveAttachment = ({
  setShowModalConfirmRemoveAttachment,
  showModalConfirmRemoveAttachment,
  absenseId,
}: ModalConfirmRemoveAttachment) => {
  const queryClient = useQueryClient();
  const removeAttachment = async () => {
    await deleteAbsenceAttachment(
      showModalConfirmRemoveAttachment.absenseAttachmentId
    );
    queryClient.invalidateQueries(`absenseAttachment-${absenseId}`);
    setShowModalConfirmRemoveAttachment({
      open: false,
      absenseAttachmentId: 0,
    });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Atenção</S.TitleModal>
          <S.CloseModal
            onClick={() =>
              setShowModalConfirmRemoveAttachment({
                open: false,
                absenseAttachmentId: 0,
              })
            }
          >
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Você está prestes a deletar um anexo. Tem certeza?
          </S.WarningMessage>
          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() =>
                setShowModalConfirmRemoveAttachment({
                  open: false,
                  absenseAttachmentId: 0,
                })
              }
            >
              Cancelar
            </S.OptionCancel>
            <S.OptionRemoveAttachment
              onClick={async () => await removeAttachment()}
            >
              Remover
            </S.OptionRemoveAttachment>
          </S.OptionsContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

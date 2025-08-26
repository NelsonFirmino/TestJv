import * as S from "./styled";
import { useQueryClient } from "react-query";
import { deleteActDCJEAttachment } from "../../../../../../api/services/dcje/actsDCJE/actsDCJEAttachments/actsDCJEAttachments";

type Params = {
  open?: boolean;
  actAttachmentId: number;
};

interface ModalConfirmRemoveAttachment {
  setShowModalConfirmRemoveAttachment: (params: Params) => void;
  showModalConfirmRemoveAttachment: Params;
  proceduralRecordId: number;
}

export const ModalConfirmRemoveAttachment = ({
  setShowModalConfirmRemoveAttachment,
  showModalConfirmRemoveAttachment,
  proceduralRecordId,
}: ModalConfirmRemoveAttachment) => {
  const queryClient = useQueryClient();
  const removeAttachment = async () => {
    await deleteActDCJEAttachment(
      showModalConfirmRemoveAttachment.actAttachmentId
    );
    queryClient.invalidateQueries(`actDCJEAttachments-${proceduralRecordId}`);
    setShowModalConfirmRemoveAttachment({
      open: false,
      actAttachmentId: 0,
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
                actAttachmentId: 0,
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
                  actAttachmentId: 0,
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

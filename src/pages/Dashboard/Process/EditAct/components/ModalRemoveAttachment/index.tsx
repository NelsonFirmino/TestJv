import { useQueryClient } from "react-query";
import { deleteActAttachmentsById } from "../../../../../../api/services/acts/acts";
import * as S from "./styled";

type Params = {
    open?: boolean;
    actAttachmentId: number;
};

interface ModalConfirmRemoveAttachment {
    setShowModalConfirmRemoveAttachment: (params: Params) => void;
    showModalConfirmRemoveAttachment: Params;
    actId: number;
}

export const ModalConfirmRemoveAttachment = ({
    setShowModalConfirmRemoveAttachment,
    showModalConfirmRemoveAttachment,
    actId
}: ModalConfirmRemoveAttachment) => {
    const queryClient = useQueryClient();
    const removeAttachment = async () => {
        await deleteActAttachmentsById(
            showModalConfirmRemoveAttachment.actAttachmentId.toString()
        );
        queryClient.invalidateQueries(`actAttachments-${actId}`);
        setShowModalConfirmRemoveAttachment({
            open: false,
            actAttachmentId: 0
        });
    };

    return (
        <S.ContainerForm>
            <S.WarningMessage>
                Você está prestes a deletar um anexo. Tem certeza?
            </S.WarningMessage>
            <S.OptionsContainer>
                <S.OptionCancel
                    onClick={() =>
                        setShowModalConfirmRemoveAttachment({
                            open: false,
                            actAttachmentId: 0
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
    );
};

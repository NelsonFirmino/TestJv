import { useMutation, useQueryClient } from "react-query";
import { ModalRemoveObservationProps } from "./modal-add-act-observation.interface";
import * as S from "./styled";
import { deleteProcessAttachment } from "../../../../../../../../api/services/processAttachments/processAttachments";
import { BaseModal } from "../../../../../../../../components/BaseModal";

export const ModalRemoveAttachment = ({
  showModalRemoveAttachment,
  setShowModalRemoveAttachment,
  processIdKeyCacheRevalidate,
  attachmentId
}: ModalRemoveObservationProps) => {
  const queryClient = useQueryClient();
  const deleteProcessObservation = useMutation(deleteProcessAttachment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        `processAttachments-${processIdKeyCacheRevalidate}`
      );
      setShowModalRemoveAttachment(false);
    },
    onError: (error) => {
      alert("Error ao remover observação do processo...");
    },
  });

  return (
    <BaseModal title="Registo de observação do processo" isOpenModal={showModalRemoveAttachment} setOpenModal={setShowModalRemoveAttachment}>
      <S.ContainerForm>
          <S.ContainerProcessNumber>
            <S.ProcessNumber>
              Anexo não será mais visível neste processo.
            </S.ProcessNumber>
          </S.ContainerProcessNumber>

          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() =>
                setShowModalRemoveAttachment(false)
              }
            >
              Cancelar
            </S.OptionCancel>
            <S.OptionRemoveAttachment onClick={async () =>deleteProcessObservation.mutate(+attachmentId)}>
              Remover
            </S.OptionRemoveAttachment>
          </S.OptionsContainer>
        </S.ContainerForm>
    </BaseModal>
  );
};

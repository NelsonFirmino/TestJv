import { useMutation, useQueryClient } from "react-query";
import { deleteProcessObservations } from "../../../../../api/services/processObservations/processObservations";
import * as S from "./styled";
import { ModalRemoveObservationProps } from "./modal-remove-observation.interface";
import { BaseModal } from "../../../../../components/BaseModal";

export const ModalRemoveObservation = ({
  setShowModalRemoveObservation,
  showModalRemoveObservation,
  dataTable,
  processId
}: ModalRemoveObservationProps) => {
  const queryClient = useQueryClient();

  const deleteProcessObservation = useMutation(deleteProcessObservations, {
    onSuccess: () => {
      queryClient.invalidateQueries(
        `processObservations-${processId}`
      );
      setShowModalRemoveObservation(false);
    },
    onError: (error) => {
      alert("Error ao remover observação do processo...");
    },
  });

  return (
    <>
      <BaseModal title="Deseja remover a observação do processo?" isOpenModal={showModalRemoveObservation} setOpenModal={setShowModalRemoveObservation} >
        <S.ContainerForm>
            <S.ContainerProcessNumber>
              Observação selecionada:{" "}
              <S.ProcessNumber>
                {dataTable.txObservacao}
              </S.ProcessNumber>
            </S.ContainerProcessNumber>

            <S.OptionsContainer>
              <S.OptionCancel
                onClick={() =>
                  setShowModalRemoveObservation(false)
                }
              >
                Cancelar
              </S.OptionCancel>
              <S.OptionRemoveAttachment
                onClick={async () =>
                  deleteProcessObservation.mutate(dataTable.id)
                }
              >
                Remover
              </S.OptionRemoveAttachment>
            </S.OptionsContainer>
          </S.ContainerForm>
      </BaseModal>
      <S.ActionButton onClick={() => setShowModalRemoveObservation(true)}>
        <S.CloseIcon alt='Remover observação' />
      </S.ActionButton>
    </> 
  );
};

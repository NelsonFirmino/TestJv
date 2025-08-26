import { deleteProcessObservations } from "../../../../../../api/services/processObservations/processObservations";
import * as S from "./styled";
import { useQueryClient } from "react-query";

interface ModalConfirmdRemoveObservationProps {
  setShowModalConfirmRemoveObservation: (params: boolean) => void;
  processId?: string;
  observationId: number;
}

export const ModalConfirmRemoveObservation = ({
  setShowModalConfirmRemoveObservation,
  processId,
  observationId,
}: ModalConfirmdRemoveObservationProps) => {
  const queryClient = useQueryClient();
  const removeObservation = async () => {
    await deleteProcessObservations(observationId.toString());
    queryClient.invalidateQueries(`processObservations-${processId}`);
    setShowModalConfirmRemoveObservation(false);
  };
  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Atenção</S.TitleModal>
          <S.CloseModal
            onClick={() => setShowModalConfirmRemoveObservation(false)}
          >
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Você está prestes a remover uma obsevação do processo, tem certeza?
          </S.WarningMessage>
          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() => setShowModalConfirmRemoveObservation(false)}
            >
              Cancelar
            </S.OptionCancel>
            <S.OptionRemoveObservation
              onClick={async () => await removeObservation()}
            >
              Remover
            </S.OptionRemoveObservation>
          </S.OptionsContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

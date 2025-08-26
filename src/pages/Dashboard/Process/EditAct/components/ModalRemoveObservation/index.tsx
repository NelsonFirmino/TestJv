import * as S from "./styled";
import { useQueryClient } from "react-query";
import { deleteActObservationById } from "../../../../../../api/services/acts/acts";

type Params = {
  open?: boolean;
  actObservationId: number;
};

interface ModalConfirmRemoveObservation {
  setShowModalConfirmRemoveObservation: (params: Params) => void;
  showModalConfirmRemoveObservation: Params;
  actId: number;
}

export const ModalConfirmRemoveObservation = ({
  setShowModalConfirmRemoveObservation,
  showModalConfirmRemoveObservation,
  actId,
}: ModalConfirmRemoveObservation) => {
  const queryClient = useQueryClient();
  const removeObservation = async () => {
    await deleteActObservationById(
      showModalConfirmRemoveObservation.actObservationId.toString()
    );
    queryClient.invalidateQueries(`actObservation-${actId}`);
    setShowModalConfirmRemoveObservation({
      open: false,
      actObservationId: 0,
    });
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Atenção</S.TitleModal>
          <S.CloseModal
            onClick={() =>
              setShowModalConfirmRemoveObservation({
                open: false,
                actObservationId: 0,
              })
            }
          >
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Você está prestes a deletar uma observação. Tem certeza?
          </S.WarningMessage>
          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() =>
                setShowModalConfirmRemoveObservation({
                  open: false,
                  actObservationId: 0,
                })
              }
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

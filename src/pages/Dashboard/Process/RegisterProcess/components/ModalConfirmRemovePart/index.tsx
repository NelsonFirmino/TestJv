import * as S from "./styled";
import { deleteProcessPart } from "../../../../../../api/services/processParts/processParts";
import { useQueryClient } from "react-query";

type Params = {
  open?: boolean;
  partId: number;
};

interface ModalConfirmRemovePartProps {
  setShowModalConfirmRemovePart: (params: Params) => void;
  processId?: string;
  partId: number;
}

export const ModalConfirmRemovePart = ({
  setShowModalConfirmRemovePart,
  processId,
  partId,
}: ModalConfirmRemovePartProps) => {
  const queryClient = useQueryClient();
  const deletePart = async () => {
    await deleteProcessPart(partId);
    queryClient.invalidateQueries(`processParts-${processId}`);
    setShowModalConfirmRemovePart({
      open: false,
      partId: 0,
    });
  };
  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>Atenção</S.TitleModal>
          <S.CloseModal
            onClick={() =>
              setShowModalConfirmRemovePart({
                open: false,
                partId: 0,
              })
            }
          >
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>
            Você está prestes a remover uma parte do processo, tem certeza?
          </S.WarningMessage>
          <S.OptionsContainer>
            <S.OptionCancel
              onClick={() =>
                setShowModalConfirmRemovePart({
                  open: false,
                  partId: 0,
                })
              }
            >
              Cancelar
            </S.OptionCancel>
            <S.OptionRemovePart onClick={async () => await deletePart()}>
              Remover
            </S.OptionRemovePart>
          </S.OptionsContainer>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

import * as S from "./styled";

type Params = {
  open?: boolean;
  partId: number;
};

interface ModalConfirmRemovePartProps {
  setShowModalConfirmRemovePart: (params: Params) => void;
  setLsPartes: (params: any) => void;
  partId: number;
}

export const ModalConfirmRemovePart = ({
  setShowModalConfirmRemovePart,
  setLsPartes,
  partId,
}: ModalConfirmRemovePartProps) => {
  const deletePart = async () => {
    //console.log("partId", partId);
    setLsPartes((prev: any) => {
      return prev.filter((part: any) => part.idParte !== partId);
    });
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

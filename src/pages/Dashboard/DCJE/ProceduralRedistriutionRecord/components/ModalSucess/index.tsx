import * as S from "./styled";

interface ShowModalSuccess {
  setShowModalSuccess: (open: boolean) => void;
  title: string;
  message: string;
}

export const ModalSucess = ({
  setShowModalSuccess,
  title,
  message,
}: ShowModalSuccess) => {
  return (
    <S.Wrapper>
      <S.Modal>
        <S.TitleContainer>
          <S.TitleModal>{title}</S.TitleModal>
          <S.CloseModal onClick={() => setShowModalSuccess(false)}>
            <S.CloseIcon weight="fill" />
          </S.CloseModal>
        </S.TitleContainer>
        <S.ContainerForm>
          <S.WarningMessage>{message}</S.WarningMessage>
        </S.ContainerForm>
      </S.Modal>
    </S.Wrapper>
  );
};

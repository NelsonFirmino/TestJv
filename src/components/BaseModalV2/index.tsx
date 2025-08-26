import { BaseModalParams } from "./base-modal.interface";
import * as S from "./styled";

export const BaseModalV2 = ({
  title,
  children,
  keyString,
  keyStateOpenModal,
  setKeyStateOpenModal,
  isSchedule,
  isSelect,
}: BaseModalParams) => {
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    setKeyStateOpenModal(false);
  };

  return (
    <S.Wrapper
      isOpen={keyStateOpenModal === keyString}
      onClick={handleCloseModal}
    >
      <S.ModalContainer
        onClick={handleContainerClick}
        isSchedule={isSchedule}
        isSelect={isSelect}
      >
        <S.HeaderContainer>
          <S.Title>{title}</S.Title>
          <S.CloseModal onClick={handleCloseModal}>
            <S.CloseIcon />
          </S.CloseModal>
        </S.HeaderContainer>

        <S.BodyModal>{children}</S.BodyModal>
      </S.ModalContainer>
    </S.Wrapper>
  );
};

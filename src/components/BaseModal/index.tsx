import { BaseModalParams } from "./base-modal.interface";
import * as S from "./styled";

export const BaseModal = ({
  title,
  children,
  isOpenModal,
  setOpenModal,
  isSchedule,
  isSelect,
  onClose,
  containerStyle,
}: BaseModalParams) => {
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <S.Wrapper isOpen={isOpenModal} onClick={handleCloseModal}>
      <S.ModalContainer
        onClick={handleContainerClick}
        isSchedule={isSchedule}
        isSelect={isSelect}
        style={containerStyle}
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

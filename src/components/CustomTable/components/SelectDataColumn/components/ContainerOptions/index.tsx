import { useEffect, useRef, useState } from "react";
import { ContainerOptionsProps } from "./container-options.interface";
import * as S from "./styled";

export const ContainerOptions = ({
  isOpen,
  data,
  columns,
  children,
  setOpenModal,
}: ContainerOptionsProps) => {
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const [firstClick, setFirstClick] = useState(0);

  const specificAreaRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      specificAreaRef.current &&
      !specificAreaRef.current.contains(event.target) &&
      isOpen
    ) {
      setOpenModal(false);
    }
    setFirstClick(firstClick + 1);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [firstClick]);

  return (
    <S.ModalContainer onClick={() => {}} isOpen={isOpen} ref={specificAreaRef}>
      {children}
    </S.ModalContainer>
  );
};

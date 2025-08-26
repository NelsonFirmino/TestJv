import { useEffect, useState } from "react";
import theme from "../../globalStyle/theme";
import { BaseModal } from "../BaseModal";
import * as S from "./styled";

const EvaluateModal = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isOpenModal &&
        event.target instanceof HTMLElement &&
        !document.getElementById("EvaluateModal")?.contains(event.target)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpenModal]);

  return (
    <>
      <BaseModal
        title="Pesquisa Sobre a Usabilidade"
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        isSelect={false}
      >
        <S.ContainerForm>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeAqsXCdN335itXDrgyRg0J71Do_Ia-zDKksYXqf1oOqHD2Rg/viewform?embedded=true"
            width="100%"
            height="500px"
          >
            Carregando…
          </iframe>
        </S.ContainerForm>
      </BaseModal>
      <S.Wrapper onClick={() => setOpenModal(true)}>
        <S.SvgIcon height={32} width={20} fill={theme.colors.white} />
        Formulário de Pesquisa
      </S.Wrapper>
    </>
  );
};

export default EvaluateModal;

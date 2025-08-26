import React, { useState } from "react";
import { ObservationModalIterface } from "../interfaces/processoverview.interface";
import * as S from "./styled";

const ProcessObservationModal = () => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <S.ObsAddButton onClick={handleModal}>+</S.ObsAddButton>
      {modal && (
        <>
          <S.ModalPage>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalHeaderTitle>
                  Registo de Observação do Processo
                </S.ModalHeaderTitle>
                <S.ModalCloseButton onClick={handleModal}>
                  Fechar
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalContent>
                <S.ModalContentTitle>
                  PROCESSO SELECIONADO: 0003039-51.2006.8.20.0102
                </S.ModalContentTitle>
                <S.Border />
                <S.ModalContentObstitle>Nova Observação</S.ModalContentObstitle>
                <S.ModalContentObsArea
                  rows={10}
                  cols={30}
                  placeholder="Digite a obsercação aqui"
                  onChange={(e) => {}}
                />
                <S.Border />
                <S.ModalContentObsSaveButton onClick={handleModal}>
                  Salvar
                </S.ModalContentObsSaveButton>
              </S.ModalContent>
            </S.ModalContainer>
          </S.ModalPage>
        </>
      )}
    </>
  );
};

export default ProcessObservationModal;

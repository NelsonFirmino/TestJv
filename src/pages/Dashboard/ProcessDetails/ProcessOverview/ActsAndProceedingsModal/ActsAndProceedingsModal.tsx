import React, { useState } from "react";
import * as S from "./styled";
import JvrisTable from "../../../../../components/JvrisTable";
import * as MockDataTable from "../mockJvrisTableData";
import theme from "../../../../../globalStyle/theme";
import { Info } from "phosphor-react";

const ActsAndProceedingsModdal = () => {
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
                <S.ModalHeaderTitle>Ver Tramitações</S.ModalHeaderTitle>
                <S.ModalCloseButton onClick={handleModal}>
                  Fechar
                </S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalContent>
                <JvrisTable
                  autoPrimaryColumn={false}
                  columns={MockDataTable.JvrisTablesColumnsPrev}
                  data={MockDataTable.JvrisTableDataPrev}
                />
              </S.ModalContent>
            </S.ModalContainer>
          </S.ModalPage>
        </>
      )}
    </>
  );
};

export default ActsAndProceedingsModdal;

import { useState } from "react";
import { ModalChangeType } from "../ModalChangeType";
import * as S from "./styled";
export const ButtonChangeType = (dataTable: any) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalChangeType
        showModal={showModal}
        id={dataTable.dataTable.id}
        txSipRubrica={dataTable.dataTable.txSipRubrica}
        setShowModal={setShowModal}
      />
      <S.Wrapper onClick={() => setShowModal(true)}>Alterar</S.Wrapper>
    </>
  );
};

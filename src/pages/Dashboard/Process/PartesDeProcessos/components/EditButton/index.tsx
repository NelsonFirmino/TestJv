import { useState } from "react";
import { ModalEdit } from "../ModalEdit";
import * as S from "./styled";

export const EditButton = (dataTable: any) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ModalEdit
        id={dataTable.dataTable.id}
        setShowModalAdd={setShowModal}
        idParte={dataTable.dataTable.idParte}
        txParte={dataTable.dataTable.txParte}
        txSigla={dataTable.dataTable.txSigla}
        txNumeroProcesso={dataTable.dataTable.txNumeroProcesso}
        nuInstancia={dataTable.dataTable.nuInstancia}
        showModal={showModal}
      />
      <S.Wrapper onClick={() => setShowModal(true)}>Editar</S.Wrapper>
    </>
  );
};

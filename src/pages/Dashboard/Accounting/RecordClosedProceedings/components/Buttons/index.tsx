import * as S from "./styled";
import { useState } from "react";
import { ModalReativar } from "../ModalReativar";

export const Buttons = (dataTable: any) => {
  const [showModalReativar, setShowModalReativar] = useState({
    id: "0",
    open: false,
  });

  {
    showModalReativar.open && (
      <ModalReativar
        showModalReativar={showModalReativar}
        setShowModalReativar={setShowModalReativar}
      />
    );
  }

  return (
    <>
      {showModalReativar.open && (
        <ModalReativar
          showModalReativar={showModalReativar}
          setShowModalReativar={setShowModalReativar}
        />
      )}
      <S.ContainerButtons>
        <S.LinkPage
          to={`/dashboard/dcje/ficha-processual-encerrada/${dataTable.dataTable.id}`}
        >
          <S.DocumentIcon weight="bold" alt="Visualizar ficha" />
        </S.LinkPage>
        <S.LinkPage
          to={`/dashboard/contadoria/dcje-resposta/${dataTable.dataTable.idResposta}`}
        >
          <S.EyeIcon weight="bold" alt="Visualizar resposta" />
        </S.LinkPage>
        <S.Wrapper>
          <S.ReturnIcon
            weight="bold"
            alt="Reativar"
            onClick={() =>
              setShowModalReativar({ id: dataTable.dataTable.id, open: true })
            }
          />
        </S.Wrapper>
      </S.ContainerButtons>
    </>
  );
};

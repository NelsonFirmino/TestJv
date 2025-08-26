import * as S from "./styled";
import Tables from "./components/Tables";
import { useState } from "react";
import theme from "../../../../globalStyle/theme";
import { AtosFisicosConcluidosI } from "./components/Tables/Processos/interfaces";
import EnvioOrgaoOrigemModal from "./EnvioOrgaoOrigemModal";

const AtosFisicosConcluidos = () => {
  const [processoData, setProcessoData] = useState(
    {} as AtosFisicosConcluidosI
  );
  const [openEnvioOrgaoOrigem, setOpenEnvioOrgaoOrigem] = useState(false);

  return (
    <S.Wrapper>
      <EnvioOrgaoOrigemModal
        idAto={processoData.idProcesso}
        idSecretaria={0}
        open={openEnvioOrgaoOrigem}
        setOpen={setOpenEnvioOrgaoOrigem}
      />
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "5px",
          backgroundColor: theme.colors.jvrisAqua,
          color: theme.colors.white,
        }}
      >
        Atos Físicos Concluídos
      </div>

      <Tables
        setProcessoData={setProcessoData}
        setOpenModal={setOpenEnvioOrgaoOrigem}
      />
    </S.Wrapper>
  );
};

export default AtosFisicosConcluidos;

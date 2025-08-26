import { JvrisModal } from "../../../../../../components/JvrisModal";
import * as SM from "../../../../../../components/JvrisModal/styled";
import * as S from "./styled";

import { Info } from "phosphor-react";
import { useState } from "react";
import axiosInstance from "../../../../../../api/axiosInstance";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";
import ShowProcesss from "../ShowProcesss";

const Observar = () => {
  const { openOBSModal, setOpenOBSModal, processosData, processoData, reload } =
    useOperadorContext();
  const { user, selectedUser, setSelectedDataTable, setSelectedRowHashes } =
    SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const [obs, setObs] = useState<string>("");

  return (
    <JvrisModal
      customStyles={{
        overflow: "unset",
      }}
      modalIsOpen={openOBSModal}
      closeModal={() => setOpenOBSModal(false)}
    >
      <SM.Wrapper style={{ width: "fit-content", height: "max-content" }}>
        <SM.TitleContainer style={{ marginBottom: "1rem" }}>
          <SM.TitleLabel fontSize="15px">Observar em lote</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton
              onClick={() => {
                setOpenOBSModal(false);
              }}
            >
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>

        <SM.ContentWrapper>
          <ShowProcesss />

          <S.ContainerField>
            <S.FieldTitle>Observação</S.FieldTitle>
            <SM.ContentTextArea
              placeholder="Digite uma observação. (Max. 1000 caracteres))"
              maxLength={1000}
              onChange={(event: any) => {
                setObs(event.target.value);
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "0.8rem",
              }}
            >
              <Info size={20} weight="fill" color={theme.colors.gray} />
              <p
                style={{
                  fontSize: "1.2rem",
                  color: theme.colors.gray,
                  fontWeight: "bold",
                }}
              >
                A observação irá sobrescrever a última informada nessa triagem.
              </p>
            </div>
          </S.ContainerField>

          <S.ContainerSubmitButton
            style={{
              gap: "3rem",
            }}
          >
            <S.SubmitButton
              style={{
                backgroundColor: theme.colors.jvrisAqua,
              }}
              onClick={async () => {
                if (!obs) {
                  HotToastError("Digite uma observação!");
                  return;
                }

                processosData.forEach(async (processo) => {
                  const observacaoTriagem = {
                    idTriagem: processo.idTriagem,
                    txObservacao: obs,
                    idUsuarioCadastro: +user["Jvris.User.Id"],
                  };
                  try {
                    const res = await axiosInstance.post(
                      `/api/v1.0/triagens-observacoes`,
                      observacaoTriagem
                    );
                    if (!res) throw new Error();
                    if (res.status == 400) throw new Error("Bad Request");

                    HotToastSucess("Observação registrada com sucesso!");
                    setOpenOBSModal(false);
                    reload();
                  } catch (error) {
                    console.error(error);
                    HotToastError("Erro ao observar!");
                  }
                  setSelectedDataTable([]);
                  setSelectedRowHashes([]);
                });
              }}
            >
              Observar
            </S.SubmitButton>
          </S.ContainerSubmitButton>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default Observar;

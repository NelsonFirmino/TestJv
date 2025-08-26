import { useEffect, useState } from "react";
import {JvrisModal} from "../../../../../components/JvrisModal";
import * as SM from "../../../../../components/JvrisModal/styled";
import useEspecializadasService from "../../../../../api/services/Especializada";
import { mapToSelect } from "../../../../../utils/MapDataToSelect";
import axiosInstance from "../../../../../api/axiosInstance";
import jwtDecode from "jwt-decode";
import {
  HotToastError,
  HotToastSucess,
  HotToastWarning,
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";

interface EnvioOrgaoOrigemModalI {
  idSecretaria: number;
  idAto: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

interface MotoristaI {
  id: number;
  txMotorista: string;
}

const EnvioOrgaoOrigemModal = (props: EnvioOrgaoOrigemModalI) => {
  const { setOpen, open, idAto, idSecretaria } = props;
  const [motoristas, setMotoristas] = useState<MotoristaI[]>([]);
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  useEffect(() => {
    getMotoristas();
  }, []);

  const [observacao, setObservacao] = useState("");
  const [motorista, setMotorista] = useState(undefined);

  async function getMotoristas() {
    try {
      const motor = await axiosInstance.get(
        "api/v1.0/motoristas?page=1&pageSize=10"
      );

      setMotoristas(motor.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <JvrisModal modalIsOpen={open} closeModal={() => setOpen(false)}>
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel fontSize="15px">
            Envio ao órgão de origem
          </SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton
              onClick={() => {
                setOpen(false);
              }}
            >
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.ContentWrapper
          style={{
            marginTop: "20px",
          }}
        >
          <SM.ContentWrapper
            style={{
              flexDirection: "row",
            }}
          >
            <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
              Informe o motorista:
            </SM.ContentTitleLabel>
            <SM.ContentSelect
              placeholder="Selecione um motorista"
              options={motoristas.map((motorista) => ({
                value: motorista.id,
                label: motorista.txMotorista,
              }))}
              onChange={(event: any) => {
                setMotorista(event.value);
              }}
            />
          </SM.ContentWrapper>
          <SM.ContentWrapper
            style={{
              flexDirection: "row",
            }}
          >
            <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
              Observação:
            </SM.ContentTitleLabel>

            <SM.ContentTextArea
              onChange={(event: any) => {
                setObservacao(event.target.value);
              }}
            />
          </SM.ContentWrapper>

          <SM.ContentButtonLabel
            onClick={async () => {
              if (motorista === undefined) {
                HotToastWarning("Selecione uma especializada!");
              }

              const data = {
                Id: idAto,
                idMotorista: motorista,
                idUsuarioCadastro: +user["Jvris.User.Id"],
                txObservacao: observacao,
              };
              try {
                await axiosInstance.post(
                  `api/v1.0/atos-conclusoes-envio-orgao-origem`,
                  data
                );
                HotToastSucess("Ato enviado com sucesso!");
                setOpen(false);
              } catch (error) {
                console.error(error);
                HotToastError("Erro ao enviar ato!");
              }
            }}
          >
            Salvar
          </SM.ContentButtonLabel>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default EnvioOrgaoOrigemModal;

import {JvrisModal} from "../../../../../components/JvrisModal";
import * as S from "../styled";
import { CustomInput, CustomSelect2 } from "../customStyled";
import { useDadosCalculoContext } from "../DadosCalcContext";
import theme from "../../../../../globalStyle/theme";
import { useState } from "react";
import { cpf, cnpj } from "cpf-cnpj-validator";
import axiosInstance from "../../../../../api/axiosInstance";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";

const pessoas = [
  {
    label: "Física",
    value: "F",
  },
  {
    label: "Jurídica",
    value: "J",
  },
  {
    label: "Estado do RN",
    value: "E",
  },
  {
    label: "Associação",
    value: "A",
  },
  {
    label: "Sindicato",
    value: "S",
  },
];

const AddExequenteModal = () => {
  const { user } = SharedState();
  const { openAddExeModal, setOpenAddExeModal, CalcData, getData } =
    useDadosCalculoContext();
  const [nome, setNome] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [documento, setDocumento] = useState("");

  async function save() {
    if (pessoa === "F") {
      if (!cpf.isValid(documento)) return;
    } else {
      if (cnpj.isValid(documento)) return;
    }
    const res = await axiosInstance.get(
      `/api/v1.0/Partes/autocomplete?txCpf=${documento}`
    );
    let parteId = 0;
    if (res.data.status != "NotFound") {
      parteId = res.data.data[0].id;
    }

    if (parteId === 0) {
      const parte = {
        id: parteId,
        txParte: nome.toUpperCase(),
        txCpfCnpj: documento,
        txTipoPessoa: pessoa,
        idUsuarioCadastro: user["Jvris.User.Id"],
      };
      const res2 = await axiosInstance.post(`/api/v1.0/Partes`, parte);
      if (res2.data.status == "Created") {
        HotToastSucess("Exequente adicionado com sucesso!");
      } else {
        HotToastError("Erro ao adicionar exequente!");
      }
    } else {
      const processoParte = {
        idParte: parteId,
        idProcesso: CalcData.idProcesso,
        idUsuarioCadastro: user["Jvris.User.Id"],
        txPolo: "A",
        isPrincipal: false,
      };
      const res3 = await axiosInstance.post(
        `/api/v1.0/processos-partes`,
        processoParte
      );
      if (res3.data.status == "Created") {
        HotToastSucess("Exequente adicionado com sucesso!");
      } else {
        HotToastError("Erro ao adicionar exequente!");
      }
    }

    setOpenAddExeModal(false);
    getData();
  }

  return (
    <JvrisModal
      modalIsOpen={openAddExeModal}
      closeModal={() => setOpenAddExeModal(false)}
    >
      <S.Container>
        <S.ContainerFieldRow>
          <CustomInput
            InputTitle="Nome"
            placeholder="Nome"
            updateVal={(val) => setNome(val)}
            value={nome}
          />
        </S.ContainerFieldRow>
        <S.ContainerFieldRow>
          <CustomSelect2
            InputTitle="Pessoa"
            values={pessoas}
            updateVal={(val) => setPessoa(val)}
            value={pessoa}
          />
          <CustomInput
            InputTitle="Documento"
            placeholder="Documento"
            updateVal={(val) => setDocumento(val)}
            value={documento}
          />
        </S.ContainerFieldRow>
        <S.ContainerFieldRow
          style={{
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <div
            onClick={() => save()}
            style={{
              cursor: "pointer",
              padding: "1rem 2rem",
              borderRadius: "0.4rem",
              backgroundColor: theme.colors.jvrisAqua,
              fontSize: "1.4rem",
              color: theme.colors.white,
            }}
          >
            Salvar
          </div>
          <div
            onClick={() => setOpenAddExeModal(false)}
            style={{
              cursor: "pointer",
              padding: "1rem 2rem",
              borderRadius: "0.4rem",
              backgroundColor: theme.colors.softRed,
              fontSize: "1.4rem",
              color: theme.colors.white,
            }}
          >
            Voltar
          </div>
        </S.ContainerFieldRow>
      </S.Container>
    </JvrisModal>
  );
};

export default AddExequenteModal;

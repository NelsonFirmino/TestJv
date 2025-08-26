import * as SM from "../../../../../../components/JvrisModal/styled";
import * as S from "./styled";

import axiosInstance from "../../../../../../api/axiosInstance";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
  HotToastError,
  HotToastSucess,
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";
import ShowProcesss from "../ShowProcesss";
import useDistModal from "./useDistModal";

const Distruibuir = () => {
  const {
    openDistribuirModal,
    setOpenDistribuirModal,
    processosData,
    processoData,
    reload,
  } = useOperadorContext();
  const { user, selectedUser, setSelectedDataTable, setSelectedRowHashes } =
    SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const {
    obs,
    setObs,
    especializadas,
    procuradores,
    selectedEspecializada,
    selectedProcurador,
    setSelectedEspecializada,
    setSelectedProcurador,
  } = useDistModal();

  return (
    <BaseModal
      isOpenModal={openDistribuirModal}
      setOpenModal={() => setOpenDistribuirModal(false)}
      title="Distribuir"
    >
      <div>
        <ShowProcesss />
        <SM.ContentWrapper
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
          }}
        >
          <S.ContainerField>
            <S.FieldTitle>Especializada</S.FieldTitle>
            <S.CustomSelect
              styles={{
                menu: (provided, state) => ({
                  ...provided,
                  maxHeight: "140px",
                }),
                menuList: (provided, state) => ({
                  ...provided,
                  maxHeight: "140px",
                }),
              }}
              options={
                especializadas &&
                especializadas.map((especializada) => {
                  return {
                    value: especializada.id,
                    label: especializada.txEspecializada,
                  };
                })
              }
              onChange={(event: any) => {
                setSelectedEspecializada(
                  especializadas.find(
                    (especializada) => especializada.id === event.value
                  )
                );
              }}
              //value={selectedEspecializada && selectedEspecializada.id}
              defaultValue={selectedEspecializada && selectedEspecializada.id}
            />
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Procuradores</S.FieldTitle>
            <S.CustomSelect
              styles={{
                menu: (provided, state) => ({
                  ...provided,
                  maxHeight: "140px",
                }),
                menuList: (provided, state) => ({
                  ...provided,
                  maxHeight: "140px",
                }),
              }}
              options={
                procuradores &&
                procuradores.map((procurador) => {
                  return {
                    value: procurador.id,
                    label: procurador.txProcurador,
                  };
                })
              }
              onChange={(event: any) => {
                setSelectedProcurador(
                  procuradores.find(
                    (procurador) => procurador.id === event.value
                  )
                );
              }}
            />
          </S.ContainerField>

          <S.ContainerField>
            <S.FieldTitle>Observação</S.FieldTitle>
            <SM.ContentTextArea
              placeholder="Digite uma observação. (Max. 1000 caracteres))"
              maxLength={1000}
              onChange={(event: any) => {
                setObs(event.target.value);
              }}
            />
          </S.ContainerField>
        </SM.ContentWrapper>
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
              if (!selectedEspecializada || !selectedProcurador) {
                HotToastError("Selecione uma especializada e um procurador!");
                return;
              }
              if (processosData.length) {
                processosData.forEach(async (processo) => {
                  const obsTri = {
                    idTriagem: processo.idTriagem,
                    txObservacao: obs,
                    idUsuarioCadastro: +user["Jvris.User.Id"],
                  };
                  const dist = {
                    id: processo.idTriagem,
                    idProcurador: selectedProcurador.id,
                    idUsuarioCadastro: +user["Jvris.User.Id"],
                    observacao: obsTri,
                  };

                  try {
                    const res = await axiosInstance.post(
                      "/api/v1.0/distribuicoes",
                      dist
                    );

                    if (!res) throw new Error();
                    if (res.status == 400) throw new Error("Bad Request");
                    HotToastSucess("Distribuição realizada com sucesso!");
                    setOpenDistribuirModal(false);
                    reload();
                  } catch (error) {
                    console.error(error);
                    HotToastError("Erro ao distribuir!");
                  }
                  setSelectedDataTable([]);
                  setSelectedRowHashes([]);
                });
              } else {
                const obsTri = {
                  idTriagem: processoData.idTriagem,
                  txObservacao: obs,
                  idUsuarioCadastro: +user["Jvris.User.Id"],
                };
                const dist = {
                  id: processoData.idTriagem,
                  idProcurador: selectedProcurador.id,
                  idUsuarioCadastro: +user["Jvris.User.Id"],
                  observacao: obsTri,
                };

                try {
                  const res = await axiosInstance.post(
                    "/api/v1.0/distribuicoes",
                    dist
                  );

                  if (!res) throw new Error();
                  if (res.status == 400) throw new Error("Bad Request");
                  HotToastSucess("Distribuição realizada com sucesso!");
                  setOpenDistribuirModal(false);
                  reload();
                } catch (error) {
                  console.error(error);
                  HotToastError("Erro ao distribuir!");
                }
                setSelectedDataTable([]);
                setSelectedRowHashes([]);
              }
            }}
          >
            Distribuir
          </S.SubmitButton>
        </S.ContainerSubmitButton>
      </div>
    </BaseModal>
  );
};

export default Distruibuir;

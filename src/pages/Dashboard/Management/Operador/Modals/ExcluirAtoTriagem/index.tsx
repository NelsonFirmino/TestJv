import useTriagensService from "../../../../../../api/services/Triagens";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
  HotToastError,
  HotToastSucess,
  HotToastWarning,
} from "../../../../../../components/HotToastFuncs";
import * as SM from "../../../../../../components/JvrisModal/styled";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";
import * as S from "./styled";

const ExcluirAtoTriagem = () => {
  const {
    openExcluirTriagemAtoModal,
    setOpenExcluirTriagemAtoModal,
    processoData,
    reload,
  } = useOperadorContext();

  const { setSelectedDataTable, setSelectedRowHashes } = SharedState();

  const { deleteAto } = useTriagensService();

  return (
    <BaseModal
      isOpenModal={openExcluirTriagemAtoModal}
      setOpenModal={setOpenExcluirTriagemAtoModal}
      title="Excluir Ato"
    >
      <SM.ContentWrapper>
        <S.ContainerFieldRow>
          <S.ContainerField
            style={{
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "1.4rem",
                padding: "1.6rem",
                fontWeight: "bold",
                border: "1px solid #ccc",
                borderColor: theme.colors.softRed,
                color: theme.colors.softRed,
              }}
            >
              Deseja realmente excluir o ato?
            </p>
          </S.ContainerField>
        </S.ContainerFieldRow>

        <S.ContainerSubmitButton
          style={{
            gap: "3rem",
          }}
        >
          <S.SubmitButton
            style={{
              backgroundColor: theme.colors.jvrisAqua,
            }}
            onClick={() => {
              deleteAto(processoData.id)
                .then((res) => {
                  if (res.status != 200) {
                    HotToastWarning(`Erro ao excluir ato! ${res.data.message}`);
                    return;
                  }
                  reload();
                  HotToastSucess("Ato excluído com sucesso!");
                  setOpenExcluirTriagemAtoModal(false);
                })
                .catch((err) => {
                  HotToastError("Erro ao excluir ato!");
                });
              setSelectedDataTable([]);
              setSelectedRowHashes([]);
            }}
          >
            Sim
          </S.SubmitButton>
          <S.SubmitButton
            style={{
              backgroundColor: theme.colors.softRed,
            }}
            onClick={() => setOpenExcluirTriagemAtoModal(false)}
          >
            Não
          </S.SubmitButton>
        </S.ContainerSubmitButton>
      </SM.ContentWrapper>
    </BaseModal>
  );
};

export default ExcluirAtoTriagem;

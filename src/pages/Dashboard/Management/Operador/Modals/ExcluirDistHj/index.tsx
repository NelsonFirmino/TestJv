import axiosInstance from "../../../../../../api/axiosInstance";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import * as SM from "../../../../../../components/JvrisModal/styled";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";
import ShowProcesss from "../ShowProcesss";
import * as S from "./styled";

const ExcluirDistHj = () => {
    const {
        setOpenDistHjExluirModal,
        reload,
        processosData,
        processoData,
        openDistHjExluirModal,
        secretaria
    } = useOperadorContext();

    async function handleDelete(procData?: any) {
        try {
            if (!procData) procData = processoData;
            const ct = await axiosInstance.delete(
                `api/v1.0/Distribuicoes/${procData.idTriagem}?dtDistribuicao=${procData.dtDistribuicao}&idSecretaria=${secretaria}`
            );
            setOpenDistHjExluirModal(false);
            if (!ct) throw new Error();
            if (ct.status == 400) throw new Error("Bad Request");

            HotToastSucess("Distribuição excluída com sucesso!");
            reload();
        } catch (error) {
            HotToastError("Erro ao excluir distribuição!");
        }
    }

    return (
        <BaseModal
            isOpenModal={openDistHjExluirModal}
            setOpenModal={setOpenDistHjExluirModal}
            title="Excluir distribuições selecionadas"
        >
            <div>
                <ShowProcesss />
                <SM.ContentWrapper>
                    <S.ContainerField
                        style={{
                            width: "100%"
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.4rem",
                                padding: "1.6rem",
                                fontWeight: "bold",
                                border: "1px solid #ccc",
                                borderColor: theme.colors.softRed,
                                color: theme.colors.softRed
                            }}
                        >
                            Tem certeza que deseja excluir essas distribuições?
                        </p>
                    </S.ContainerField>
                </SM.ContentWrapper>

                <S.ContainerSubmitButton
                    style={{
                        gap: "3rem"
                    }}
                >
                    <S.SubmitButton
                        style={{
                            backgroundColor: theme.colors.jvrisAqua
                        }}
                        onClick={async () => {
                            if (processosData.length === 0) {
                                handleDelete();
                            } else {
                                processosData.forEach(async (processoData) => {
                                    handleDelete(processoData);
                                });
                            }
                        }}
                    >
                        Sim
                    </S.SubmitButton>
                    <S.SubmitButton
                        style={{
                            backgroundColor: theme.colors.softRed
                        }}
                        onClick={() => setOpenDistHjExluirModal(false)}
                    >
                        Não
                    </S.SubmitButton>
                </S.ContainerSubmitButton>
            </div>
        </BaseModal>
    );
};

export default ExcluirDistHj;
function handleToast(arg0: string) {
    throw new Error("Function not implemented.");
}

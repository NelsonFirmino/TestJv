import * as SM from "../../../../../../components/JvrisModal/styled";
import * as S from "./styled";

import { useState } from "react";
import axiosInstance from "../../../../../../api/axiosInstance";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import JvrisLoading from "../../../../../../components/JvrisLoading";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";

const TomarCiencia = () => {
    const {
        openTomarCienciaModal,
        setOpenTomarCienciaModal,
        processoData,
        tomarCienciaNoJVRIS
    } = useOperadorContext();
    const { user, selectedUser } = SharedState();

    const [trying, setTrying] = useState(false);

    return (
        <BaseModal
            isOpenModal={openTomarCienciaModal}
            setOpenModal={setOpenTomarCienciaModal}
            title="Tomar ciência - ATENÇÃO"
        >
            <SM.ContentWrapper>
                <S.ContainerFieldRow>
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
                            Ao tomar ciência do Ato, a contagem de prazo no PJe
                            é iniciada. Tem certeza disto ?
                        </p>
                    </S.ContainerField>
                </S.ContainerFieldRow>

                <S.ContainerSubmitButton
                    style={{
                        gap: "3rem"
                    }}
                >
                    {!trying ? (
                        <>
                            <S.SubmitButton
                                style={{
                                    backgroundColor: theme.colors.jvrisAqua
                                }}
                                onClick={async () => {
                                    try {
                                        setTrying(true);
                                        const ct = await axiosInstance.patch(
                                            `api/v1.0/atos/tomar-ciencia`,
                                            {
                                                idAviso: processoData.id,
                                                apenasJvris:
                                                    tomarCienciaNoJVRIS,
                                                idUsuarioCadastro:
                                                    +user["Jvris.User.Id"]
                                            }
                                        );
                                        if (!ct) throw new Error();
                                        if (ct.status === 400)
                                            throw new Error();
                                        setTrying(false);
                                        setOpenTomarCienciaModal(false);
                                        HotToastSucess(
                                            "Ciência tomada com sucesso!"
                                        );
                                    } catch (error) {
                                        HotToastError("Erro ao tomar ciência!");
                                    }
                                }}
                            >
                                Sim
                            </S.SubmitButton>
                            <S.SubmitButton
                                style={{
                                    backgroundColor: theme.colors.softRed
                                }}
                                onClick={() => setOpenTomarCienciaModal(false)}
                            >
                                Não
                            </S.SubmitButton>
                        </>
                    ) : (
                        <JvrisLoading loading={true} />
                    )}
                </S.ContainerSubmitButton>
            </SM.ContentWrapper>
        </BaseModal>
    );
};

export default TomarCiencia;

import * as SM from "../../../../../../components/JvrisModal/styled";
import * as S from "./styled";

import axiosInstance from "../../../../../../api/axiosInstance";
import { BaseModal } from "../../../../../../components/BaseModal";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import theme from "../../../../../../globalStyle/theme";
import { useOperadorContext } from "../../context";
import ShowProcesss from "../ShowProcesss";
import useDistModal from "./useDistModal";

const EditarProc = () => {
    const {
        openEditarProcessoModal,
        setOpenEditarProcessoModal,
        processosData,
        processoData,
        reload
    } = useOperadorContext();
    const { user, selectedUser } = SharedState();
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
        setSelectedProcurador
    } = useDistModal();

    return (
        <BaseModal
            title="Editar em lote"
            isOpenModal={openEditarProcessoModal}
            setOpenModal={setOpenEditarProcessoModal}
        >
            <div>
                <ShowProcesss />
                <SM.ContentWrapper
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "20px"
                    }}
                >
                    <S.ContainerField>
                        <S.FieldTitle>Especializada</S.FieldTitle>
                        <S.CustomSelect
                            styles={{
                                menu: (provided, state) => ({
                                    ...provided,
                                    maxHeight: "140px"
                                }),
                                menuList: (provided, state) => ({
                                    ...provided,
                                    maxHeight: "140px"
                                })
                            }}
                            options={
                                especializadas &&
                                especializadas.map((especializada) => {
                                    return {
                                        value: especializada.id,
                                        label: especializada.txEspecializada
                                    };
                                })
                            }
                            onChange={(event: any) => {
                                setSelectedEspecializada(
                                    especializadas.find(
                                        (especializada) =>
                                            especializada.id === event.value
                                    )
                                );
                            }}
                            //value={selectedEspecializada && selectedEspecializada.id}
                            defaultValue={
                                selectedEspecializada &&
                                selectedEspecializada.id
                            }
                        />
                    </S.ContainerField>

                    <S.ContainerField>
                        <S.FieldTitle>Procuradores</S.FieldTitle>
                        <S.CustomSelect
                            styles={{
                                menu: (provided, state) => ({
                                    ...provided,
                                    maxHeight: "140px"
                                }),
                                menuList: (provided, state) => ({
                                    ...provided,
                                    maxHeight: "140px"
                                })
                            }}
                            options={
                                procuradores &&
                                procuradores.map((procurador) => {
                                    return {
                                        value: procurador.id,
                                        label: procurador.txProcurador
                                    };
                                })
                            }
                            onChange={(event: any) => {
                                setSelectedProcurador(
                                    procuradores.find(
                                        (procurador) =>
                                            procurador.id === event.value
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
                        gap: "3rem"
                    }}
                >
                    <S.SubmitButton
                        style={{
                            backgroundColor: theme.colors.jvrisAqua
                        }}
                        onClick={async () => {
                            if (!selectedEspecializada || !selectedProcurador) {
                                HotToastError(
                                    "Selecione uma especializada e um procurador!"
                                );
                                return;
                            }

                            processosData.forEach(async (processo) => {
                                //console.log(processo)
                                const obsTri = {
                                    idTriagem: processo.idTriagem,
                                    txObservacao: obs,
                                    idUsuarioCadastro: +user["Jvris.User.Id"]
                                };

                                try {
                                    //  string url = string.Format("{0}/v1.0/Distribuicoes/{1}/procurador/{2}", URL, idDistribuicao, idProcurador);
                                    if (
                                        processo.idTriagem != 0 &&
                                        selectedProcurador.id != 0
                                    ) {
                                        const res = await axiosInstance.patch(
                                            `api/v1.0/Distribuicoes/${processo.idTriagem}/procurador/${selectedProcurador.id}`
                                        );
                                        if (!res) throw new Error();
                                        if (res.status == 400)
                                            throw new Error("Bad Request");
                                        if (obs) {
                                            const res =
                                                await axiosInstance.post(
                                                    `api/v1.0/triagens-observacoes`,
                                                    obsTri
                                                );
                                            if (!res) throw new Error();
                                            if (res.status == 400)
                                                throw new Error("Bad Request");
                                        }
                                    }
                                    HotToastSucess(
                                        "Edição realizada com sucesso!"
                                    );
                                    setOpenEditarProcessoModal(false);
                                    reload();
                                } catch (error) {
                                    console.error(error);
                                    HotToastError("Erro ao Editar!");
                                }
                            });
                        }}
                    >
                        Distribuir
                    </S.SubmitButton>
                </S.ContainerSubmitButton>
            </div>
        </BaseModal>
    );
};

export default EditarProc;

import { useEffect, useState } from "react";
import { JustificativaI, RelevanciaI } from "..";
import axiosInstance from "../../../../../api/axiosInstance";
import { CustomTable } from "../../../../../components/CustomTable";
import {
    HotToastError,
    HotToastSucess
} from "../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../context/SharedContext";
import * as S from "../styled";

interface ListaClasseI {
    id: number;
    txRelevancia: string;
    idClasse: number;
    txClasse: string;
    dtCadastro: string;
    hrCadastro: string;
    idRelevancia: number;
    txJustificativa: string;
    idUsuarioCadastro: number;
}

interface ClasseI {
    id: number;
    txClasse: string;
    txSigla: string;
    isAtivo: boolean;
}

const Classes = ({
    relevancias,
    justificativas
}: {
    relevancias: RelevanciaI[];
    justificativas: JustificativaI[];
}) => {
    const [classes, setClasses] = useState<ClasseI[]>([]);
    const [listaClasses, setListaClasses] = useState<ListaClasseI[]>([]);

    const [selectedRelevancia, setSelectedRelevancia] =
        useState<RelevanciaI | null>(null);
    const [selectedJustificativa, setSelectedJustificativa] =
        useState<JustificativaI | null>(null);
    const [selectedClasse, setSelectedClasse] = useState<number | null>(null);
    const { user, selectedUser } = SharedState();
    const user_id =
        selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

    const listarClasses = () =>
        new Promise(async (resolve, reject) => {
            try {
                // var url = `${service}/v1.0/Processos/Relevancias/Classes`;
                const res = await axiosInstance.get(
                    "/api/v1.0/Processos/Relevancias/Classes"
                );

                if (res.data.message === "NotFound") {
                } else setListaClasses(res.data.data);
            } catch (error) {
                console.error(error);
            }
        });

    const getClasses = () =>
        new Promise(async (resolve, reject) => {
            try {
                //  string url = string.Format("{0}/v1.0/Classes?page=1&pageSize=100", URL);
                const res = await axiosInstance.get(
                    "/api/v1.0/Classes?page=1&pageSize=100"
                );

                if (res.data.message === "NotFound") {
                } else setClasses(res.data.data);
            } catch (error) {
                console.error(error);
            }
        });

    async function salvarClasse() {
        if (!selectedClasse || !selectedRelevancia || !selectedJustificativa) {
            HotToastError("Preencha todos os campos!");
            return;
        }

        const body = {
            dtCadastro: new Date().toISOString().split("T")[0],
            hrCadastro: new Date().toISOString().split("T")[1].split(".")[0],
            idUsuarioCadastro: user["Jvris.User.Id"],
            idRelevancia: selectedJustificativa?.id,
            idClasse: selectedClasse,
            txRelevancia: selectedRelevancia?.idRelevancia
        };
        try {
            await axiosInstance.post(
                "/api/v1.0/Processos/Relevancias/Classes",
                body
            );
            HotToastSucess("Classe salva com sucesso!");
            listarClasses();
        } catch (error) {
            HotToastError("Erro ao salvar classe!");
            console.error(error);
        }
    }

    async function deleteClasse(id: number) {
        try {
            await axiosInstance.delete(
                `/api/v1.0/Processos/Relevancias/Classes/${id}`
            );
            HotToastSucess("Classe excluída com sucesso!");
            listarClasses();
        } catch (error) {
            HotToastError("Erro ao excluir classe!");
            console.error(error);
        }
    }

    useEffect(() => {
        getClasses();
        listarClasses();
    }, []);

    return (
        <>
            <S.InputsContainer>
                <S.InputContainer flex={2}>
                    <S.InputLabel>Classes</S.InputLabel>
                    <S.Select
                        options={classes.map((classe) => ({
                            value: classe.id,
                            label: classe.txClasse
                        }))}
                        onChange={(e: any) => setSelectedClasse(e.value)}
                    />
                </S.InputContainer>
                <S.InputContainer flex={2}>
                    <S.InputLabel>Relevância</S.InputLabel>
                    <S.Select
                        options={relevancias.map((relevancia) => ({
                            value: relevancia.idRelevancia,
                            label: relevancia.txRelevancia
                        }))}
                        onChange={(e: any) =>
                            setSelectedRelevancia(
                                relevancias.find(
                                    (relevancia) =>
                                        relevancia.idRelevancia === e.value
                                )
                            )
                        }
                    />
                </S.InputContainer>
                <S.InputContainer flex={2}>
                    <S.InputLabel>Justificativa</S.InputLabel>
                    <S.Select
                        options={justificativas.map((justificativa) => ({
                            value: justificativa.id,
                            label: justificativa.txRelevancia
                        }))}
                        onChange={(e: any) =>
                            setSelectedJustificativa(
                                justificativas.find(
                                    (justificativa) =>
                                        justificativa.id === e.value
                                )
                            )
                        }
                    />
                </S.InputContainer>
                <S.SaveButtonContainer flex={1} onClick={salvarClasse}>
                    <S.ButtonLabel>Salvar</S.ButtonLabel>
                </S.SaveButtonContainer>
            </S.InputsContainer>

            <CustomTable
                columns={[
                    {
                        isSortable: true,
                        keyData: "txClasse",
                        name: "Classes"
                    },
                    {
                        isSortable: true,
                        keyData: "txRelevancia",
                        name: "Relevância"
                    },
                    {
                        isSortable: true,
                        keyData: "txJustificativa",
                        name: "Justificativa"
                    },
                    {
                        isSortable: false,
                        keyData: "fake123",
                        name: "",
                        component: {
                            element: (data) => (
                                <div
                                    onClick={() => deleteClasse(data.id)}
                                    style={{
                                        backgroundColor: "#fd5050",
                                        color: "white",
                                        cursor: "pointer",
                                        width: "fit-content",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        fontSize: "1.2rem"
                                    }}
                                >
                                    Excluir
                                </div>
                            ),
                            isButton: true
                        }
                    }
                ]}
                data={listaClasses}
                isLoading={false}
                showPagination
                showSearchField
                showSelectNumberOfRows
            />
        </>
    );
};

export default Classes;

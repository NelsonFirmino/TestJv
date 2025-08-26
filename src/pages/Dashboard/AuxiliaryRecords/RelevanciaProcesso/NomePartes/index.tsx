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

interface NomePartesI {
    id: number;
    txRelevancia: string;
    txNomeParte: string;
    dtCadastro: string;
    hrCadastro: string;
    idRelevancia: number;
    txJustificativa: string;
    idUsuarioCadastro: number;
}

const NomePartes = ({
    relevancias,
    justificativas
}: {
    relevancias: RelevanciaI[];
    justificativas: JustificativaI[];
}) => {
    const [nomePartes, setNomePartes] = useState<NomePartesI[]>([]);
    const [nomeParte, setNomeParte] = useState<string>("");

    const [selectedRelevancia, setSelectedRelevancia] =
        useState<RelevanciaI | null>(null);
    const [selectedJustificativa, setSelectedJustificativa] =
        useState<JustificativaI | null>(null);
    const { user, selectedUser } = SharedState();

    const listarNomePartes = () =>
        new Promise(async (resolve, reject) => {
            try {
                //var url = `${service}/v1.0/Processos/Relevancias/NomePartes`;
                const res = await axiosInstance.get(
                    "/api/v1.0/Processos/Relevancias/NomePartes"
                );

                if (res.data.message === "NotFound") {
                } else setNomePartes(res.data.data);
            } catch (error) {
                console.error(error);
            }
        });

    async function salvarNomesPartes() {
        if (!nomeParte || !selectedRelevancia || !selectedJustificativa) {
            HotToastError("Preencha todos os campos!");
            return;
        }

        const body = {
            txNomeParte: nomeParte,
            txRelevancia: selectedRelevancia.idRelevancia,
            dtCadastro: new Date().toISOString().split("T")[0],
            hrCadastro: new Date().toISOString().split("T")[1].split(".")[0],
            idUsuarioCadastro: user["Jvris.User.Id"],
            idRelevancia: selectedJustificativa?.id
        };

        await axiosInstance.post(
            "/api/v1.0/Processos/Relevancias/NomePartes",
            body
        );
        listarNomePartes();
    }

    async function excluirNomeParte(id: number) {
        try {
            await axiosInstance.delete(
                `/api/v1.0/Processos/Relevancias/NomePartes/${id}`
            );
            HotToastSucess("Nome da Parte excluído com sucesso!");
            listarNomePartes();
        } catch (error) {
            HotToastError("Erro ao excluir Nome da Parte!");
            console.error(error);
        }
    }

    useEffect(() => {
        listarNomePartes();
    }, []);

    return (
        <>
            <S.InputsContainer>
                <S.InputContainer flex={3}>
                    <S.InputLabel>Nome das Partes</S.InputLabel>
                    <S.Input
                        value={nomeParte}
                        onChange={(e) => setNomeParte(e.target.value)}
                    />
                </S.InputContainer>
                <S.InputContainer flex={1}>
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
                <S.SaveButtonContainer flex={1} onClick={salvarNomesPartes}>
                    Salvar
                </S.SaveButtonContainer>
            </S.InputsContainer>

            <CustomTable
                showPagination
                showSearchField
                showSelectNumberOfRows
                columns={[
                    {
                        isSortable: true,
                        name: "Nome da Parte",
                        keyData: "txNomeParte"
                    },
                    {
                        isSortable: true,
                        name: "Relevância",
                        keyData: "txRelevancia"
                    },
                    {
                        isSortable: true,
                        name: "Justificativa",
                        keyData: "txJustificativa"
                    },
                    {
                        isSortable: false,
                        keyData: "fake123",
                        name: "",
                        component: {
                            element: (data) => (
                                <div
                                    onClick={() => excluirNomeParte(data.id)}
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
                data={nomePartes}
                isLoading={false}
            />
        </>
    );
};

export default NomePartes;

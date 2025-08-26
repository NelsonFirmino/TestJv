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

const Valores = ({
    relevancias,
    justificativas
}: {
    relevancias: RelevanciaI[];
    justificativas: JustificativaI[];
}) => {
    const [valor, setValor] = useState<string>();
    const [selectedRelevancia, setSelectedRelevancia] =
        useState<RelevanciaI | null>(null);
    const [selectedJustificativa, setSelectedJustificativa] =
        useState<JustificativaI | null>(null);
    const [listaValores, setListaValores] = useState<any[]>([]);
    const { user, selectedUser } = SharedState();

    const listarValores = () =>
        new Promise(async (resolve, reject) => {
            try {
                //var url = `${service}/v1.0/Processos/Relevancias/Valores`;
                const res = await axiosInstance.get(
                    "/api/v1.0/Processos/Relevancias/Valores"
                );
                if (res.data.message === "NotFound") {
                } else setListaValores(res.data.data);
            } catch (error) {}
        });

    async function salvarValor() {
        if (!valor || !selectedRelevancia || !selectedJustificativa) {
            HotToastError("Preencha todos os campos!");
            return;
        }

        const body = {
            dtCadastro: new Date().toISOString().split("T")[0],
            hrCadastro: new Date().toISOString().split("T")[1].split(".")[0],
            idUsuarioCadastro: user["Jvris.User.Id"],
            idRelevancia: selectedJustificativa?.id,
            nuValor: parseInt(valor),
            txRelevancia: selectedRelevancia?.idRelevancia
        };
        // string url = string.Format("{0}/v1.0/Processos/Relevancias/Valores", URL);

        const res = await axiosInstance.post(
            "/api/v1.0/Processos/Relevancias/Valores",
            body
        );

        listarValores();
    }
    async function deletarValor(id: number) {
        try {
            // string url = string.Format("{0}/v1.0/Processos/Relevancias/Valores/{1}", URL, id);
            await axiosInstance.delete(
                `/api/v1.0/Processos/Relevancias/Valores/${id}`
            );
            HotToastSucess("Valor excluído com sucesso!");
            listarValores();
        } catch (error) {
            HotToastError("Erro ao excluir valor!");
            console.error(error);
        }
    }

    useEffect(() => {
        listarValores();
    }, []);

    return (
        <>
            <S.InputsContainer>
                <S.InputContainer flex={2}>
                    <S.InputLabel>Valor (R$)</S.InputLabel>
                    <S.Input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
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
                <S.SaveButtonContainer flex={1} onClick={salvarValor}>
                    <S.ButtonLabel>Salvar</S.ButtonLabel>
                </S.SaveButtonContainer>
            </S.InputsContainer>

            <CustomTable
                columns={[
                    {
                        isSortable: true,
                        keyData: "nuValor",
                        name: "Valor",
                        formatToCurrency: true
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
                                    onClick={() => deletarValor(data.id)}
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
                data={listaValores}
                isLoading={false}
                showPagination
                showSearchField
                showSelectNumberOfRows
            />
        </>
    );
};

export default Valores;

import { useEffect, useState } from "react";
import { JustificativaI, RelevanciaI } from "..";
import axiosInstance from "../../../../../api/axiosInstance";
import { CustomTable } from "../../../../../components/CustomTable";
import { SharedState } from "../../../../../context/SharedContext";
import * as S from "../styled";

const Assuntos = ({
    relevancias,
    justificativas
}: {
    relevancias: RelevanciaI[];
    justificativas: JustificativaI[];
}) => {
    const { user } = SharedState();
    const [assunto, setAssunto] = useState<string>();
    const [selectedRelevancia, setSelectedRelevancia] =
        useState<RelevanciaI | null>(null);
    const [selectedJustificativa, setSelectedJustificativa] =
        useState<JustificativaI | null>(null);
    const [listaAssuntos, setListaAssuntos] = useState<any[]>([]);

    const listarAssuntos = () =>
        new Promise(async (resolve, reject) => {
            try {
                //var url = `${service}/v1.0/Processos/Relevancias/Assuntos`;
                const res = await axiosInstance.get(
                    "/api/v1.0/Processos/Relevancias/Assuntos"
                );
                if (res.data.message === "NotFound") {
                } else setListaAssuntos(res.data.data);
            } catch (error) {}
        });

    async function salvarAssunto() {
        const body = {
            dtCadastro: new Date().toISOString().split("T")[0],
            hrCadastro: new Date().toISOString().split("T")[1].split(".")[0],
            idUsuarioCadastro: +user["Jvris.User.Id"],
            idRelevancia: selectedJustificativa?.id,
            txAssunto: assunto,
            txRelevancia: selectedRelevancia?.idRelevancia
        };
        // string url = string.Format("{0}/v1.0/Processos/Relevancias/Assuntos", URL);
        const res = await axiosInstance.post(
            "/api/v1.0/Processos/Relevancias/Assuntos",
            body
        );
        listarAssuntos();
    }

    useEffect(() => {
        listarAssuntos();
    }, []);

    return (
        <>
            <S.InputsContainer>
                <S.InputContainer flex={2}>
                    <S.InputLabel>Assunto</S.InputLabel>
                    <S.Input
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
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
                <S.SaveButtonContainer flex={1} onClick={salvarAssunto}>
                    <S.ButtonLabel>Salvar</S.ButtonLabel>
                </S.SaveButtonContainer>
            </S.InputsContainer>

            <CustomTable
                columns={[
                    {
                        isSortable: true,
                        keyData: "txAssunto",
                        name: "Assunto"
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
                                    onClick={async () => {
                                        try {
                                            await axiosInstance.delete(
                                                `/api/v1.0/Processos/Relevancias/Assuntos/${data.id}`
                                            );

                                            listarAssuntos();
                                        } catch (error) {}
                                    }}
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
                data={listaAssuntos}
                showPagination
                showSearchField
                showSelectNumberOfRows
                isLoading={false}
            />
        </>
    );
};

export default Assuntos;

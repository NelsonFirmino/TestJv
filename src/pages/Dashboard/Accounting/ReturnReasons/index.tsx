import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import theme from "../../../../globalStyle/theme";
import { useMotivosDevolucao } from "../../../../hooks/useMotivosDevolucao";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const ReturnReasons = () => {
    const { motivosDevolucaoAll, isLoadingMotivosDevolucao } =
        useMotivosDevolucao();

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txMotivo, setTxMotivo] = useState("");

    const resetStates = () => {
        setId(null);
        setTxMotivo("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txMotivo={txMotivo}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txMotivo={txMotivo}
                />
            )}

            <PageTitle
                pageTitle="MOTIVOS PARA DEVOLUÇÃO"
                pageIcon={<S.PageIcon />}
            />

            <S.Wrapper>
                <S.Row>
                    <S.ContainerButtons>
                        <S.SubmitButton
                            onClick={() => {
                                resetStates();
                                setShowModalAdd(!showModalAdd);
                            }}
                        >
                            Adicionar
                        </S.SubmitButton>
                    </S.ContainerButtons>
                </S.Row>

                <CustomTable
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txMotivo",
                            name: "Motivo",
                            breakTextOnFirstColumn: true
                        },

                        {
                            isSortable: false,
                            keyData: "fake123",
                            name: "",
                            component: {
                                element: (item) => (
                                    <S.Button
                                        hoverColor={theme.colors.softYellow}
                                    >
                                        <PencilSimple
                                            color="white"
                                            onClick={() => {
                                                setId(item.id);

                                                setTxMotivo(item.txMotivo);
                                                setShowModalAdd(true);
                                            }}
                                            weight="fill"
                                            size={20}
                                        />
                                    </S.Button>
                                ),
                                isButton: true
                            }
                        },
                        {
                            isSortable: false,
                            keyData: "fake123",
                            name: "",
                            component: {
                                element: (item) => (
                                    <S.Button hoverColor={theme.colors.softRed}>
                                        <X
                                            color="white"
                                            onClick={() => {
                                                setId(item.id);
                                                setTxMotivo(item.txMotivo);
                                                setShowModalRemove(true);
                                            }}
                                            weight="bold"
                                            size={20}
                                        />
                                    </S.Button>
                                ),
                                isButton: true
                            }
                        }
                    ]}
                    data={motivosDevolucaoAll?.data ?? []}
                    isLoading={false}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default ReturnReasons;

import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useCaixas } from "../../../../hooks/useCaixas";
import { Action, Actions } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const Caixas = () => {
    const { caixas, isLoadingCaixas } = useCaixas();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txCaixa, setTxCaixa] = useState("");

    const resetStates = () => {
        setId(null);
        setTxCaixa("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txCaixa={txCaixa}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txCaixa={txCaixa}
                />
            )}

            <PageTitle pageTitle="LISTA DE CAIXAS" pageIcon={<S.PageIcon />} />

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
                    data={caixas?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txCaixa",
                            name: "Caixa"
                        },

                        {
                            isSortable: false,
                            keyData: "fake",
                            name: "Ações",
                            component: {
                                isButton: false,
                                element: (data) => (
                                    <Actions>
                                        <Action
                                            onClick={() => {
                                                setId(data.id);
                                                setTxCaixa(data.txCaixa);
                                                setShowModalAdd(true);
                                            }}
                                        >
                                            <PencilSimple
                                                weight="bold"
                                                size={20}
                                            />
                                        </Action>
                                        <Action
                                            onClick={() => {
                                                setId(data.id);
                                                setTxCaixa(data.txCaixa);
                                                setShowModalRemove(true);
                                            }}
                                        >
                                            <X weight="bold" size={20} />
                                        </Action>
                                    </Actions>
                                )
                            }
                        }
                    ]}
                    isLoading={false}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default Caixas;

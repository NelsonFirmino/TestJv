import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useSistemasProcessuais } from "../../../../hooks/useSistemasProcessuais";
import { Action, Actions } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const SistemasProcessuais = () => {
    const { sistemasProcessuais, isLoadingSistemasProcessuais } =
        useSistemasProcessuais();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txSistemaProcessual, setTxSistemaProcessual] = useState("");

    const resetStates = () => {
        setId(null);
        setTxSistemaProcessual("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txSistemaProcessual={txSistemaProcessual}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txSistemaProcessual={txSistemaProcessual}
                />
            )}

            <PageTitle
                pageTitle="LISTA DOS SISTEMAS PROCESSUAIS"
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
                    data={sistemasProcessuais?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txSistemaProcessual",
                            name: "Sistema Processual"
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
                                                setTxSistemaProcessual(
                                                    data.txSistemaProcessual
                                                );
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
                                                setTxSistemaProcessual(
                                                    data.txSistemaProcessual
                                                );
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
                    isLoading={isLoadingSistemasProcessuais}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default SistemasProcessuais;

import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useAllTribunais } from "../../../../hooks/useTribunais";
import { Action, Actions } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const Tribunais = () => {
    const { tribunais, isLoadingTribunais } = useAllTribunais();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txTribunal, setTxTribunal] = useState("");
    const [txSigla, setTxSigla] = useState("");

    const resetStates = () => {
        setId(null);
        setTxTribunal("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txTribunal={txTribunal}
                    txSigla={txSigla}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txTribunal={txTribunal}
                    txSigla={txSigla}
                />
            )}

            <PageTitle
                pageTitle="LISTA DE TRIBUNAIS"
                pageIcon={<S.PageIcon />}
            />

            <S.Wrapper>
                x
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
                    data={tribunais?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txTribunal",
                            name: "Tribunal"
                        },
                        {
                            isSortable: true,
                            keyData: "txSigla",
                            name: "Sigla"
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
                                                setTxTribunal(data.txTribunal);
                                                setTxSigla(data.txSigla);
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
                                                setTxTribunal(data.txTribunal);
                                                setTxSigla(data.txSigla);
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
                    isLoading={isLoadingTribunais}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default Tribunais;

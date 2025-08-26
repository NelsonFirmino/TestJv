import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useTiposAusencias } from "../../../../hooks/useTiposAusencias";
import { Actions } from "../Assuntos/styled";
import { Action } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const TiposAusencias = () => {
    const { tiposAusencias, isLoadingTiposAusencias } = useTiposAusencias();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txTiposAusencia, setTxTiposAusencia] = useState("");

    const resetStates = () => {
        setId(null);
        setTxTiposAusencia("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txTipoAusencia={txTiposAusencia}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txTipoAusencia={txTiposAusencia}
                />
            )}

            <PageTitle
                pageTitle="LISTA TIPOS DE AUSÊNCIAS"
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
                    data={tiposAusencias?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txTipoAusencia",
                            name: "Tipo de Ausência"
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
                                                setTxTiposAusencia(
                                                    data.txTipoAusencia
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
                                                setTxTiposAusencia(
                                                    data.txTipoAusencia
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
                    isLoading={isLoadingTiposAusencias}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default TiposAusencias;

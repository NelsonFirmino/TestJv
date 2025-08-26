import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useMotoristas } from "../../../../hooks/useMotoristas";
import { Action, Actions } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const Motoristas = () => {
    const { motoristas, isLoadingMotoristas } = useMotoristas();
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txMotorista, setTxMotorista] = useState("");

    const resetStates = () => {
        setId(null);
        setTxMotorista("");
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    setShowModalAdd={setShowModalAdd}
                    id={id}
                    txMotorista={txMotorista}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txMotorista={txMotorista}
                />
            )}

            <PageTitle
                pageTitle="LISTA DE MOTORISTAS"
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
                    data={motoristas?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txMotorista",
                            name: "Motorista"
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
                                                setTxMotorista(
                                                    data.txMotorista
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
                                                setTxMotorista(
                                                    data.txMotorista
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
                    isLoading={isLoadingMotoristas}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default Motoristas;

import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useAssuntosSemPaginacao } from "../../../../hooks/useAssuntosSemPaginacao";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const Assuntos = () => {
    const [showModalRemove, setShowModalRemove] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const { assuntosSemPaginacao, isLoadingAssuntosSemPaginacao } =
        useAssuntosSemPaginacao();

    const [id, setId] = useState<number>(null);
    const [txAssunto, setTxAssunto] = useState("");
    const [txPai, setTxPai] = useState("");
    const [txMateria, setTxMateria] = useState("");
    const [idAssunto_Pai, setIdAssunto_Pai] = useState<number>(null);
    const [idMateria, setIdMateria] = useState<number>(null);

    const resetStates = () => {
        setId(null);
        setTxAssunto("");
        setTxPai("");
        setTxMateria("");
        setIdAssunto_Pai(null);
        setIdMateria(null);
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    id={id}
                    txAssunto={txAssunto}
                    txPai={txPai}
                    txMateria={txMateria}
                    idAssunto_Pai={idAssunto_Pai}
                    idMateria={idMateria}
                    setShowModalAdd={setShowModalAdd}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txAssunto={txAssunto}
                />
            )}

            <PageTitle
                pageTitle="LISTA DE ASSUNTOS"
                pageIcon={<S.PageIcon />}
            />

            <S.Wrapper>
                <S.Row>
                    <S.ContainerButtons>
                        <S.SubmitButton
                            onClick={() => {
                                resetStates();
                                setShowModalAdd(true);
                            }}
                        >
                            Adicionar
                        </S.SubmitButton>
                    </S.ContainerButtons>
                </S.Row>

                <CustomTable
                    data={assuntosSemPaginacao?.data ?? []}
                    possibleDataKeyToBeNull={[
                        { key: "txPai", fallback: "--" },
                        { key: "txMateria", fallback: "--" }
                    ]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txAssunto",
                            name: "Assunto"
                        },
                        {
                            isSortable: true,
                            keyData: "txPai",
                            name: "Vinculado"
                        },
                        {
                            isSortable: true,
                            keyData: "txMateria",
                            name: "Matéria"
                        },

                        {
                            isSortable: false,
                            keyData: "fake",
                            name: "Ações",
                            component: {
                                isButton: false,
                                element: (data) => (
                                    <S.Actions>
                                        <S.Action
                                            onClick={() => {
                                                setId(data.id);
                                                setTxAssunto(data.txAssunto);
                                                setTxPai(data.txPai);
                                                setIdAssunto_Pai(
                                                    data.idAssunto_Pai
                                                );
                                                setTxMateria(data.txMateria);
                                                setIdMateria(data.idMateria);
                                                setShowModalAdd(true);
                                            }}
                                        >
                                            <PencilSimple
                                                weight="bold"
                                                size={20}
                                            />
                                        </S.Action>
                                        <S.Action
                                            onClick={() => {
                                                setId(data.id);
                                                setTxAssunto(data.txAssunto);
                                                setShowModalRemove(true);
                                            }}
                                        >
                                            <X weight="bold" size={20} />
                                        </S.Action>
                                    </S.Actions>
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

export default Assuntos;

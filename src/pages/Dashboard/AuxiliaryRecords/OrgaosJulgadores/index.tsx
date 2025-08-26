import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useOrgaoJulgador } from "../../../../hooks/useOrgaoJulgador";
import { Action, Actions } from "../Comarcas/styled";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const OrgaosJulgadores = () => {
    const { orgaosJulgadores, isLoadingOrgaosJulgadores } = useOrgaoJulgador();

    const [showModalRemove, setShowModalRemove] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const [id, setId] = useState<number>(null);
    const [txOrgaoJulgador, setTxOrgaoJulgador] = useState("");
    const [txSigla, setTxSigla] = useState("");
    const [nuInstancia, setNuInstancia] = useState<number>(null);
    const [idTribunal, setIdTribunal] = useState<number>(null);
    const [idComarca, setIdComarca] = useState<number>(null);
    const [isAtivo, setIsAtivo] = useState(true);

    const resetStates = () => {
        setId(null);
        setTxOrgaoJulgador("");
        setTxSigla("");
        setNuInstancia(null);
        setIdTribunal(null);
        setIdComarca(null);
        setIsAtivo(true);
    };

    return (
        <>
            {showModalAdd && (
                <ModalAdd
                    id={id}
                    txOrgaoJulgador={txOrgaoJulgador}
                    txSigla={txSigla}
                    nuInstancia={nuInstancia}
                    idTribunal={idTribunal}
                    idComarca={idComarca}
                    isAtivo={isAtivo}
                    setShowModalAdd={setShowModalAdd}
                />
            )}

            {showModalRemove && (
                <ModalRemove
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                    txOrgaoJulgador={txOrgaoJulgador}
                />
            )}

            <PageTitle
                pageTitle="LISTA DE ÓRGÃOS JULGADORES"
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
                    data={orgaosJulgadores?.data ?? []}
                    possibleDataKeyToBeNull={[]}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txOrgaoJulgador",
                            name: "Órgão Julgador"
                        },
                        {
                            isSortable: true,
                            keyData: "txSigla",
                            name: "Sigla"
                        },
                        {
                            isSortable: true,
                            keyData: "nuInstancia",
                            name: "Instância"
                        },
                        {
                            isSortable: true,
                            keyData: "txTribunal",
                            name: "Tribunal"
                        },
                        {
                            isSortable: true,
                            keyData: "txComarca",
                            name: "Comarca"
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
                                                setTxOrgaoJulgador(
                                                    data.txOrgaoJulgador
                                                );
                                                setTxSigla(data.txSigla);
                                                setNuInstancia(
                                                    data.nuInstancia
                                                );
                                                setIdTribunal(data.idTribunal);
                                                setIdComarca(data.idComarca);
                                                setIsAtivo(data.isAtivo);
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
                                                setTxOrgaoJulgador(
                                                    data.txOrgaoJulgador
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
                    isLoading={isLoadingOrgaosJulgadores}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                />
            </S.Wrapper>
        </>
    );
};

export default OrgaosJulgadores;

import { PencilSimple, X } from "phosphor-react";
import { useState } from "react";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useComarcas } from "../../../../hooks/useComarcas";
import { ModalAddEditComarca } from "./components/ModalAddEditComarca";
import { ModalRemoveComarca } from "./components/ModalRemoveComarca";
import * as S from "./styled";

const Comarcas = () => {
    const { comarcas, loadingComarcasList } = useComarcas();
    const [idComarca, setIdComarca] = useState<number>(null);
    const [txComarca, setTxComarca] = useState<string>("");
    const [idRegional, setIdRegional] = useState(null);
    const [showModalAddEditComarca, setShowModalAddEditComarca] =
        useState(false);
    const [showModalRemoveComarca, setShowModalRemoveComarca] = useState(false);

    return (
        <>
            {showModalAddEditComarca && (
                <ModalAddEditComarca
                    id={idComarca}
                    txComarca={txComarca}
                    idRegional={idRegional}
                    setShowModalAddEditComarca={setShowModalAddEditComarca}
                />
            )}

            {showModalRemoveComarca && (
                <ModalRemoveComarca
                    id={idComarca}
                    setShowModalRemoveComarca={setShowModalRemoveComarca}
                />
            )}
            <PageTitle pageTitle="COMARCAS" pageIcon={<S.PageIcon />} />

            <S.Wrapper>
                <S.Row>
                    <S.ContainerButtons>
                        <S.SubmitButton
                            onClick={() => {
                                setIdComarca(null);
                                setTxComarca("");
                                setShowModalAddEditComarca(
                                    !showModalAddEditComarca
                                );
                            }}
                        >
                            Adicionar
                        </S.SubmitButton>
                    </S.ContainerButtons>
                </S.Row>

                <CustomTable
                    data={comarcas?.data ?? []}
                    columns={[
                        {
                            isSortable: true,
                            keyData: "txComarca",
                            name: "Comarca"
                        },
                        {
                            isSortable: true,
                            keyData: "txRegional",
                            name: "Regionais"
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
                                                setIdComarca(data.id);
                                                setTxComarca(data.txComarca);
                                                setIdRegional(data.idRegional);
                                                setShowModalAddEditComarca(
                                                    !showModalAddEditComarca
                                                );
                                            }}
                                        >
                                            <PencilSimple
                                                weight="bold"
                                                size={20}
                                            />
                                        </S.Action>
                                        <S.Action
                                            onClick={() => {
                                                setIdComarca(data.id);
                                                setShowModalRemoveComarca(
                                                    !showModalRemoveComarca
                                                );
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

export default Comarcas;

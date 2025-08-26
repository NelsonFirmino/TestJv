import { PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { getReasonsRequests } from "../../../../api/services/reasonsRequests/reasonsRequests";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import theme from "../../../../globalStyle/theme";
import { ModalAdd } from "./components/ModalAdd";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

const RequestReasons = () => {
    const [listData, setListData] = useState([]);

    const [showModalAdd, setShowModalAdd] = useState<boolean>(null);
    const [showModalEditar, setShowModalEditar] = useState<boolean>(null);
    const [showModalRemove, setShowModalRemove] = useState<boolean>(null);

    const [id, setId] = useState<number>(0);
    const [txRazaoPedido, setTxRazaoPedido] = useState("");
    const [txInformacao, setTxInformacao] = useState("");

    useEffect(() => {
        getReasonsRequests({ pageSize: "200" }).then((response) => {
            setListData(response.data);
        });
    }, []);

    useEffect(() => {
        if (
            showModalAdd == false ||
            showModalEditar == false ||
            showModalRemove == false
        ) {
            getReasonsRequests({ pageSize: "200" }).then((response) => {
                setListData(response.data);
                resetStates();
            });
        }
    }, [showModalAdd, showModalEditar, showModalRemove]);

    const resetStates = () => {
        setShowModalAdd(null);
        setShowModalEditar(null);
        setShowModalRemove(null);
    };

    return (
        <>
            {showModalAdd && <ModalAdd setShowModalAdd={setShowModalAdd} />}

            {showModalEditar && (
                <ModalAdd
                    setShowModalAdd={setShowModalEditar}
                    id={id}
                    txRazaoPedido={txRazaoPedido}
                    txInformacao={txInformacao}
                />
            )}

            {showModalRemove && (
                <ModalRemove setShowModalRemove={setShowModalRemove} id={id} />
            )}

            <PageTitle
                pageTitle="RAZÕES PARA PEDIDOS"
                pageIcon={<S.PageIcon />}
            />
            <S.Wrapper>
                <S.Row
                    style={{ justifyContent: "flex-end", marginBottom: "2rem" }}
                >
                    <S.ContainerButtons>
                        <S.SubmitButton
                            title="Adicionar Razões para Pedidos"
                            onClick={() => {
                                setShowModalAdd(!showModalAdd);
                            }}
                        >
                            Adicionar
                        </S.SubmitButton>
                    </S.ContainerButtons>
                </S.Row>
                {listData && (
                    <S.TableWrapper>
                        <CustomTable
                            columns={[
                                {
                                    isSortable: true,
                                    keyData: "txRazaoPedido",
                                    name: "Razão para Pedidos",
                                    breakTextOnFirstColumn: true
                                },
                                {
                                    isSortable: true,
                                    keyData: "txInformacao",
                                    name: "Informação"
                                },
                                {
                                    isSortable: true,
                                    keyData: "dtCadastro",
                                    name: "Data de Cadastro"
                                },
                                {
                                    isSortable: false,
                                    keyData: "fake123",
                                    name: "",
                                    component: {
                                        element: (item) => (
                                            <S.Button
                                                hoverColor={
                                                    theme.colors.softYellow
                                                }
                                            >
                                                <PencilSimple
                                                    color="white"
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setTxRazaoPedido(
                                                            item.txRazaoPedido
                                                        );
                                                        setTxInformacao(
                                                            item.txInformacao
                                                        );
                                                        setShowModalEditar(
                                                            true
                                                        );
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
                                            <S.Button
                                                hoverColor={
                                                    theme.colors.softRed
                                                }
                                            >
                                                <X
                                                    color="white"
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setShowModalRemove(
                                                            true
                                                        );
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
                            data={listData}
                            isLoading={false}
                            showPagination
                            showSearchField
                            showSelectNumberOfRows
                        />
                        {/* <JvrisTable
              download
              autoPrimaryColumn={false}
              
              columns={[
                { text: "RAZÃO PARA PEDIDOS" },
                { text: "INFORMAÇÃO" },
                { text: "	DATA DE CADASTRO" },
              ]}
              data={formatDataToTableExtra({
                content: listData,
                keysToInclude: ["txRazaoPedido", "txInformacao", "dtCadastro"],
                keysToFormatAsDate: ["dtCadastro"],
              })}
              GenericButton={[
                {
                  hoverColor: theme.colors.softYellow,
                  icon: <PencilSimple weight="fill" size={20} />,
                  onClick: (index) => {
                    setId(listData[index].id);
                    setTxRazaoPedido(listData[index].txRazaoPedido);
                    setTxInformacao(listData[index].txInformacao);
                    setShowModalEditar(!showModalEditar);
                  },
                },
                {
                  hoverColor: theme.colors.softRed,
                  icon: <X weight="bold" size={20} />,
                  onClick: (index) => {
                    setId(listData[index].id);
                    setShowModalRemove(!showModalRemove);
                  },
                },
              ]}
            /> */}
                    </S.TableWrapper>
                )}
            </S.Wrapper>
        </>
    );
};

export default RequestReasons;

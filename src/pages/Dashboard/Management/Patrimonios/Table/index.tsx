import jwtDecode from "jwt-decode";
import { Check, Eye, File, PencilSimple, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "../../../../../components/CustomTable";
import { formatArea } from "../../../../../utils/formatNumber.util";
import { getCartorio } from "../apiHooks/usePatrimonios";
import { usePatrimoniosContext } from "../context";
import { PatrimonioI } from "../interfaces";
import * as S from "../styled";

interface PatrimoniosTableProps {
    isLoadingPatrimonios: boolean;
    patrimonios: PatrimonioI[];
}

const PatrimoniosTable = ({
    isLoadingPatrimonios,
    patrimonios
}: PatrimoniosTableProps) => {
    const {
        setAtivarDesativarModal,
        setClikedData,
        setAnexosModal,
        visualizarModal,
        setVisualizarModal
    } = usePatrimoniosContext();
    const navigate = useNavigate();
    const [patriFlat, setPatriFlat] = useState<any[]>([]);

    useEffect(() => {
        async function fillTableData() {
            const p = [];
            for (let i = 0; i < patrimonios.length; i++) {
                const patrimonio = patrimonios[i];
                const ours = patrimonio?.outorgas?.reduce((acc, outorga) => {
                    return acc + outorga.txNome + ", ";
                }, "");
                const outorgas = ours.length > 0 ? ours : undefined;
                const cartorio = await getCartorio(
                    patrimonio?.dadosAdicionais?.idCartorio
                );
                p.push({
                    ...patrimonio,
                    txMatricula: patrimonio?.dadosAdicionais?.txMatricula,
                    cartorio: cartorio?.txOficio,
                    txMunicipio: patrimonio?.endereco?.txMunicipio,
                    outorgas
                });
            }
            setPatriFlat(p);
        }
        if (patrimonios) fillTableData();
    }, [patrimonios]);

    const tokenString = localStorage.getItem("token")!;
    const token: any = jwtDecode(tokenString);
    const isGestor =
        token["Jvris.User.isGestorPatrimonio"].toLowerCase() === "true";
    return (
        <CustomTable
            isLoading={isLoadingPatrimonios}
            showSearchField
            showSelectNumberOfRows
            showPagination
            showClearButton
            selectRows
            selectDataColumnButton={{
                columns: [
                    {
                        name: "Ano de aquisição",
                        key: "nuAnoAquisicao"
                    },
                    {
                        name: "Forma de aquisição",
                        key: "txFomaAquisicao"
                    },
                    /*  {
                        name: 'Tipo de Imóvel',
                        key: 'idTipoImovel'
                    }, */
                    {
                        name: "Município",
                        key: "txMunicipio"
                    },
                    {
                        name: "Cartório de Registro do Imóvel",
                        key: "cartorio"
                    },
                    {
                        name: "Data de Cadastro",
                        key: "dtCadastro",
                        formatDate: true
                    },
                    {
                        name: "Área Total",
                        key: "nuAreaTotal"
                    }
                    /* {
                        name: "Outorgante(s)",
                        key: "outorgas"
                    } */
                ]
            }}
            columns={[
                {
                    name: "Ano de aquisição",
                    isSortable: true,
                    keyData: "nuAnoAquisicao"
                },
                {
                    name: "Forma de aquisição",
                    isSortable: true,
                    keyData: "txFomaAquisicao"
                },
                {
                    name: "Outorgante(s)",
                    isSortable: true,
                    keyData: "outorgas",
                    component: {
                        isButton: false,
                        element: (data) => (
                            <S.Label>
                                {data.outorgas
                                    ? data.outorgas.slice(0, -2)
                                    : "--"}
                            </S.Label>
                        )
                    }
                },
                {
                    name: "Matricula",
                    isSortable: true,
                    keyData: "txMatricula"
                    /* component: {
                        isButton: false,
                        element: (data) => (
                            <S.Label>
                                {data.dadosAdicionais.txMatricula}
                            </S.Label>
                        )
                    } */
                },
                {
                    name: "Cartório de Registro do Imóvel",
                    isSortable: true,
                    keyData: "cartorio"
                    /* component: {
                        isButton: false,
                        element: (data) => (
                            <S.Label>
                                {data.dadosAdicionais.cartorio.id}
                            </S.Label>
                        )
                    } */
                },
                {
                    name: "Município",
                    isSortable: true,
                    keyData: "txMunicipio"
                    /* component: {
                        isButton: false,
                        element: (data) => (
                            <S.Label>{data.endereco.txMunicipio}</S.Label>
                        )
                    } */
                },
                {
                    name: "Data de Cadastro",
                    isSortable: true,
                    keyData: "dtCadastro",
                    formatToDate: true
                },
                {
                    name: "Área Total",
                    isSortable: true,
                    keyData: "nuAreaTotal",
                    component: {
                        isButton: false,
                        element: (data) => (
                            <S.Label>{formatArea(data.nuAreaTotal)}</S.Label>
                        )
                    }
                },
                {
                    name: "Status",
                    keyData: "isAtivo",
                    isSortable: false,
                    component: {
                        element: (data) => (
                            <div
                                title={data.isAtivo ? "Ativo" : "Inativo"}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    cursor: "pointer",
                                    background: data.isAtivo
                                        ? "#0b6e0b"
                                        : "#771010",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onClick={() => {
                                    setAtivarDesativarModal(true);
                                    setClikedData(data);
                                }}
                            >
                                {data.isAtivo ? (
                                    <Check
                                        size={14}
                                        weight="bold"
                                        color="white"
                                    />
                                ) : (
                                    <X size={14} weight="bold" color="white" />
                                )}
                            </div>
                        ),
                        isButton: true
                    }
                },
                {
                    name: "",
                    keyData: "fake1",
                    isSortable: false,
                    component: {
                        element: (data) => (
                            <S.IconWrapper2>
                                <Eye
                                    size={18}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    weight="fill"
                                    onClick={() => {
                                        setVisualizarModal(true);
                                        setClikedData(data);
                                    }}
                                />
                            </S.IconWrapper2>
                        ),
                        isButton: true
                    }
                },
                {
                    name: "",
                    keyData: "fake2",
                    isSortable: false,
                    component: {
                        element: (data) => (
                            <S.IconWrapper2>
                                <File
                                    size={18}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    weight="fill"
                                    onClick={() => {
                                        setAnexosModal(true);
                                        setClikedData(data);
                                    }}
                                />
                            </S.IconWrapper2>
                        ),
                        isButton: true
                    }
                },
                isGestor && {
                    name: "",
                    keyData: "fake3",
                    isSortable: false,
                    component: {
                        element: (data) => (
                            <S.IconWrapper2>
                                <PencilSimple
                                    size={18}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    weight="fill"
                                    onClick={() => {
                                        navigate(
                                            `/dashboard/gerenciamento/edit-patrimonios/${data.id}`
                                        );
                                    }}
                                />
                            </S.IconWrapper2>
                        ),
                        isButton: true
                    }
                }
            ]}
            data={patriFlat ?? []}
            tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
            pdfButton={{
                nameFile: "Patrimonios"
            }}
            csvButton={{
                nameFile: "Patrimonios"
            }}
            possibleDataKeyToBeNull={[
                {
                    key: "outorgas",
                    fallback: "--"
                },
                {
                    key: "txMatricula",
                    fallback: "--"
                },
                {
                    key: "txFomaAquisicao",
                    fallback: "--"
                },
                {
                    key: "cartorio",
                    fallback: "--"
                },
                {
                    key: "txMunicipio",
                    fallback: "--"
                }
            ]}
        />
    );
};

export default PatrimoniosTable;

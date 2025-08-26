import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { getDistribuicaoDCJENaoDistribuidos } from "../../../../api/services/distribuicaoDCJE/distribuicaoDCJE";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { useGetAttorneys } from "../../../../hooks/useAttorneys";
import { ModalRemove } from "./components/ModalRemove";
import * as S from "./styled";

import { useMutation, useQueryClient } from "react-query";
import { getFichaDCJEByID2 } from "../../../../api/services/fichaDCJE/fichaDCJE";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { SharedState } from "../../../../context/SharedContext";
import { ModalDevolucao } from "./components/ModalDevolucao";
import { ModalDistribuicao } from "./components/ModalDistribuicao";

export const useDistQuery = () => {
    const queryClient = useQueryClient();
    // Mutations
    const mutate = useMutation({
        mutationFn: getDistribuicaoDCJENaoDistribuidos,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["useDistQuery"] });
        }
    });

    return {
        dists: mutate.data,
        mutate: mutate.mutate,
        isLoading: mutate.isLoading
    };
};

const ProceduralFilesDistribution = () => {
    const [id, setId] = useState<number>(0);
    const [numProcesso, setNumProcesso] = useState<string>("");
    const [showModalRemove, setShowModalRemove] = useState<boolean>(null);
    const [showModalDevolution, setShowModalDevolution] =
        useState<boolean>(null);

    const [showModalDist, setShowModalDist] = useState<boolean>(null);

    const { attorneysList, loadingAttorneysList } = useGetAttorneys();
    const { dists, isLoading, mutate } = useDistQuery();

    const [pPDForm, setPPDForm] = useState({
        startDate: undefined,
        endDate: undefined,
        idProc: undefined,
        idProcesso: undefined
    });

    //const { selectedDataTable } = SharedState();
    const navigate = useNavigate();

    useEffect(() => {
        const obj = {
            dtInicio: pPDForm.startDate,
            dtFim: pPDForm.endDate,
            idProcesso: pPDForm.idProcesso,
            idProcurador: pPDForm.idProc
        };

        if (
            pPDForm.startDate ||
            pPDForm.endDate ||
            pPDForm.idProc ||
            pPDForm.idProcesso
        ) {
            mutate(obj);
        } else {
            if (!pPDForm.idProcesso) {
                mutate({});
            }
        }
    }, [pPDForm]);

    useEffect(() => {
        if (
            showModalRemove == false ||
            showModalDevolution == false ||
            showModalDist == false
        ) {
            resetStates();
        }
    }, [showModalRemove, showModalDevolution, showModalDist]);

    

    const loadOptionsSpecials = (inputValue: string, callback: any) => {
        if (!inputValue || inputValue.length < 5) {
            callback(null);
        } else {
            autocompleteSpecials({ txNumero: inputValue }).then((response) => {
                const autocompleteList = response?.data
                    ? response.data.map((atc) => ({
                          label: atc.txNumeroFormatado,
                          value: atc.id
                      }))
                    : [];
                callback(autocompleteList);
            });
        }
    };

    const { selectedDataTable,setSelectedDataTable } = SharedState();

    const resetStates = () => {
        setShowModalRemove(null);
        setShowModalDevolution(null);
        setId(0);
        setNumProcesso("");
        setSelectedDataTable([]);
        setPPDForm({
            startDate: undefined,
            endDate: undefined,
            idProc: undefined,
            idProcesso: undefined
        });
    };

    /*  useEffect(() => {
        console.log(selectedDataTable);
    }, [selectedDataTable]); */

    return (
        <>
            {showModalDist && (
                <ModalDistribuicao setShowModalDevolucao={setShowModalDist} />
            )}
            {showModalRemove && (
                <ModalRemove setShowModalRemove={setShowModalRemove} id={id} />
            )}
            {showModalDevolution && (
                <ModalDevolucao
                    idFichaProcessual={id}
                    setShowModalDevolucao={setShowModalDevolution}
                    numProcesso={numProcesso}
                />
            )}
            <PageTitle
                pageTitle="PROCESSOS PENDENTES DE DISTRIBUIÇÃO - DCJE"
                pageIcon={<S.PageIcon />}
            />
            <div
                style={{
                    padding: "2rem"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "2rem"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "1.4rem"
                                }}
                            >
                                Procurador
                            </label>
                            <S.CustomSelect
                                placeholder="Selecione o(a) procurador(a)"
                                options={attorneysList}
                                isClearable
                                onChange={(e: any) => {
                                    console.log(e?.value);
                                    setPPDForm({
                                        ...pPDForm,
                                        idProc: e?.value
                                    });
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem"
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "1.4rem"
                                }}
                            >
                                Número do Processo
                            </label>
                            <S.CustomAutocomplete
                                placeholder="Digite no mínimo 5 digitos iniciais"
                                cacheOptions={true}
                                loadOptions={loadOptionsSpecials}
                                defaultOptions
                                noOptionsMessage={() =>
                                    "Número de processo não encontrado"
                                }
                                isClearable
                                onChange={(e: any) => {
                                    console.log(e?.value);
                                    setPPDForm({
                                        ...pPDForm,
                                        idProcesso: e?.value
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <S.FieldDateContainer>
                        <S.DateContainer>
                            <S.DateContent>
                                <S.DateDescription>Início</S.DateDescription>
                                <S.DateInput
                                    type="date"
                                    placeholder="Início"
                                    value={pPDForm.startDate}
                                    onChange={(e) => {
                                        setPPDForm({
                                            ...pPDForm,
                                            startDate: e.target.value
                                        });
                                    }}
                                />
                            </S.DateContent>

                            <S.DateContent>
                                <S.DateDescription>Fim</S.DateDescription>
                                <S.DateInput
                                    type="date"
                                    placeholder="Fim"
                                    value={pPDForm.endDate}
                                    onChange={(e) => {
                                        setPPDForm({
                                            ...pPDForm,
                                            endDate: e.target.value
                                        });
                                    }}
                                />
                            </S.DateContent>
                        </S.DateContainer>
                    </S.FieldDateContainer>
                    {selectedDataTable.length && (
                        <S.ExeDistB onClick={() => setShowModalDist(true)}>
                            <p>Executar Distribuição</p>
                        </S.ExeDistB>
                    )}
                </div>

                <CustomTable
                    isLoading={isLoading}
                    showSearchField={true}
                    showSelectNumberOfRows={true}
                    selectRows={true}
                    showPagination={true}
                    columns={[
                        {
                            name: "",
                            isSortable: true,
                            keyData: "isDevolvido",
                            component: {
                                isButton: false,
                                element: (data) => {
                                    return (
                                        data.isDevolvido && (
                                            <div
                                                style={{
                                                    backgroundColor: "#e47b25",
                                                    fontSize: "1.2rem",
                                                    fontWeight: "lighter",
                                                    padding: "0.3rem 0.5rem",
                                                    color: "white",
                                                    borderRadius: "0.3rem",
                                                }}
                                            >
                                                Devolvido
                                            </div>
                                        )
                                    );
                                }
                            }
                        },
                        {
                            name: "Nº Solicitação",
                            isSortable: true,
                            keyData: "idFichaProcessual"
                        },
                        {
                            name: "Nº Processo",
                            isSortable: true,
                            keyData: "txNumeroFormatado"
                        },
                        {
                            name: "Data Entrada",
                            isSortable: true,
                            keyData: "txDataEntrada",
                            formatToDate: true
                        },
                        {
                            name: "Prazo DCJE",
                            isSortable: true,
                            keyData: "dtPrazoDCJE",
                            formatToDate: true
                        },
                        {
                            name: "Autores",
                            isSortable: true,
                            keyData: "nuAutores"
                        },
                        {
                            name: "Assunto",
                            isSortable: true,
                            keyData: "txRazaoPedido"
                        },
                        {
                            name: "Valor R$",
                            isSortable: true,
                            keyData: "vaTotal",
                            formatToCurrency: true
                        },
                        {
                            name: "",
                            keyData: "fake1234",
                            isSortable: false,
                            component: {
                                element: (data) => (
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            style={{
                                                fontSize: "1.2rem"
                                            }}
                                            variant="secondary"
                                            id="dropdown-basic"
                                        />

                                        <Dropdown.Menu
                                            style={{
                                                padding: "0.5rem"
                                            }}
                                        >
                                            <Dropdown.Item
                                                style={{
                                                    fontSize: "1.4rem"
                                                }}
                                                href="#/action-1"
                                                onClick={async () => {
                                                    const res =
                                                        await getFichaDCJEByID2(
                                                            data.idFichaProcessual
                                                        );

                                                    navigate(
                                                        `/dashboard/dcje/ficha-processual/${res.data.idAto}`
                                                    );
                                                }}
                                            >
                                                Ficha Processual
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{
                                                    fontSize: "1.4rem"
                                                }}
                                                href="#/action-1"
                                                onClick={() => {
                                                    setId(
                                                        data.idFichaProcessual
                                                    );
                                                    setNumProcesso(
                                                        data.txNumeroFormatado
                                                    );
                                                    setShowModalRemove(true);
                                                }}
                                            >
                                                Excluir Ficha
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{
                                                    fontSize: "1.4rem"
                                                }}
                                                href="#/action-1"
                                                onClick={() => {
                                                    setId(
                                                        data.idFichaProcessual
                                                    );
                                                    setNumProcesso(
                                                        data.txNumeroFormatado
                                                    );
                                                    if (!data.isDevolvido) {
                                                        setShowModalDevolution(
                                                            true
                                                        );
                                                    } else {
                                                        HotToastWarning(
                                                            "Ficha já devolvida."
                                                        );
                                                    }
                                                }}
                                            >
                                                Devolver Ficha
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ),
                                isButton: true
                            }
                        }
                    ]}
                    data={dists?.data ?? []}
                    tootTipSearcField="Campo de pesquisa filtra apenas dados da página atual da tabela."
                    pdfButton={{
                        nameFile: "fichas-processuais-encerradas"
                    }}
                    csvButton={{
                        nameFile: "fichas-processuais-encerradas"
                    }}
                    defaultSortKeyColumn={{
                        key: "isDevolvido",
                        direction: "descending"
                    }}
                />
            </div>
        </>
    );
};

export default ProceduralFilesDistribution;

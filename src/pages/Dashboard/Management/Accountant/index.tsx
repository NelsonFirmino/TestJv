import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { getDistribuicaoDCJEDistribuidos } from "../../../../api/services/distribuicaoDCJE/distribuicaoDCJE";
import { Distribuicao } from "../../../../api/services/distribuicaoDCJE/distribuicaodcje.interface";
import { getFichaDCJEByID2 } from "../../../../api/services/fichaDCJE/fichaDCJE";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import * as S from "./styled";

export const useDistQuery = () => {
    const queryClient = useQueryClient();
    // Mutations
    const mutate = useMutation({
        mutationFn: getDistribuicaoDCJEDistribuidos,
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

const Accountant = () => {
    const tokenString = localStorage.getItem("token")!;
    const token: any = jwtDecode(tokenString);
    const userId: string = token["Jvris.User.Id"];

    const { dists, isLoading, mutate } = useDistQuery();

    const navigate = useNavigate();

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

    const [pPDForm, setPPDForm] = useState({
        startDate: undefined,
        endDate: undefined,
        idProcesso: undefined
    });

    useEffect(() => {
        mutate({
            idContador: parseInt(userId)
        });
    }, []);

    useEffect(() => {
        if ((pPDForm.startDate && pPDForm.endDate) || pPDForm.idProcesso) {
            mutate({
                dtFim: pPDForm.endDate,
                dtInicio: pPDForm.startDate,
                idProcesso: pPDForm.idProcesso,
                idContador: parseInt(userId)
            });
        } else {
            if (!pPDForm.idProcesso && pPDForm.startDate && pPDForm.endDate) {
                mutate({
                    idContador: parseInt(userId)
                });
            }
        }
    }, [pPDForm]);

    return (
        <>
            <PageTitle
                pageTitle="PROCESSOS PENDENTES DE VERIFICAÇÃO - DCJE"
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
                                setPPDForm({
                                    ...pPDForm,
                                    idProcesso: e?.value
                                });
                            }}
                        />
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
                </div>
                <CustomTable
                    isLoading={isLoading}
                    showPagination
                    showSearchField
                    showSelectNumberOfRows
                    columns={[
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
                            name: "Data de Distribuição",
                            isSortable: true,
                            keyData: "txDataEntrada"
                        },
                        {
                            name: "Prazo DCJE",
                            keyData: "dtPrazoDCJE",
                            isSortable: true
                        },
                        {
                            name: "Prazo Procurador",
                            keyData: "dtPrazoProcurador",
                            isSortable: true
                        },
                        {
                            name: "Autores",
                            keyData: "nuAutores",
                            isSortable: true
                        },
                        {
                            name: "Assunto",
                            keyData: "txRazaoPedido",
                            isSortable: true
                        },
                        {
                            name: "Valor",
                            keyData: "vaTotal",
                            isSortable: true
                        },
                        {
                            name: "",
                            keyData: "fake1234",
                            isSortable: false,
                            component: {
                                element: (data: Distribuicao) => (
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
                                                Visualizar Dados/Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{
                                                    fontSize: "1.4rem"
                                                }}
                                                href="#/action-1"
                                                onClick={() => {
                                                    navigate(
                                                        `/dashboard/contadoria/calculos/${data.idFichaProcessual}`
                                                    );
                                                }}
                                            >
                                                Calcular
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{
                                                    fontSize: "1.4rem"
                                                }}
                                                href="#/action-1"
                                                onClick={() => {
                                                    /* navigate(
                                      `/dashboard/contadoria/calculos/${data.idFichaProcessual}/RESPOSTACALC`
                                    ); */
                                                }}
                                            >
                                                Cadastrar Resposta
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ),
                                isButton: true
                            }
                        }
                    ]}
                    data={dists?.data ? dists.data : []}
                />
            </div>
        </>
    );
};

export default Accountant;

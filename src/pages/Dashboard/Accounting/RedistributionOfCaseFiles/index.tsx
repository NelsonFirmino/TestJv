import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getFichaDCJEByID2 } from "../../../../api/services/fichaDCJE/fichaDCJE";
import { CustomTable } from "../../../../components/CustomTable";
import { PageTitle } from "../../../../components/TitlePage";
import { ModalRemove } from "../RequestReasons/components/ModalRemove";
import * as S from "./styled";
import useFPD from "./useFPD";

const RedistributionOfCaseFiles = () => {
    const {
        autoComplete,
        contadores,
        procuradores,
        processos,
        dataFim,
        dataInicio,
        data,
        isValid,
        submit,
        pesquisar,
        control,
        reset,
        register,
        errors,
        watch,
        setSelectedProcs
    } = useFPD();

    const navigate = useNavigate();
    const [showModalRemove, setShowModalRemove] = useState(false);
    const [id, setId] = useState(0);
    const [numProcesso, setNumProcesso] = useState("");
    return (
        <>
            {showModalRemove && (
                <ModalRemove
                    name="Ficha"
                    setShowModalRemove={setShowModalRemove}
                    id={id}
                />
            )}
            <PageTitle
                pageTitle="FICHAS PROCESSUAIS DISTRIBUÍDAS - DCJE"
                pageIcon={<S.PageIcon />}
            />
            <S.Wrapper>
                <S.Row>
                    <S.Section>
                        <S.SectionTitle>Período:</S.SectionTitle>

                        <S.FieldDateContainer>
                            <S.DateContainer>
                                <S.DateContent
                                    error={errors.startDate?.message}
                                >
                                    <S.DateDescription>
                                        Início
                                    </S.DateDescription>
                                    <S.DateInput
                                        type="date"
                                        placeholder="Início"
                                        defaultValue={new Date()
                                            .toISOString()
                                            .substring(0, 10)}
                                        {...register("startDate")}
                                    />
                                </S.DateContent>

                                <S.DateContent error={errors.endDate?.message}>
                                    <S.DateDescription>Fim</S.DateDescription>
                                    <S.DateInput
                                        type="date"
                                        placeholder="Fim"
                                        defaultValue={new Date()
                                            .toISOString()
                                            .substring(0, 10)}
                                        {...register("endDate", {
                                            validate: (endDate: Date) => {
                                                if (
                                                    watch("startDate") > endDate
                                                ) {
                                                    return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                                                }
                                            }
                                        })}
                                    />
                                </S.DateContent>
                            </S.DateContainer>
                        </S.FieldDateContainer>

                        <S.ErrorMessage>
                            {errors.startDate?.message}
                        </S.ErrorMessage>
                        <S.ErrorMessage>
                            {errors.endDate?.message}
                        </S.ErrorMessage>
                    </S.Section>

                    <S.Section>
                        <S.SectionTitle>Contador:</S.SectionTitle>

                        <S.FieldContainer>
                            <Controller
                                name="accountant"
                                control={control}
                                render={({ field }) => (
                                    <S.CustomSelect
                                        placeholder="Selecione o(a) contador(a)"
                                        {...field}
                                        options={contadores.map((contador) => {
                                            return {
                                                value: contador.id,
                                                label: contador.txContador
                                            };
                                        })}
                                    />
                                )}
                            />
                        </S.FieldContainer>
                    </S.Section>
                </S.Row>

                <S.Row>
                    <S.Section>
                        <S.SectionTitle>Procurador:</S.SectionTitle>

                        <S.FieldContainer>
                            <Controller
                                name="attorney"
                                control={control}
                                render={({ field }) => (
                                    <S.CustomSelect
                                        placeholder="Selecione o(a) procurador(a)"
                                        {...field}
                                        options={
                                            procuradores &&
                                            procuradores.map((procurador) => {
                                                return {
                                                    value: procurador.id,
                                                    label: procurador.txProcurador
                                                };
                                            })
                                        }
                                    />
                                )}
                            />
                        </S.FieldContainer>
                    </S.Section>
                    <S.Section>
                        <S.SectionTitle>Nº do Processo:</S.SectionTitle>

                        <S.FieldContainer>
                            <Controller
                                name="processNumber"
                                control={control}
                                render={({ field }) => (
                                    <S.CustomSelect
                                        placeholder="Digite mais de 5 caracteres"
                                        {...field}
                                        //options={}

                                        isClearable={false}
                                        isSearchable={true}
                                        onInputChange={(value) => {
                                            if (value.length >= 5) {
                                                autoComplete(value);
                                            }
                                        }}
                                        options={
                                            processos &&
                                            processos.map((processo) => {
                                                return {
                                                    value: processo.id,
                                                    label: processo.txNumeroFormatado
                                                };
                                            })
                                        }
                                    />
                                )}
                            />
                        </S.FieldContainer>
                    </S.Section>
                </S.Row>

                <S.ContainerButtons>
                    <S.SubmitButton
                        type="button"
                        onClick={pesquisar}
                        disabled={!isValid}
                    >
                        Pesquisar
                    </S.SubmitButton>
                    <S.ClearButton
                        type="reset"
                        onClick={() =>
                            reset({
                                attorney: {},
                                accountant: {},
                                processNumber: {}
                            })
                        }
                    >
                        Limpar
                    </S.ClearButton>
                </S.ContainerButtons>

                <S.TableWrapper>
                    <CustomTable
                        isLoading={false}
                        showSearchField={true}
                        showSelectNumberOfRows={true}
                        selectRows={true}
                        showPagination={true}
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
                                keyData: "txAutor"
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
                                name: "Procurador",
                                isSortable: true,
                                keyData: "txProcurador"
                            },
                            {
                                name: "",
                                keyData: "fake1234",
                                isSortable: false,
                                component: {
                                    element: (data) => {
                                        return (
                                            <S.CustomSelect
                                                styles={{
                                                    control: (
                                                        provided,
                                                        state
                                                    ) => ({
                                                        ...provided,
                                                        width: "max-content"
                                                    })
                                                }}
                                                placeholder="Selecione o(a) contador(a)"
                                                onChange={(value: any) => {
                                                    setSelectedProcs((old) => {
                                                        const newSelectedProcs =
                                                            [...old];
                                                        newSelectedProcs.push({
                                                            idDist: data.id,
                                                            idProc: value.value
                                                        });
                                                        return newSelectedProcs;
                                                    });
                                                }}
                                                options={
                                                    contadores &&
                                                    contadores.map(
                                                        (contador) => {
                                                            return {
                                                                value: contador.id,
                                                                label: contador.txContador
                                                            };
                                                        }
                                                    )
                                                }
                                                //reset depois de enviar
                                            />
                                        );
                                    },
                                    isButton: true
                                }
                            },
                            {
                                name: "",
                                keyData: "fake123",
                                isSortable: false,
                                component: {
                                    element: (data) => {
                                        return (
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
                                                            setShowModalRemove(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        Excluir Ficha
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        );
                                    },
                                    isButton: true
                                }
                            }
                        ]}
                        data={data}
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

                    <S.ContainerButtons
                        style={{
                            justifyContent: "flex-end",
                            display: "flex",
                            width: "94%",
                            marginBottom: "20px"
                        }}
                    >
                        <S.SubmitButton
                            type="button"
                            onClick={submit}
                            disabled={!isValid}
                        >
                            Executar Distribuição
                        </S.SubmitButton>
                    </S.ContainerButtons>
                </S.TableWrapper>
            </S.Wrapper>
        </>
    );
};

export default RedistributionOfCaseFiles;

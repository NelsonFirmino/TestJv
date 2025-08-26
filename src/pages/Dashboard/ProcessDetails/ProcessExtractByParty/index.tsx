import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { getProcessExtractByParty } from "../../../../api/services/processextractbyparty/processextractbyparty";
import { CustomTable } from "../../../../components/CustomTable";
import JvrisLoading from "../../../../components/JvrisLoading";
import { PageTitle } from "../../../../components/TitlePage";
import { SubmitConCalc } from "./interfaces/processextractbyparty.interface";
import * as S from "./styled";

const ProcessExtractByParty = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { isValid, errors },
        watch,
        control
    } = useForm<SubmitConCalc>({
        mode: "onChange"
    });

    const {
        mutate: mutateExtractByParty,
        data: response,
        isLoading
    } = useMutation(getProcessExtractByParty);

    const txCpfCnpj: string = "26.989.715/0003-74";

    function getExtract(id: string | undefined) {
        if (!id) throw new Error("id is required");
        mutateExtractByParty(id);
    }
    const { process_id } = useParams();

    useEffect(() => {
        console.log("process_id", process_id);
        getExtract(process_id);
    }, []);
    useEffect(() => {
        console.log("response", response);
    }, [response]);
    const extractData = response?.data;

    return (
        <>
            <PageTitle
                pageTitle="EXTRATO DE PROCESSOS POR PARTE"
                pageIcon={<S.PageIcon />}
            />

            {extractData ? (
                <S.TableWrapper>
                    <S.Section>
                        <S.ProcessDataTitle>NOME DA PARTE: </S.ProcessDataTitle>
                        <S.ProcessData>{extractData[0].txParte}</S.ProcessData>
                    </S.Section>

                    <S.Section>
                        <S.ProcessDataTitle>
                            DOCUMENTO DA PARTE:{" "}
                        </S.ProcessDataTitle>
                        <S.ProcessData>
                            {extractData[0].txCpfCnpj}
                        </S.ProcessData>
                    </S.Section>

                    <div
                        style={{
                            padding: "1rem"
                        }}
                    >
                        <CustomTable
                            isLoading={isLoading}
                            showSearchField={true}
                            showSelectNumberOfRows={true}
                            selectRows={true}
                            showPagination={true}
                            columns={[
                                {
                                    name: "Nº Processo",
                                    isSortable: true,
                                    keyData: "txNumeroFormatado"
                                },
                                {
                                    name: "Assunto",
                                    isSortable: true,
                                    keyData: "txAssunto"
                                },
                                {
                                    name: "Valor do Processo (R$)",
                                    isSortable: true,
                                    keyData: "vaProcesso",
                                    formatToDate: true
                                }
                            ]}
                            data={extractData}
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
                </S.TableWrapper>
            ) : (
                <JvrisLoading loading />
            )}
        </>
    );
};

export default ProcessExtractByParty;

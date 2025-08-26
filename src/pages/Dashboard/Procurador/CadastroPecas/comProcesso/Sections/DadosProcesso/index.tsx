import { motion, Variants } from "framer-motion";
import { Download } from "phosphor-react";
import { useEffect, useState } from "react";
import theme from "../../../../../../../globalStyle/theme";
import { useProcessoContext } from "../../../context/ProcessoContext";
import * as S from "../../../styled";

import { PlusSquare } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import usePecasAnexosService from "../../../../../../../api/services/pecas-anexos";
import {
    HotToastError,
    HotToastSucess,
    HotToastWarning
} from "../../../../../../../components/HotToastFuncs";
import { InputLoader } from "../../../../../../../components/InputLoader";
import { openOctetStreamInNewTab } from "../../../../../../../utils/openOctetStreamInNewTab.util";
import { openPDFInNewTab } from "../../../../../../../utils/openPDFInNewTab.util";
import { usePecasContext } from "../../../context/PecasContext";
import { ModelTypeSelectI } from "../../../context/PecasContext/interfaces";
import { EyeIcon, TrashIcon } from "./styled";

const variant: Variants = {
    openX: {
        width: "550px",
        minWidth: "550px",
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    closedX: {
        width: "0px",
        minWidth: "0px",
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

const DadosProcesso = () => {
    const { processo, mostrarDadosProcesso } = useProcessoContext();
    const {
        AnexarArquivo,
        tiposProcessoPJE,
        prepareModelTypeList,
        seed2,
        anexosAto,
        anexosPeca,
        anexosResposta,
        partes,
        pecasFinalizadas
    } = usePecasContext();
    const { excluirAnexo } = usePecasAnexosService();

    const [anexoModelTypeFilter, setAnexoModelTypeFilter] =
        useState<ModelTypeSelectI>({
            value: -1,
            label: ""
        });

    useEffect(() => {
        if (processo) {
            seed2();
        }
    }, [processo]);

    function anexarDoc(event: any) {
        if (anexoModelTypeFilter.value == -1) {
            HotToastWarning("Selecione um tipo de modelo para o anexo.");
            return;
        }

        const file = event.target.files[0];

        if (!file) {
            HotToastWarning("Please select a PDF file.");
            return;
        }

        if (!file.type.match("application/pdf")) {
            HotToastWarning("Please select a PDF file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            if (typeof event.target.result === "string") {
                const base64String = event.target.result.split(",")[1];
                AnexarArquivo(anexoModelTypeFilter.value, base64String, () =>
                {
                   // console.log("Anexo adicionado com sucesso!");
                   seed2()
                }
                );
            }

            // You can do something with the base64String here, e.g., send it to a server or save it locally.
        };

        reader.readAsDataURL(file);
    }

    function updateAnexoModelTypeFilterValue(value: ModelTypeSelectI) {
        if (value.value == -1) {
            setAnexoModelTypeFilter({
                value: -1,
                label: ""
            });
        } else {
            setAnexoModelTypeFilter(value);
        }
    }

    function delAnexo(AnexoId: number) {
        excluirAnexo(AnexoId)
            .then(() => {
                HotToastSucess("Anexo excluído com sucesso!");
                seed2();
            })
            .catch(() => {
                HotToastError("Erro ao excluir anexo!");
            });
    }
    const navigate = useNavigate();

    return (
        <motion.div
            animate={mostrarDadosProcesso ? ["openX"] : ["closedX"]}
            variants={variant}
            style={{
                height: "100%",
                overflowX: "hidden",
                outline: "1px solid rgba(0,0,0,0.1)"
            }}
        >
            <S.ContainerHeader>
                <S.TitleHeader>Dados do Processo</S.TitleHeader>
            </S.ContainerHeader>

            <div
                style={{
                    overflow: "auto",
                    maxHeight: "780px"
                }}
            >
                <S.DatasWrapper>
                    <S.DataWrapper>
                        <S.DataLabel>Número do Processo</S.DataLabel>
                        <S.Data Font="small">
                            {processo && processo.txNumero}
                        </S.Data>
                    </S.DataWrapper>
                </S.DatasWrapper>
                <S.DatasWrapper>
                    <S.DataWrapper>
                        <S.DataLabel>Relevância</S.DataLabel>
                        <S.Data Font="small">
                            {processo && processo.txRelevancia}
                        </S.Data>
                    </S.DataWrapper>

                    <S.DataWrapper>
                        <S.DataLabel>Assunto</S.DataLabel>
                        <S.Data Font="small">
                            {processo && processo.txAssunto}
                        </S.Data>
                    </S.DataWrapper>
                </S.DatasWrapper>

                <S.DatasWrapper column>
                    <S.DataLabel>Partes</S.DataLabel>
                    <S.DataWrapper gap={"0.6rem"}>
                        {partes?.map((parte) => {
                            return (
                                <S.SeparetedWrapper
                                    onClick={() => {
                                        const d = parte.parte.txCpfCnpj.replace(
                                            "/",
                                            ".."
                                        );
                                        console.log(d);
                                        navigate(
                                            `/dashboard/detalhes-processo/extrato-de-processos-por-parte/${d}`
                                        );
                                    }}
                                    key={parte.id}
                                >
                                    <S.Data Font="small" bold>
                                        {parte.txParte}
                                    </S.Data>
                                    <S.Data Font="small">
                                        {parte.parte.txCpfCnpj}
                                    </S.Data>
                                </S.SeparetedWrapper>
                            );
                        })}
                    </S.DataWrapper>
                </S.DatasWrapper>
                <S.DatasWrapper column>
                    <S.DataLabel>Anexos do Ato</S.DataLabel>
                    <S.DataWrapper>
                        {anexosAto && anexosAto.length ? (
                            anexosAto.map((anexo) => {
                                return (
                                    <S.SeparetedWrapper
                                        key={anexo.id}
                                        onClick={() => {
                                            openOctetStreamInNewTab(
                                                anexo.file_stream,
                                                anexo.name
                                            );
                                        }}
                                        align
                                        fit
                                    >
                                        <S.Data Font="small" bold>
                                            {anexo.txDescricao}
                                        </S.Data>
                                        <Download
                                            weight="fill"
                                            size={"4rem"}
                                            color={theme.colors.gray}
                                        />
                                    </S.SeparetedWrapper>
                                );
                            })
                        ) : (
                            <S.SeparetedWrapper row noHover noCursor>
                                <S.Data
                                    style={{
                                        color: theme.colors.softRed
                                    }}
                                    Font="small"
                                    bold
                                >
                                    Nenhum Anexo até o momento
                                </S.Data>
                            </S.SeparetedWrapper>
                        )}
                    </S.DataWrapper>
                </S.DatasWrapper>
                <S.DatasWrapper column>
                    <S.DataLabel>Anexos da contadoria</S.DataLabel>
                    <S.DataWrapper>
                        {anexosResposta ? (
                            anexosResposta.map((anexo) => {
                                return (
                                    <S.SeparetedWrapper
                                        key={anexo.id}
                                        onClick={() => {
                                            //decode application/octet-stream to pdf an d open in another window
                                            const blob = new Blob(
                                                [anexo.file_stream],
                                                {
                                                    type: "application/octet-stream"
                                                }
                                            );
                                            const url =
                                                URL.createObjectURL(blob);
                                            window.open(url, "_blank");
                                        }}
                                        align
                                        fit
                                    >
                                        <S.Data Font="small" bold>
                                            {anexo.txDescricao}
                                        </S.Data>
                                        <Download
                                            weight="fill"
                                            size={"4rem"}
                                            color={theme.colors.gray}
                                        />
                                    </S.SeparetedWrapper>
                                );
                            })
                        ) : (
                            <S.SeparetedWrapper row noHover noCursor>
                                <S.Data
                                    style={{
                                        color: theme.colors.softRed
                                    }}
                                    Font="small"
                                    bold
                                >
                                    Nenhum Anexo até o momento
                                </S.Data>
                            </S.SeparetedWrapper>
                        )}
                    </S.DataWrapper>
                </S.DatasWrapper>

                <S.DatasWrapper column>
                    <S.DataLabel>Anexos da Peça</S.DataLabel>
                    <S.DataWrapper gap={"0.6rem"}>
                        {anexosPeca ? (
                            anexosPeca.map((anexo) => {
                                return (
                                    <S.SeparetedWrapper
                                        key={anexo.id}
                                        style={{
                                            justifyContent: "space-between"
                                        }}
                                        row
                                        noHover
                                        noCursor
                                    >
                                        <S.Data Font="small" bold>
                                            {anexo.txTipoDocumento}
                                        </S.Data>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "0.6rem"
                                            }}
                                        >
                                            <EyeIcon
                                                onClick={() =>
                                                    openPDFInNewTab(
                                                        anexo.file_stream
                                                    )
                                                }
                                                weight="fill"
                                            />
                                            <TrashIcon
                                                onClick={() =>
                                                    delAnexo(anexo.id)
                                                }
                                                weight="fill"
                                            />
                                        </div>
                                    </S.SeparetedWrapper>
                                );
                            })
                        ) : (
                            <S.SeparetedWrapper row noHover noCursor>
                                <S.Data
                                    style={{
                                        color: theme.colors.softRed
                                    }}
                                    Font="small"
                                    bold
                                >
                                    Nenhum Anexo até o momento
                                </S.Data>
                            </S.SeparetedWrapper>
                        )}
                        <div
                            style={{
                                display: "flex",
                                gap: "1.6rem",
                                marginTop: "2rem",
                                alignContent: "center",
                                justifyContent: "center"
                            }}
                        >
                            <S.SeparetedWrapper
                                style={{
                                    width: "fit-content"
                                }}
                                htmlFor="AnexarInput"
                                gap={0.5}
                                row
                                align
                                backColor={theme.colors.lightGrey}
                                backColorHover={theme.colors.grey}
                                color={theme.colors.darkGrey}
                            >
                                <S.Data Font="small" bold>
                                    Adicionar Anexo
                                </S.Data>
                                <PlusSquare
                                    style={{
                                        color: "-moz-initial"
                                    }}
                                    //color={theme.colors.grey}
                                    size={32}
                                    weight="fill"
                                />
                            </S.SeparetedWrapper>
                            <S.DataWrapper>
                                <S.DataLabel>Tipo de Anexo</S.DataLabel>
                                <S.SelectData
                                    value={
                                        anexoModelTypeFilter.value != -1
                                            ? anexoModelTypeFilter
                                            : undefined
                                    }
                                    //isLoading={loadingModelsTypesList}
                                    onInputChange={(e) => {
                                        if (e.length) {
                                            updateAnexoModelTypeFilterValue({
                                                value: 0,
                                                label: e
                                            });
                                        }
                                    }}
                                    onChange={(e) => {
                                        if (e) {
                                            updateAnexoModelTypeFilterValue(e);
                                        }
                                    }}
                                    options={prepareModelTypeList(
                                        tiposProcessoPJE
                                    )}
                                />
                            </S.DataWrapper>
                        </div>
                    </S.DataWrapper>
                </S.DatasWrapper>

                <S.DatasWrapper column>
                    <S.DataLabel>Peças Finalizadas</S.DataLabel>
                    <S.DataWrapper gap={"0.6rem"}>
                        {pecasFinalizadas ? (
                            pecasFinalizadas.map((pFin) => {
                                return (
                                    <S.SeparetedWrapper
                                        key={pFin.id}
                                        row
                                        noHover
                                        noCursor
                                    >
                                        <S.Data Font="small" bold>
                                            {`${pFin.id} - ${pFin.name}`}
                                        </S.Data>
                                    </S.SeparetedWrapper>
                                );
                            })
                        ) : (
                            <S.SeparetedWrapper row noHover noCursor>
                                <S.Data
                                    style={{
                                        color: theme.colors.softRed
                                    }}
                                    Font="small"
                                    bold
                                >
                                    Nenhuma Peça Finalizada até o momento
                                </S.Data>
                            </S.SeparetedWrapper>
                        )}
                    </S.DataWrapper>
                </S.DatasWrapper>
            </div>
            <InputLoader id="AnexarInput" OnExecute={anexarDoc} />
        </motion.div>
    );
};

export default DadosProcesso;

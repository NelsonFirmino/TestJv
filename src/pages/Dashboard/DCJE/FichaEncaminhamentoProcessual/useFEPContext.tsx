import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import {
    getProceduralRecordDCJEDataByActId,
    getProceduralRecordDCJEDataByIdMulti,
    postProceduralRecordDCJEDataMultiJ,
    putProceduralRecordDCJEDataMultiJ
} from "../../../../api/services/dcje/actsDCJE/actsDCJE";
import { ProvisoryPutProceduralRecordMulti } from "../../../../api/services/dcje/actsDCJE/actsDCJE.interface";
import {
    HotToastError,
    HotToastSucess
} from "../../../../components/HotToastFuncs";
import { convertToDecimal } from "../../../../utils/convertToDecimal.util";
import { FEPContextI, fichaDCJEI, InputsI } from "./interfaces";

const FEPContext = createContext<FEPContextI>({} as any);

export const FEPProvider = ({ children }: { children: React.ReactNode }) => {
    const defaultDate = new Date().toISOString().substring(0, 10);
    const { actId } = useParams();
    const [fichaDCJE, setFichaDCJE] = useState<Partial<fichaDCJEI>>();
    const [inputs, setInputs] = useState<InputsI>({
        informacoesCadastrais: undefined,
        informacoesDist: undefined,
        razaoPedido: undefined,
        dadosColAutos: undefined,
        paramsCorreMoneJuros: undefined,
        orientacaoCalc: undefined,
        arquivos: undefined
    });
    const [noFicha, setNoFicha] = useState(false);
    useEffect(() => {
        async function getFichaId() {
            const fichaID = (await getProceduralRecordDCJEDataByActId(actId))
                .data?.id;
            if (!fichaID) {
                setNoFicha(true);
                return;
            }
            const ficha = (
                await getProceduralRecordDCJEDataByIdMulti(fichaID.toString())
            ).data;

            const tempFicha: Partial<fichaDCJEI> = { ...ficha };
            setFichaDCJE(tempFicha);
        }
        if (actId) {
            getFichaId();
        }
    }, [actId]);

    useEffect(() => {
        fillFields();
    }, [fichaDCJE]);

    function updateInputs(inputsToChange: Partial<InputsI>) {
        //update only inputs that are not undefined
        const newInputs = { ...inputs };
        Object.keys(inputsToChange).forEach((key) => {
            if (inputsToChange[key] !== undefined) {
                Object.keys(inputsToChange[key]).forEach((subKey) => {
                    if (inputsToChange[key][subKey] !== undefined) {
                        newInputs[key][subKey] = inputsToChange[key][subKey];
                    }
                });
            }
        });
        setInputs(newInputs);
    }

    function forceUpdateInput(inputsToChange: Partial<InputsI>) {
        if (inputsToChange.informacoesCadastrais) {
            setInputs({
                ...inputs,
                informacoesCadastrais: inputsToChange.informacoesCadastrais
            });
        }
        if (inputsToChange.informacoesDist) {
            setInputs({
                ...inputs,
                informacoesDist: inputsToChange.informacoesDist
            });
        }
        if (inputsToChange.razaoPedido) {
            setInputs({
                ...inputs,
                razaoPedido: inputsToChange.razaoPedido
            });
        }
        if (inputsToChange.dadosColAutos) {
            setInputs({
                ...inputs,
                dadosColAutos: inputsToChange.dadosColAutos
            });
        }
        if (inputsToChange.paramsCorreMoneJuros) {
            setInputs({
                ...inputs,
                paramsCorreMoneJuros: inputsToChange.paramsCorreMoneJuros
            });
        }
        if (inputsToChange.orientacaoCalc) {
            setInputs({
                ...inputs,
                orientacaoCalc: inputsToChange.orientacaoCalc
            });
        }
        if (inputsToChange.arquivos) {
            setInputs({
                ...inputs,
                arquivos: inputsToChange.arquivos
            });
        }
    }

    function fillFields() {
        function fillInformacoesCadastrais() {
            return {
                txNumeroMandadoSeguranca: fichaDCJE.txNumeroMandadoSeguranca,
                txAutor: fichaDCJE.txAutor,
                txReu: fichaDCJE.txReu,
                nuAutores: fichaDCJE.nuAutores,
                vaTotal: fichaDCJE.vaTotal,
                dtAtualizacaoValor: fichaDCJE.dtAtualizacaoValor
            };
        }

        function fillInformacoesDist() {
            return {
                idProcurador: fichaDCJE.idProcurador,
                dtPrazo: fichaDCJE.dtPrazoProcurador,
                txFaseProcessual: fichaDCJE.txFaseProcessual,
                dtPrazoDCJE: fichaDCJE.dtPrazoDCJE
            };
        }

        function fillRazaoPedido() {
            return {
                idRazaoPedido: fichaDCJE.idRazaoPedido
            };
        }

        function fillDadosColAutos() {
            return {
                dtAjuizamento: fichaDCJE.dtAjuizamento,
                dtCitacao: fichaDCJE.dtCitacao,
                dtTransitoJulgado: fichaDCJE.dtTransitoJulgado,
                dtAposentadoria: fichaDCJE.dtAposentadoria,
                vaHonorariosFixos: fichaDCJE.vaHonorariosFixos,
                txBaseIncidencia: fichaDCJE.txBaseIncidencia,
                dtFixacao: fichaDCJE.dtFixacao,
                nuHonorariosPercentual: fichaDCJE.nuHonorariosPercentual,
                txMatricula: fichaDCJE.txMatricula
            };
        }

        function fillParamsCorreMoneJuros() {
            return fichaDCJE.lsFichasProcessuaisParametrosCalculo;
        }

        function fillOrientacaoCalc() {
            return {
                txOrientacaoCalculo: fichaDCJE.txOrientacaoCalculo,
                txObservacoesGerais: fichaDCJE.txObservacoesGerais
            };
        }

        function fillArquivos() {
            return {
                lsArquivos: fichaDCJE.lsArquivos
            };
        }

        if (fichaDCJE) {
            setInputs({
                informacoesCadastrais: fillInformacoesCadastrais(),
                informacoesDist: fillInformacoesDist(),
                razaoPedido: fillRazaoPedido(),
                dadosColAutos: fillDadosColAutos(),
                paramsCorreMoneJuros: fillParamsCorreMoneJuros(),
                orientacaoCalc: fillOrientacaoCalc(),
                arquivos: fillArquivos()
            });
        }
    }
    const formatarNumero = (numero: any) => {
        return (Number(numero) / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2
        });
    };

    const putProceduralRecord = useMutation(putProceduralRecordDCJEDataMultiJ, {
        onSuccess: (data) => {
            HotToastSucess("Operação efetuada com sucesso!");
        },
        onError: (error) => {
            HotToastError("Erro ao cadastrar ficha DCJE.");
        }
    });

    const postProceduralRecord = useMutation(
        postProceduralRecordDCJEDataMultiJ,
        {
            onSuccess: (data) => {
                HotToastSucess("Operação efetuada com sucesso!");
            },
            onError: (error) => {
                HotToastError("Erro ao cadastrar ficha DCJE.");
            }
        }
    );

    function verifyInputs() {
        //verify if all inputs and params are filled
        let isFilled = true;
        Object.keys(inputs).forEach((key) => {
            if (inputs[key] === undefined) {
                isFilled = false;
                return false;
            }
            if (key === "paramsCorreMoneJuros") {
                inputs[key].forEach((param) => {
                    if (
                        Object.values(param).some(
                            (value) => value === undefined
                        )
                    ) {
                        isFilled = false;
                        return false;
                    }
                });
            } else {
                if (
                    Object.values(inputs[key]).some(
                        (value) => value === undefined
                    )
                ) {
                    isFilled = false;
                    return false;
                }
            }
        });
        return isFilled;
    }

    function submit() {
        const lsArquivos = {};

        Object.keys(inputs.arquivos.lsArquivos).forEach((key) => {
            const time = new Date().getTime().toString();
            const name = `${key}-${time}`;
            lsArquivos[name] = inputs.arquivos.lsArquivos[key];
        });

        const sentFicha: ProvisoryPutProceduralRecordMulti = {
            id: fichaDCJE?.id,
            idAto: +actId,
            idProcesso: fichaDCJE?.idProcesso,
            txNumeroMandadoSeguranca:
                inputs.informacoesCadastrais?.txNumeroMandadoSeguranca || "",
            txNumeroFormatado: fichaDCJE.txNumeroFormatado,
            dtAjuizamento: inputs.dadosColAutos.dtAjuizamento,
            dtAposentadoria: inputs.dadosColAutos.dtAposentadoria,
            dtAtualizacaoValor: inputs.informacoesCadastrais.dtAtualizacaoValor,
            dtCadastro: fichaDCJE?.dtCadastro,
            dtCitacao: inputs.dadosColAutos.dtCitacao,
            dtFixacao: inputs.dadosColAutos.dtFixacao || "",
            dtPrazoDCJE: inputs.informacoesDist.dtPrazoDCJE,
            dtPrazoProcurador: inputs.informacoesDist.dtPrazo,
            dtTransitoJulgado: inputs.dadosColAutos.dtTransitoJulgado,
            hrCadastro: fichaDCJE?.hrCadastro,
            idDevolucao: fichaDCJE?.idDevolucao,
            idDistribuicao: fichaDCJE?.idDistribuicao,
            idProcurador: inputs.informacoesDist.idProcurador,
            idRazaoPedido: inputs.razaoPedido.idRazaoPedido,
            idResposta: fichaDCJE?.idResposta,
            idUsuarioCadastro: fichaDCJE?.idUsuarioCadastro,
            isDevolvido: fichaDCJE?.isDevolvido,
            isEncerrado: fichaDCJE?.isEncerrado,
            nuAutores: inputs.informacoesCadastrais.nuAutores,
            nuHonorariosPercentual:
                convertToDecimal(
                    inputs.dadosColAutos.nuHonorariosPercentual
                        ? inputs.dadosColAutos.nuHonorariosPercentual.toString()
                        : "0"
                ) / 100,
            txAutor: inputs.informacoesCadastrais.txAutor,
            txBaseIncidencia: inputs.dadosColAutos.txBaseIncidencia,
            txContador: fichaDCJE?.idUsuarioCadastro?.toString(),
            txDataResposta: "",
            txFaseProcessual: inputs.informacoesDist.txFaseProcessual,
            txMatricula: inputs.dadosColAutos.txMatricula,
            txObservacoesGerais: inputs.orientacaoCalc.txObservacoesGerais,
            txOrgao: fichaDCJE?.txOrgao,
            txOrientacaoCalculo: inputs.orientacaoCalc.txOrientacaoCalculo,
            txReu: inputs.informacoesCadastrais.txReu,
            txTipoProcesso: fichaDCJE?.txTipoProcesso,
            txVara: fichaDCJE?.txVara,
            vaDivergencia: fichaDCJE?.vaDivergencia,
            vaHonorariosFixos: convertToDecimal(
                inputs.dadosColAutos.vaHonorariosFixos
                    ? inputs.dadosColAutos.vaHonorariosFixos.toString()
                    : "0"
            ),
            vaTotal: convertToDecimal(
                inputs.informacoesCadastrais.vaTotal
                    ? inputs.informacoesCadastrais.vaTotal.toString()
                    : "0"
            ),
            lsArquivos: lsArquivos,
            lsFichasProcessuaisParametrosCalculo:
                inputs.paramsCorreMoneJuros as any
        };

        if (fichaDCJE?.id) {
            putProceduralRecord.mutate(sentFicha);
        } else {
            postProceduralRecord.mutate(sentFicha);
        }
    }

    return (
        <FEPContext.Provider
            value={{
                fichaDCJE,
                defaultDate,
                actId,
                formatarNumero,
                inputs: {
                    values: inputs,
                    forceUpdateInput,
                    updateInputs
                },
                submit,
                putProceduralRecord,
                postProceduralRecord,
                noFicha
            }}
        >
            {children}
        </FEPContext.Provider>
    );
};

const useFEPContext = () => {
    const context = useContext(FEPContext);
    if (!context) {
        throw new Error("useFEP must be used within an FEPProvider");
    }
    return context;
};

export default useFEPContext;

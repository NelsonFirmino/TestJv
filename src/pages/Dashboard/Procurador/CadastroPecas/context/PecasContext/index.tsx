import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAtosService from "../../../../../../api/services/atos/atos";
import { RecPecaI } from "../../../../../../api/services/atos/atos.interface";
import { getConsultarCredenciaisPje } from "../../../../../../api/services/consultaCredenciais/consultaCredenciaisPje-Service";
import useJvrisESignerService from "../../../../../../api/services/jvrisesigner";
import useModelosPecaService from "../../../../../../api/services/modelos-peca";
import { ModeloPecaI } from "../../../../../../api/services/modelos-peca/interfaces";
import usePecasService from "../../../../../../api/services/pecas";
import {
    PecaI,
    SendAnexoPecaI
} from "../../../../../../api/services/pecas/interfaces";
import { getProcessData } from "../../../../../../api/services/processData/processData";
import useProcessosService from "../../../../../../api/services/Processos";
import useProcessosPjeService from "../../../../../../api/services/processos-pje";
import { TiposProcessoPJEI } from "../../../../../../api/services/processos-pje/interface";
import usePartesService from "../../../../../../api/services/Processos/Partes";
import {
    HotToastError,
    HotToastSucess,
    HotToastWarning
} from "../../../../../../components/HotToastFuncs";
import { SharedState } from "../../../../../../context/SharedContext";
import { useAct } from "../../../../../../hooks/useAct";
import { ModelTypeSelectI, PecasContextI } from "./interfaces";

const PecasContext = createContext<PecasContextI>({} as PecasContextI);

export const PecasProvider = (props: any) => {
    const [modelTypeFilter, setModelTypeFilter] = useState<ModelTypeSelectI>({
        value: -1,
        label: ""
    });
    const [currModel, setCurrModel] = useState<ModeloPecaI>();
    const [modelTitle, setModelTitle] = useState("");
    const {
        getModelosPorIDAutorTipoDoc,
        modelos,
        sendModelo,
        updateModelo,
        getModeloById,
        modelo,
        getModelos,
        loadingModelos: loadingModelosPecas
    } = useModelosPecaService();
    const { getTiposProcessosPJE, tiposProcessoPJE, loadingTiposProcessoPJE } =
        useProcessosPjeService();
    const {
        salvarPeca,
        assinarPeca,
        finalizarPeca,
        updatePeca,
        adicionarAnexo,
        getAnexosPeca,
        anexosPeca
    } = usePecasService();
    const {
        pecasFinalizadas,
        getPecasFinalizadas,
        get: getAto,
        recuperarPeca,
        recPeca,
        concluirAtuacao,
        anexos: anexosAto,
        getAnexosResposta,
        anexosResposta,
        getAnexos: getAnexosAto
    } = useAtosService();

    const { get: getPartes, partes } = usePartesService();

    const { openSigner, openSignerReadOnly } = useJvrisESignerService();

    const [finlPeca, setFinlPeca] = useState<PecaI>();

    const tokenString = localStorage.getItem("token")!;
    const token: any = jwtDecode(tokenString);
    const userId: string = token["Jvris.User.Id"];
    const { idModelo, idAto } = useParams();
    const { selectedUser } = SharedState();
    const { get: getProcesso, processo } = useProcessosService();
    const { act } = useAct(idAto);

    useEffect(() => {
        idAto && act && getProcesso(act.data.idProcesso);
    }, [act]);
    useEffect(() => {
        //processo&& seed();
        seed();
    }, [processo]);

    useEffect(() => {
        //console.log("currModel", currModel);
        if (currModel && currModel.txDescricao)
            setModelTitle(currModel.txDescricao);
    }, [currModel]);

    useEffect(() => {
        if (idModelo && modelos) {
            updateCurrModel(
                modelos.find((model) => model.id.toString() === idModelo)
            );
        }
    }, [modelos]);

    /* useEffect(() => {
        //console.log("modelTitle", modelTitle);
    }, [modelTitle]) */

    useEffect(() => {
        if (tiposProcessoPJE) {
            if (recPeca != "NotFound" && recPeca != undefined) {
                getDataPecaFound(recPeca);
            } else if (recPeca == "NotFound" && finlPeca) {
                getDataPecaFound(finlPeca);
            } else if (recPeca == "NotFound" && !finlPeca) {
                getModelos().catch((err) => {});
            }
        }
    }, [recPeca, tiposProcessoPJE, finlPeca]);

    useEffect(() => {
        if (
            pecasFinalizadas &&
            pecasFinalizadas.length &&
            recPeca == "NotFound"
        ) {
            updateFinalPeca(pecasFinalizadas[0]);
        }
    }, [recPeca, pecasFinalizadas]);

    async function seed() {
        if (processo) {
            recuperarPeca(act.data.id);

            getPecasFinalizadas(act.data.id);
            getPartes(act.data.idProcesso);
            getAnexosAto(act.data.id);
            getAnexosResposta(act.data.id);
            getPecasFinalizadas(act.data.id);

            if (
                recPeca != "NotFound" &&
                recPeca != undefined &&
                typeof recPeca != "string"
            ) {
                getAnexosPeca(recPeca?.id);
            } else getAnexosPeca(processo?.idPeca);
        } else {
            getModelos();
        }
        getTiposProcessosPJE();
    }

    function getDataPecaFound(peca: any) {
        updateModelTypeFilterValue({
            label:
                tiposProcessoPJE.find((tipo) => tipo.id == peca.idTipoDocumento)
                    ?.txTipoDocumento || "",
            value: peca.idTipoDocumento
        });
        updateCurrModel({
            id: peca.id,
            dtCadastro: peca.dtCadastro,
            hrCadastro: peca.hrCadastro,
            txDescricao: peca.txDescricao,
            txModeloPeca: peca.txPeca,
            idTipoDocumento: peca.idTipoDocumento,
            idUsuarioCadastro: peca.idUsuarioCadastro,
            txTipoDocumento:
                tiposProcessoPJE.find((tipo) => tipo.id == peca.idTipoDocumento)
                    ?.txTipoDocumento || "",
            txAutor: ""
        });
        getModelosPorIDAutorTipoDoc({
            idAutor:
                peca.idProcurador || peca.idProcurador > 0
                    ? peca.idProcurador
                    : selectedUser?.id || parseInt(userId),
            idTipoDocumento: peca.idTipoDocumento
        }).catch((err) => {});
        getAnexosPeca(peca?.id);
    }

    function prepareModelList(modelsList: ModeloPecaI[]) {
        if (modelTypeFilter.label.length)
            modelsList = modelsList?.filter(
                (model) => model.txTipoDocumento == modelTypeFilter.label
            );

        const modelsListOptions: ModelTypeSelectI[] = [];
        if (!modelsList) return modelsListOptions;
        modelsListOptions.push({
            label: "Selecione um modelo",
            value: -1
        });
        modelsList.map((model: ModeloPecaI) => {
            modelsListOptions.push({
                value: model.id,
                //label: `${model.txDescricao}`
                label: `${model.txTipoDocumento} - ${model.txDescricao} - ${model.txAutor}`
            });
        });

        return modelsListOptions;
    }

    function prepareModelListUser(modelsList: ModeloPecaI[]) {
        if (modelTypeFilter.label.length)
            modelsList = modelsList?.filter(
                (model) => model.txTipoDocumento == modelTypeFilter.label
            );

        const modelsListOptions: ModelTypeSelectI[] = [];
        if (!modelsList) return modelsListOptions;
        modelsListOptions.push({
            label: "Selecione um modelo",
            value: -1
        });
        modelsList.forEach((model: ModeloPecaI) => {
            if (token["Jvris.User.Name"] == model.txAutor) {
                modelsListOptions.push({
                    value: model.id,
                    label: `${model.txTipoDocumento} - ${model.txDescricao}`
                });
            }
        });

        return modelsListOptions;
    }
    function prepareModelTypeList(modelsList: TiposProcessoPJEI[]) {
        const modelsListTypeOptions: ModelTypeSelectI[] = [];
        const goneTypes: string[] = [];
        if (!modelsList) return modelsListTypeOptions;
        modelsListTypeOptions.push({
            label: "Selecione um Tipo de Documento",
            value: -1
        });
        for (let i = 0; i < modelsList.length; i++) {
            if (goneTypes.includes(modelsList[i].txTipoDocumento)) continue;
            goneTypes.push(modelsList[i].txTipoDocumento);

            modelsListTypeOptions.push({
                value: modelsList[i].id,
                label: modelsList[i].txTipoDocumento
            });
        }

        return modelsListTypeOptions;
    }

    function updateCurrModel(model: ModeloPecaI) {
        if (!model) return;
        setCurrModel(model);
        updateModelTypeFilterValue({
            label: model.txTipoDocumento,
            value: model.idTipoDocumento
        });
    }

    function updateModelTypeFilterValue(value: ModelTypeSelectI) {
        if (value.value == -1) {
            setModelTypeFilter({
                value: -1,
                label: ""
            });
            //getModelos();
        } else {
            setModelTypeFilter(value);
            //getModeloByTypeId(value.value);
        }

        if (!props.comProcesso) {
            setCurrModel({
                idTipoDocumento: value.value,
                txTipoDocumento: value.label,
                idUsuarioCadastro: parseInt(userId),
                txAutor: token["Jvris.User.Name"]
            } as any);
        }
    }

    function updateTitle(value: string) {
        setModelTitle(value);
    }

    function fieldsVerify(save?: boolean) {
        //console.log("modelTitle", modelTitle);
        if (!modelTitle) {
            HotToastWarning("Insira um título para o modelo");
            return false;
        }

        if (!currModel && !save) {
            //console.log("currModel", currModel);
            HotToastWarning("Selecione um modelo");
            return false;
        }
        if (!modelTypeFilter.label.length) {
            //console.log("modelTypeFilter", modelTypeFilter);
            HotToastWarning("Selecione um tipo de modelo");
            return false;
        }
        return true;
    }

    function SalvarPeca(text: string, onSaveCallback?: () => void) {
        if (!fieldsVerify(true)) return;

        if (recPeca != "NotFound" && typeof recPeca != "string" && recPeca) {
            const recP: RecPecaI = recPeca;
            updatePeca({
                ...recP,
                idTipoDocumento: modelTypeFilter.value,
                idModeloPeca: processo.idPeca,
                txDescricao: modelTitle,
                txPeca: text
            })
                .then(() => {
                    //seed();
                    onSaveCallback && onSaveCallback();
                    HotToastSucess("Peca Atualizada com sucesso");
                })
                .catch((ERR) => HotToastError(ERR));
        } else {
            salvarPeca({
                //id: parseInt(userId),
                idAto: +idAto, //from url
                txDescricao: modelTitle,
                idTipoDocumento: modelTypeFilter.value,
                idProcurador: selectedUser?.id || parseInt(userId),
                idModeloPeca: processo.idPeca,
                //idUsuarioCadastro: currModel.idUsuarioCadastro, verify this later
                idUsuarioCadastro: parseInt(userId),
                txPeca: text
            })
                .then(() => {
                    HotToastSucess("Peca Salva com sucesso");
                    onSaveCallback && onSaveCallback();
                    //seed();
                })
                .catch((ERR) => {
                    HotToastError(ERR);
                });
        }
    }

    function SalvarComoModelo(text: string) {
        if (!fieldsVerify()) return;
        sendModelo({
            txModeloPeca: text,
            txDescricao: modelTitle,
            dtCadastro: new Date().toISOString().split("T")[0],
            hrCadastro: new Date().toISOString().split("T")[1].split(".")[0],
            idTipoDocumento: currModel.idTipoDocumento,
            idUsuarioCadastro: currModel.idUsuarioCadastro,
            txTipoDocumento: modelTypeFilter.label,
            txAutor: currModel.txAutor
        })
            .then(() => {
                //seed();
                HotToastSucess("Modelo Salvo com sucesso");
            })
            .catch(() => HotToastError("Erro ao salvar o modelo"));
    }

    async function EnviarParaPJE(text: string, pdf: boolean) {
        if (!fieldsVerify()) return;

        if (recPeca && recPeca != "NotFound" && typeof recPeca != "string") {
            const data = await getProcessData(recPeca?.idProcesso.toString());

            const consultaCred = await getConsultarCredenciaisPje(
                recPeca.idProcurador,
                data?.data?.nuInstancia
            );

            const token = localStorage.getItem("token");

            assinarPeca({
                id: recPeca.id,
                idAto: recPeca.idAto, //from url
                txDescricao: recPeca.txDescricao,
                idTipoDocumento: recPeca.idTipoDocumento,
                idProcurador: recPeca.idProcurador,
                idModeloPeca: modelos.find(
                    (model) => model.idTipoDocumento == recPeca.idTipoDocumento
                )?.id,
                idUsuarioCadastro: recPeca.idUsuarioCadastro,
                txPeca: recPeca.txPeca,
                isCredencialPJeCadastrada: consultaCred?.data?.length > 0,
                userToken: token
            })
                .then((assRes) => {
                    if (pdf) {
                        openSignerReadOnly(assRes.ticket).then((res) => {
                            HotToastSucess("Assinador aberto com sucesso");
                        });
                    } else {
                        openSigner(assRes.ticket).then((res) => {
                            HotToastSucess("Assinador aberto com sucesso");
                        });
                    }
                })
                .catch((err) => HotToastError(err));
        } else if (finlPeca) {
            assinarPeca({
                id: finlPeca.id,
                idAto: finlPeca.idAto, //from url
                txDescricao: finlPeca.txDescricao,
                idTipoDocumento: finlPeca.idTipoDocumento,
                idProcurador: finlPeca.idProcurador,
                idModeloPeca: modelos.find(
                    (model) => model.idTipoDocumento == finlPeca.idTipoDocumento
                )?.id,
                idUsuarioCadastro: finlPeca.idUsuarioCadastro,
                txPeca: finlPeca.txPeca
            })
                .then((assRes) => {
                    //seed();
                    //HotToastSucess("Abrindo o assinador");
                    if (pdf) {
                        openSignerReadOnly(assRes.ticket).then((res) => {
                            HotToastSucess("Assinador aberto com sucesso");
                        });
                    } else {
                        openSigner(assRes.ticket).then((res) => {
                            HotToastSucess("Assinador aberto com sucesso");
                        });
                    }
                })
                .catch((err) => HotToastError(err));
        } else {
            HotToastWarning("Salve a peça antes de enviar para o PJE");
        }
    }

    function FinalizarPeca(Callback?: () => void) {
        if (recPeca != "NotFound" && typeof recPeca != "string" && recPeca) {
            finalizarPeca(currModel ? currModel.id : recPeca.id)
                .then(() => {
                    //seed();
                    Callback && Callback();
                    HotToastSucess("Peca finalizada com sucesso");
                })
                .catch(() => {
                    HotToastError("Erro ao finalizar a peca");
                });
        }
    }

    function updateFinalPeca(value: PecaI) {
        setFinlPeca(value);
    }

    function ConcluirAtuacao(Callback?: () => void) {
        concluirAtuacao(processo.id, {
            Id: +idAto,
            idUsuarioCadastro: parseInt(userId),
            txTipo: "P"
        })
            .then(() => {
                //seed();
                Callback && Callback();
                HotToastSucess("Atuação concluída com sucesso");
            })
            .catch(() => {
                HotToastError("Erro ao concluir a atuação");
            });
    }

    function AnexarArquivo(
        tipoDoc: number,
        anexBase64: string,
        onSucess: () => void
    ) {
        if (!recPeca || recPeca == "NotFound" || typeof recPeca == "string") {
            HotToastError(
                "Peça não foi salva, salve a peça antes de anexar um arquivo"
            );
            return;
        }
        //console.log("recPeca", recPeca);
        const anexo: SendAnexoPecaI = {
            file_stream: anexBase64,
            idPeca: recPeca.id,
            idTipoDocumento: tipoDoc,
            idUsuarioCadastro: parseInt(userId)
        };

        adicionarAnexo(anexo)
            .then(() => {
                HotToastSucess("Arquivo anexado com sucesso");
                //seed();
                onSucess();
            })
            .catch(() => {
                HotToastError("Erro ao anexar o arquivo");
            });
    }

    return (
        <PecasContext.Provider
            value={{
                modelTypeFilter,
                currModel,
                modelTitle,
                recPeca,
                modelo,
                modelos,
                finlPeca,
                tiposProcessoPJE,
                loadingModelosPecas,
                idAto: 0 /* location.state
                    ? parseInt(processo.idProcesso)
                    : undefined, */,
                loadingTiposProcessoPJE,
                anexosPeca,
                anexosAto,
                partes,
                anexosResposta,
                prepareModelList,
                prepareModelListUser,
                prepareModelTypeList,
                updateModelTypeFilterValue,
                updateCurrModel,
                SalvarComoModelo,
                updateTitle,
                SalvarPeca,
                EnviarParaPJE,
                FinalizarPeca,
                updateFinalPeca,
                ConcluirAtuacao,
                AnexarArquivo,
                getPecasFinalizadas,
                pecasFinalizadas,
                getAto,
                updateModelo,
                seed: () => {},
                seed2: seed,
                idProcesso: processo?.id,
                getProcesso,
                processo,
                getModeloById
            }}
        >
            {props.children}
        </PecasContext.Provider>
    );
};

export const usePecasContext = () => {
    const context = useContext(PecasContext);
    if (!context) {
        throw new Error(
            "useSpecificContext must be used within a PecasProvider"
        );
    }
    return context;
};

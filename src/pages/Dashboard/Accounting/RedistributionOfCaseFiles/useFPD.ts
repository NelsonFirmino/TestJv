import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../api/axiosInstance";
import useContadoresService from "../../../../api/services/contadores";
import useProcessosService from "../../../../api/services/Processos";
import useProcuradoresService from "../../../../api/services/Procuradores";
import {
    HotToastError,
    HotToastSucess,
    HotToastWarning
} from "../../../../components/HotToastFuncs";
import { SharedState } from "../../../../context/SharedContext";
import {
    FichaProcessoI,
    SubmitConCalc
} from "./interfaces/redistributionOfCaseFiles.interface";

interface SelectedProcsI {
    idDist: number;
    idProc: number;
}

const useFPD = () => {
    const [dataInicio, setDataInicio] = useState<Date>(new Date());
    const [dataFim, setDataFim] = useState<Date>(new Date());
    const { getProcuradores, procuradores } = useProcuradoresService();
    const { contadores, getContadores } = useContadoresService();
    const { autoComplete, processo, processos } = useProcessosService();
    const [data, setData] = useState<FichaProcessoI[]>([]);

    function fillTabela() {
        try {
            const dataI = dataInicio.toISOString().split("T")[0];
            const dataF = dataFim.toISOString().split("T")[0];
        } catch (error) {
            alert("Preencha todos os campos");
        }
    }

    const { user } = SharedState();
    const {
        register,
        reset,
        formState: { isValid, errors },
        watch,
        control,
        getValues
    } = useForm<SubmitConCalc>({
        mode: "onChange"
    });

    const [selectedProcs, setSelectedProcs] = useState<SelectedProcsI[]>([]);

    async function submit() {
        //string url = string.Format("{0}/v1.0/redistribuicao-dcje?idDistribuicao={1}&idContador={2}&idUsuarioCadastro={3}", URL_SERVICE, idDistribuicao, idContador, UsuarioLogado.id);
        if (selectedProcs.length === 0) {
            HotToastWarning("Selecione ao menos um processo");
            return;
        }

        selectedProcs.forEach(async (proc) => {
            try {
                const idDist = proc.idDist;
                const idCont = proc.idProc;
                const res = await axiosInstance.post(
                    `api/v1.0/redistribuicao-dcje?idDistribuicao=${idDist}&idContador=${idCont}&idUsuarioCadastro=${user["Jvris.User.Id"]}`
                );

                if (res.data.status == "Created") {
                    HotToastSucess(
                        `Distribuido para o contador ${idCont} com sucesso!`
                    );
                } else {
                    throw new Error();
                }
            } catch (err) {
                HotToastError("Erro ao executar distribuição");
                console.error(err);
            }
        });

        //reload page
        window.location.reload();
    }

    async function pesquisar() {
        const data = getValues();

        const dataInicio = data.startDate;
        const dataFim = data.endDate;
        const procurador = data.attorney ? data.attorney.value : undefined;
        const contador = data.accountant ? data.accountant.value : undefined;
        const processo = data.processNumber
            ? data.processNumber.value
            : undefined;

        //console.log(`Data Inicio: ${dataInicio} Data Fim: ${dataFim} Procurador: ${procurador} Contador: ${contador} Processo: ${processo}`)

        try {
            const res = await axiosInstance.get(
                `api/v1.0/distribuicao-dcje/distribuidos?dataInicio=${dataInicio}&dataFim=${dataFim}${
                    procurador ? `&idProcurador=${procurador}` : ""
                }${contador ? `&idContador=${contador}` : ""}${
                    processo ? `&idProcesso=${processo}` : ""
                }`
            );

            if (res.data && res.data.length === 0) {
                HotToastWarning("Não há dados para exibir");
                return;
            }
            if (res.data.status == "NotFound") {
                HotToastWarning("Não há dados para exibir");
                setData([]);
                return;
            }
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getProcuradores();
        getContadores();
        pesquisar();
    }, []);

    return {
        dataInicio,
        errors,
        setSelectedProcs,
        setDataInicio,
        register,
        watch,
        dataFim,
        setDataFim,
        fillTabela,
        procuradores,
        contadores,
        autoComplete,
        processos,
        data,
        submit,
        isValid,
        pesquisar,
        control,
        reset
    };
};

export default useFPD;

import { useEffect, useState } from "react";
import axiosInstance from "../../../../../api/axiosInstance";
import { SecretariasI } from "../Tables/AguardandoCiencia/interfaces";
import { ACdataI, ADdataI, AHdataI, ATdataI, PPdataI } from "./interfaces";
import {
    ParseToJvrisTableCienc,
    ParseToJvrisTableDist,
    ParseToJvrisTableDistHJ,
    ParseToJvrisTablePend,
    ParseToJvrisTableTriag
} from "./utils";

interface useListarTabelasI {
    setSecretaria: React.Dispatch<React.SetStateAction<number>>;
    secretaria: number;
}

const useListarTabelas = (params: useListarTabelasI) => {
    const { setSecretaria, secretaria } = params;
    const [processosPendentes, setProcessosPendentes] = useState<PPdataI>({
        rawData: [],
        tableData: []
    });
    const [AtosAguardandoTriagem, setAtosAguardandoTriagem] = useState<ATdataI>(
        {
            rawData: [],
            tableData: []
        }
    );
    const [AtosAguardandoCiencia, setAtosAguardandoCiencia] = useState<ACdataI>(
        {
            rawData: [],
            tableData: []
        }
    );
    const [AtosAguardandoDistribuicao, setAtosAguardandoDistribuicao] =
        useState<ADdataI>({
            rawData: [],
            tableData: []
        });
    const [AtosDistribuidosHoje, setAtosDistribuidosHoje] = useState<AHdataI>({
        rawData: [],
        tableData: []
    });
    const [secretarias, setSecretarias] = useState<SecretariasI[]>([]);

    async function getSecretarias() {
        //string url = string.Format("{0}/v1.0/secretarias", URL);
        try {
            const sec = await axiosInstance.get("/api/v1.0/secretarias");
            setSecretarias(sec.data.data);
            setSecretaria(sec.data.data[0].id);
        } catch (err) {
            console.error(err);
        }
    }
    async function listarAtosAguardandoTomadaCiencia() {
        try {
            const atos = await axiosInstance.get(
                `/api/v1.0/avisos/ciencia-pendente?idSecretaria=${secretaria}`
            );
            setAtosAguardandoCiencia({
                rawData: atos.data.data,
                tableData: ParseToJvrisTableCienc(atos.data.data)
            });
        } catch (err) {
            console.error(err);
        }
    }
    async function listarProcessosPendentesDeCadastro() {
        try {
            const proc = await axiosInstance.get(
                `/api/v1.0/atos/sem-processo?idSecretaria=${secretaria}`
            );
            setProcessosPendentes({
                rawData: proc.data.data,
                tableData: ParseToJvrisTablePend(proc.data.data)
            });
        } catch (err) {
            console.error(err);
        }
    }
    async function listarAtosAguardandoTriagem() {
        try {
            const proc = await axiosInstance.get(
                `/api/v1.0/Atos/triagem-pendente?idSecretaria=${secretaria}`
            );

            setAtosAguardandoTriagem({
                rawData: proc.data.data,
                tableData: ParseToJvrisTableTriag(proc.data.data)
            });
        } catch (err) {
            console.error(err);
        }
    }
    async function listarAtosAguardandoDistribuicao() {
        try {
            const proc = await axiosInstance.get(
                `/api/v1.0/Atos/aguardando-distribuicao?idSecretaria=${secretaria}`
            );
            setAtosAguardandoDistribuicao({
                rawData: proc.data.data,
                tableData: ParseToJvrisTableDist(proc.data.data)
            });
        } catch (err) {
            console.error(err);
        }
    }
    async function listarAtosDistHoje() {
        try {
            //var url = `${service}/v1.0/Atos/atos-distribuidos-nao-movimentados?dtDistribuicao=${today}&idSecretaria=${idSecretariaAtosDistribuidosPorData}`;
            //public string today = DateTime.Today.ToString("yyyy-MM-dd");
            const today = `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
            }-${new Date().getDate()}`;

            const proc = await axiosInstance.get(
                `/api/v1.0/Atos/atos-distribuidos-nao-movimentados?dtDistribuicao=${today}&idSecretaria=${secretaria}`
            );

            if (proc.data.data.length === 0) return;
            if (!proc.data.data[0]) return;

            setAtosDistribuidosHoje({
                rawData: proc.data.data,
                tableData: ParseToJvrisTableDistHJ(proc.data.data)
            });
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getSecretarias();
    }, []);

    function reload() {
        listarAtosAguardandoTomadaCiencia();
        listarProcessosPendentesDeCadastro();
        listarAtosAguardandoTriagem();
        listarAtosAguardandoDistribuicao();
        listarAtosDistHoje();
    }

    function reloadAguardandoCiencia() {
        listarAtosAguardandoTomadaCiencia();
    }

    useEffect(() => {
        if (secretarias) {
            listarAtosAguardandoTomadaCiencia();
            listarProcessosPendentesDeCadastro();
            listarAtosAguardandoTriagem();
            listarAtosAguardandoDistribuicao();
            listarAtosDistHoje();
        }
    }, [secretarias, secretaria]);
    return {
        processosPendentes,
        AtosAguardandoTriagem,
        AtosAguardandoCiencia,
        AtosAguardandoDistribuicao,
        AtosDistribuidosHoje,
        secretarias,
        reload,
        reloadAguardandoCiencia
    };
};

export default useListarTabelas;

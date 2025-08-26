import { createContext, useContext, useState } from "react";
import { usePecasContext } from "../PecasContext";
import { ProcessoContextI } from "./interfaces";

const ProcessoContext = createContext<ProcessoContextI>({} as ProcessoContextI);

export const ProcessoProvider = (props: any) => {
    const [mostrarDadosProcesso, setMostrarDadosProcesso] = useState(false);
    const { processo,getProcesso,idProcesso } = usePecasContext();

    function toogleMostrarDadosProcesso() {
        setMostrarDadosProcesso(!mostrarDadosProcesso);
    }

    function updateProcesso() {
        getProcesso(idProcesso)
    }

    return (
        <ProcessoContext.Provider
            value={{
                toogleMostrarDadosProcesso,
                mostrarDadosProcesso,
                processo,
                updateProcesso
            }}
        >
            {props.children}
        </ProcessoContext.Provider>
    );
};

export const useProcessoContext = () => {
    const context = useContext(ProcessoContext);

    if (!context) {
        throw new Error(
            "useProcessoContext must be used within a ProcessoProvider"
        );
    }
    return context;
};

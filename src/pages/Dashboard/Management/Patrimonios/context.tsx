import { createContext, useContext, useState } from "react";
import { PatrimonioI } from "./interfaces";

interface PatrimoniosContextData {
    ativarDesativarModal: boolean;
    setAtivarDesativarModal: (value: boolean) => void;
    clikedData: PatrimonioI;
    setClikedData: (value: PatrimonioI) => void;
    anexosModal: boolean;
    setAnexosModal: (value: boolean) => void;
    visualizarModal: boolean;
    setVisualizarModal: (value: boolean) => void;
}

const PatrimoniosContext = createContext<PatrimoniosContextData>({} as any);

const PatrimoniosProvider = ({ children }) => {
    const [ativarDesativarModal, setAtivarDesativarModal] = useState(false);
    const [anexosModal, setAnexosModal] = useState(false);
    const [visualizarModal, setVisualizarModal] = useState(false);
    const [clikedData, setClikedData] = useState<PatrimonioI>();
    return (
        <PatrimoniosContext.Provider
            value={{
                ativarDesativarModal,
                setAtivarDesativarModal,
                clikedData,
                setClikedData,
                anexosModal,
                setAnexosModal,
                visualizarModal,
                setVisualizarModal
            }}
        >
            {children}
        </PatrimoniosContext.Provider>
    );
};

const usePatrimoniosContext = () => {
    const context = useContext(PatrimoniosContext);

    if (!context) {
        throw new Error(
            "usePatrimoniosContext must be used within an PatrimoniosProvider"
        );
    }

    return context;
};

export { PatrimoniosProvider, usePatrimoniosContext };

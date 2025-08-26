export interface ModalAddProps {
    idFichaProcessual?: number;
    numProcesso?: string;

    idMotivo?: number;
    txObservacao?: string;

    setShowModalDevolucao?: (showModal: boolean) => void;
}

export interface ModalDistProps {
    idFichaProcessual?: number;
    numProcesso?: string;

    idContador?: number;

    setShowModalDevolucao?: (showModal: boolean) => void;
}

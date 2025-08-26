import { AxiosResponse } from "axios";

export interface EspecializadaServiceI {
    id: number;
    idSecretaria: number;
    idSetorPai: number;
    isBloqueado: boolean;
    isRpv: boolean;
    nuNivel: number;
    totalSetor: number;
    txEspecializada: string;
}

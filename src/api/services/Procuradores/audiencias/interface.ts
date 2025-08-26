export interface AudienciaI {
    id: number;
    txNumero: string;
    txTipoAudiencia: string;
    txVara: string;
    dtDataHoraInicio: string;
    txLink: string;
}

export interface getAudienciasI {
    procurador: number;
    datainicio: string;
    datafim: string;
}

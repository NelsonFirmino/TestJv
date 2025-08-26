export interface FichaProcessoI {
  id: number
  txContador: string
  idFichaProcessual: number
  txDataEntrada: string
  txHoraEntrada: string
  dtSaida: string
  hrSaida: string
  txNumeroFormatado: string
  txAutor: string
  nuAutores: number
  txFaseProcessual: string
  txRazaoPedido: string
  txProcurador: string
  dtPrazoDCJE: string
  dtPrazoProcurador: string
  vaTotal: number
  isDevolvido: boolean
}


export interface SubmitConCalc {
  startDate: Date;
  endDate: Date;
  request: string;
  processNumber:
    | {
        value: string;
        label: string;
      }
   
    attorney:
    | {
        value: string;
        label: string;
      }
   
    accountant:
    | {
        value: string;
        label: string;
      }
    
}

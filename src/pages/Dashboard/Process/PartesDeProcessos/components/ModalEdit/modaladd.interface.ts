export interface ModalAddProps {
  id?: number;
  idParte?: number;
  txParte?: string;
  txSigla?: string;
  txNumeroProcesso?: string;
  nuInstancia?: number;
  txTipoPessoa?: string;
  txCpfCnpj?: string;
  setShowModalAdd: (showModal: boolean) => void;
  showModal: boolean;
}


export const tipoPessoaOptions = [
  {
    value: "F",
    label: "Física",
  },
  {
    value: "J",
    label: "Jurídica",
  },
  {
    value: "E",
    label: "Estado do RN",
  },
  {
    value: "A",
    label: "Associação",
  },
  {
    value: "S",
    label: "Sindicato",
  },

];
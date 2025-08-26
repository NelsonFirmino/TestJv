export interface SubmitModalAddEdit {
  id?: number;
  txParte?: string;
  txTipoPessoa?: string;
  txCpfCnpj?: string;
}

export interface ModalAddEditProps {
  id?: number;
  txParte?: string;
  txTipoPessoa?: string;
  txCpfCnpj?: string;
  setShowModalAddEdit: (showModal: boolean) => void;
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
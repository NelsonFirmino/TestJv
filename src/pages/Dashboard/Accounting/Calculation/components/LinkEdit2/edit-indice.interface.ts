export interface SubmitEditIndice {
  id: number;
  idCalculo: number;
  dtBase: string;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaIndiceCorrecao: number;
  vaIndiceTr: number;
  vaIndiceIpca: number;
  vaIndiceJuros: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  vaAtualizado: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  isComResultado: number;
}

export interface ModalEditProps {
  setShowModal: (open: boolean) => void;
  idIndice: number;
}

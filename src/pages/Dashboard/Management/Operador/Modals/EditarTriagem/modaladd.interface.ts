export interface ModalAddProps {
  id?: number;
  idParte?: number;
  txParte?: string;
  txSigla?: string;
  txNumeroProcesso?: string;
  nuInstancia?: number;
  txTipoPessoa?: string;
  txCpfCnpj?: string;
  setShowModalAdd?: (showModal: boolean) => void;
}

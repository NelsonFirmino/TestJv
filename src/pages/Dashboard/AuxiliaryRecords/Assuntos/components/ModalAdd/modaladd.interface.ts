export interface ModalAddProps {
  id?: number;
  txAssunto?: string;
  txPai?: string;
  txMateria?: string;
  idAssunto_Pai?: number;
  idMateria?: number;
  setShowModalAdd?: (showModal: boolean) => void;
}
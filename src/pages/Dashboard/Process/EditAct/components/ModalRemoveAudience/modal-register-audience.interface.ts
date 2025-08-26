export interface ModalRemoveAudienceProps {
  setShowModalRemoveAudience: (params: {
    open: boolean;
    idAto: string;
    idAudiencia: number;
  }) => void;
  showModalRemoveAudience: {
    open: boolean;
    idAto: string;
    idAudiencia: number;
  };
}

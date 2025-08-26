export interface ModalRegisterAudienceProps {
  setShowModalRegisterAudience: (params: {
    open: boolean;
    idAto: string;
  }) => void;
  showModalRegisterAudience: {
    open: boolean;
    idAto: string;
  };
}

export interface SubmitRegisterAudience {
  idAto: number;
  idTipoAudiencia: {
    label: string;
    value: number;
  };
  isVirtual?: boolean;
  txlink?: string;
  dtAudiencia: string;
  hrAudiencia: string;
  isPreposto?: boolean;
}

export interface SubmitAppPart {
  txPolo: any;
  idProcesso: number;
  idParte: number;
  txParte: string;
}

export interface SearchPart {
  typeSearch: {
    value: string;
    label: string;
  };
  fieldSearch: {
    value: string;
    label: string;
  };
  busca: {
    value: string;
    label: string;
  };
}

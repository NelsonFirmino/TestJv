export interface AutocompleteAssuntosParams {
  txAssunto: string;
}

export interface GetAutocompleteAssuntosResponse {
  status: string;
  message: string;
  data: Assunto[];
}

interface Assunto {
  id: number;
  txAssunto: string;
  idAssunto_Pai: number;
  txPai: string;
}

export interface GetSecretariesResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Secretary[];
}

export interface Secretary {
  id: number;
  txSecretaria: string;
  nuAtosPendenteCadastro: number;
  nuAtosAguardandoTriagem: number;
  nuAtosPendenteDistribuicao: number;
  nuRecebimentoPendente: number;
  nuAtosTomadaCiencia: number;
}

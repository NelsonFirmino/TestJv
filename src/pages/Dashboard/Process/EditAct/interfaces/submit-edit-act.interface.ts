export interface SubmitEditAct {
  txNumeroFormatado: string;
  nuCodigoAviso: string;
  idSecretaria: { label: string; value: string };
  idClasse: { label: string; value: string };
  idTribunal?: { label: string; value: string };
  nuInstancia?: { label: string; value: string };
  idOrgaoJulgador?: { label: string; value: string };
  isUrgente: boolean;
  dtCiencia: string;
  dtPrazo?: string;
  dtCadastro: string;
}

export interface SubmitDespachos {
  id: number;
  idAto: number;
  idTipoDespacho: { label: string; value: number } | null;
  idProcurador: number;
  idUsuarioCadastrado: number;
  txObservacao: string;
}

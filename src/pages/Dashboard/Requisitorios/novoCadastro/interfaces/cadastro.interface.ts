export interface SubmitCadastro {
  id: number;
  devedor: { label: string; value: number } ;
  requisitor: { label: string; value: number };
  natureza: { label: string; value: number } ;
  tipo: { label: string; value: string } ;
  origem: { label: string; value: number };
  vaPagamento: number;
  dtLimitePagamento: string;
  isHonorario: boolean;
}

export interface SelectI {
  label: string;
  value: number;
}

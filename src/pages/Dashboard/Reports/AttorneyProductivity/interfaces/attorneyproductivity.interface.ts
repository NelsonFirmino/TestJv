export interface SubmitAttorneyProductivity {
  dtInicio?: string;
  dtFim?: string;
  nuMes?: string;
  nuAno?: string;
  idProcurador?: { label: string; value: string } | null;
  reportTypeOptions?: { label: string; value: string } | null;
 

}